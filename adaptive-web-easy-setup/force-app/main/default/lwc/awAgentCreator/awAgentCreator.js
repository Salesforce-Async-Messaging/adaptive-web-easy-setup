import { LightningElement, api, track } from 'lwc';
import submitAgentDeploy       from '@salesforce/apex/AdaptiveWebService.submitAgentDeploy';
import checkAgentDeploy        from '@salesforce/apex/AdaptiveWebService.checkAgentDeploy';
import createBotUser           from '@salesforce/apex/AdaptiveWebService.createBotUser';
import activateAgent           from '@salesforce/apex/AdaptiveWebService.activateAgent';
import assignAgentPermissions  from '@salesforce/apex/AdaptiveWebService.assignAgentPermissions';
import compileAndPublishAgent from '@salesforce/apex/AdaptiveWebService.compileAndPublishAgent';
import { buildZip } from './zipBuilder';
import { agentConfig } from './agentConfig';

const POLL_INTERVAL = 3000;
const API_VERSION = '66.0';

// Compile & Publish runs entirely server-side: AdaptiveWebService.compileAndPublishAgent
// issues the Next Gen Authoring REST sequence (locate bundle -> draft -> save
// definition -> publish) as an Apex self-callout to the org's My Domain. We do
// NOT call it from the browser: the stock /aura transport is blocked for a
// custom LWC (Lightning Web Security denies LWC fetch/XHR to /aura), and a
// direct browser fetch to the REST family is cross-origin under Enhanced
// Domains (Lightning host -> My Domain host) and therefore CORS-gated, which
// would force the admin to hand-add this origin under Setup -> CORS. Driving
// the callout from Apex removes the browser origin entirely, so there is no
// CORS prerequisite; the My Domain host is already covered by the
// Adaptive_Web_Setup_Server remote site.

export default class AwAgentCreator extends LightningElement {
    @api sessionId;

    @track creating = false;
    @track error    = null;
    @track steps    = null;
    @track result   = null;
    @track baseName = 'AdaptiveWeb';
    @track failedDeployState = null; // Stores state for resume/cleanup

    // Version marker to force cache refresh - v2.3.0
    get version() { return 'v2.3.0'; }

    get isCreateDisabled() {
        return this.creating;
    }

    get createLabel() {
        return this.creating ? 'Creating...' : 'Create Agent';
    }

    get hasSteps() {
        return this.steps && this.steps.length > 0;
    }

    get isDone() {
        return this.result !== null;
    }

    get baseNamePreview() {
        if (!this.baseName || this.creating) return null;
        // Show example with placeholder GUID
        return `${this.baseName}_abc123...`;
    }

    get hasFailedDeployment() {
        return this.error && this.failedDeployState !== null;
    }

    get canContinue() {
        // Can continue if we have a failed state and specific steps are resumable
        if (!this.failedDeployState) return false;

        const failedStep = this.steps?.find(s => s.status === 'failed');
        if (!failedStep) return false;

        // Can resume from Deploy to Org, Compile & Publish, Activate, or Assign Permissions
        const resumableSteps = [3, 4, 5, 6]; // step indices
        const failedStepIndex = this.steps.indexOf(failedStep);
        return resumableSteps.includes(failedStepIndex);
    }

    get canCleanup() {
        // Can cleanup if we have partial artifacts created
        return this.failedDeployState && (
            this.failedDeployState.botUserUsername ||
            this.failedDeployState.deployId ||
            this.failedDeployState.agentName
        );
    }

    handleBaseNameChange(event) {
        let value = event.target.value.trim();
        // Sanitize: only alphanumeric and underscores
        value = value.replace(/[^a-zA-Z0-9_]/g, '');
        // Default if empty
        this.baseName = value || 'AdaptiveWeb';
    }

    get stepsDisplay() {
        if (!this.steps) return [];
        const ROW_CLASS = {
            completed: 'step-row step-row-completed',
            running:   'step-row step-row-running',
            failed:    'step-row step-row-failed',
        };
        const mapped = this.steps.map(s => ({
            ...s,
            isRunning: s.status === 'running',
            rowClass: ROW_CLASS[s.status] || 'step-row',
            iconName: s.status === 'completed' ? 'utility:check'
                    : s.status === 'failed'    ? 'utility:error'
                    : 'utility:clock',
            iconVariant: s.status === 'completed' ? 'success'
                       : s.status === 'failed'    ? 'error'
                       : '',
            statusLabel: s.status === 'completed' ? 'Done'
                       : s.status === 'failed'    ? 'Failed'
                       : s.status === 'running'   ? 'In Progress'
                       : 'Pending',
        }));
        if (!this.creating) return mapped;
        const hasRunning = mapped.some(s => s.isRunning);
        if (hasRunning) return mapped;
        let foundFirst = false;
        return mapped.map(s => {
            if (!foundFirst && s.status === 'pending') {
                foundFirst = true;
                return { ...s, isRunning: true, rowClass: 'step-row step-row-running', statusLabel: 'In Progress' };
            }
            return s;
        });
    }

    _buildMetadataFiles(agentName, promptName, botUserUsername) {
        const cfg = agentConfig;
        // The agent is defined entirely by the AgentScript YAML
        // (agentConfig.getAgentYaml). On 264+/v68 orgs we deploy that YAML as an
        // AiAuthoringBundle — the folder ships <agent>.bundle-meta.xml plus an
        // <agent>.agent definition file — then the Compile & Publish step builds
        // the live agent from it natively at the org's release version.
        //
        // Two things we deliberately do NOT do, each of which broke the deploy
        // on v68:
        //   1. hand-author bots/*.bot or genAiPlannerBundles/* — Bot/BotVersion
        //      is unsupported for non-BOT BotType and GenAiPlannerBundle is
        //      removed; the planner is now inline in the agent definition.
        //   2. set <target> on the bundle — it resolves to a BotVersion
        //      (<agent>.v1) that does not exist until publish runs, so the
        //      deploy fails with "no BotVersion named <agent>.v1 found".
        // The prompt template is still deployed because the YAML targets
        // generatePromptResponse://<promptName> (a publish-time dependency).
        const agentYaml = cfg.getAgentYaml(agentName, promptName, botUserUsername);
        // nameToken is the agent name's unique random suffix (the segment after
        // the last underscore — always alphanumeric). The prompt template's
        // version identifier is built from it as v<token>_1. Deriving it from
        // the suffix (not the whole agent name) keeps the identifier valid for
        // ANY base name: embedding a base name that contains an underscore,
        // e.g. agent "testt_be0126", would yield "vtestt_be0126_1", which the
        // platform rejects ("The prompt template version identifier ... invalid").
        const nameToken = agentName.split('_').pop();

        const packageXml =
`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
    <members>${promptName}</members>
    <name>GenAiPromptTemplate</name>
  </types>
  <types>
    <members>${agentName}</members>
    <name>AiAuthoringBundle</name>
  </types>
  <version>${API_VERSION}</version>
</Package>`;

        const escapeXml = (s) => s
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');

        const promptVersionId = `v${nameToken}_1`;
        const promptInputsXml = cfg.prompt.inputs.map(inp =>
`    <inputs>
      <apiName>${inp.apiName}</apiName>
      <definition>primitive://String</definition>
      <masterLabel>${inp.label}</masterLabel>
      <referenceName>Input:${inp.apiName}</referenceName>
      <required>${inp.required}</required>
    </inputs>`).join('\n');

        const promptXml =
`<?xml version="1.0" encoding="UTF-8"?>
<GenAiPromptTemplate xmlns="http://soap.sforce.com/2006/04/metadata">
  <activeVersionIdentifier>${promptVersionId}</activeVersionIdentifier>
  <description>${escapeXml(cfg.prompt.description)}</description>
  <developerName>${promptName}</developerName>
  <masterLabel>${escapeXml(cfg.prompt.masterLabel)}</masterLabel>
  <type>${cfg.prompt.type}</type>
  <visibility>${cfg.prompt.visibility}</visibility>
  <templateVersions>
    <content>${escapeXml(cfg.prompt.content)}</content>
${promptInputsXml}
    <primaryModel>${cfg.prompt.model}</primaryModel>
    <responseFormat>${cfg.prompt.responseFormat}</responseFormat>
    <status>Published</status>
    <versionIdentifier>${promptVersionId}</versionIdentifier>
  </templateVersions>
</GenAiPromptTemplate>`;

        // No <target>: on v68 it would bind to a BotVersion (<agent>.v1) that
        // isn't created until publish, failing the deploy. The bundle carries
        // its definition via the colocated <agent>.agent file instead.
        const bundleXml =
`<?xml version="1.0" encoding="UTF-8"?>
<AiAuthoringBundle xmlns="http://soap.sforce.com/2006/04/metadata">
  <bundleType>AGENT</bundleType>
</AiAuthoringBundle>`;

        return [
            { name: 'package.xml', content: packageXml },
            { name: `genAiPromptTemplates/${promptName}.genAiPromptTemplate-meta.xml`, content: promptXml },
            { name: `aiAuthoringBundles/${agentName}/${agentName}.bundle-meta.xml`, content: bundleXml },
            { name: `aiAuthoringBundles/${agentName}/${agentName}.agent`, content: agentYaml },
        ];
    }

    async handleCreate() {
        this.creating = true;
        this.error    = null;
        this.result   = null;

        // Generate unique suffix using short GUID (6 chars)
        // Use baseName instead of hardcoded 'AdaptiveWeb'
        // Example: RetailBot_abc123 or AdaptiveWeb_def456
        const randomPart  = crypto.randomUUID().replace(/-/g, '').slice(0, 6);
        const basePrefix  = this.baseName || 'AdaptiveWeb';
        const safeName    = basePrefix + '_' + randomPart;
        const agentName   = safeName;
        const promptName  = safeName + '_prompt';
        // NGA naming convention: planner bundle must be <AgentName>_v<N>
        // so the Agentforce Studio runtime links Bot→planner→graph by name.
        const plannerName = safeName + '_v1';

        this.steps = [
            { name: 'create_user',  label: 'Create Agent User',      status: 'pending' },
            { name: 'build_zip',    label: 'Build Deploy Package',   status: 'pending' },
            { name: 'submit',       label: 'Submit Deployment',      status: 'pending' },
            { name: 'poll',         label: 'Deploy to org',          status: 'pending' },
            { name: 'publish',      label: 'Compile and Publish',    status: 'pending' },
            { name: 'activate',     label: 'Activate Agent',         status: 'pending' },
            { name: 'permissions',  label: 'Assign Permissions',     status: 'pending' },
        ];

        // Declared outside the try so they remain in scope in the catch block,
        // which reads them to build failedDeployState. When they were const
        // inside try, a failed deploy made the catch throw "userRes is not
        // defined", masking the real error and crashing the component.
        let userRes;
        let submitRes;
        let zipBase64;

        try {
            // Step 1: Create bot user
            this._setStep(0, 'running');
            userRes = await createBotUser({ agentDeveloperName: agentName, sessionId: this.sessionId });
            if (!userRes.success) throw new Error(userRes.message);
            const botUserUsername = userRes.data.username;
            this._setStep(0, 'completed');

            // Step 2: Build zip (agent YAML is embedded in the bundle's .agent file)
            this._setStep(1, 'running');
            const files = this._buildMetadataFiles(agentName, promptName, botUserUsername);
            zipBase64 = buildZip(files);
            this._setStep(1, 'completed');

            // Step 3: Submit deploy
            this._setStep(2, 'running');
            submitRes = await submitAgentDeploy({
                zipBase64,
                sessionId: this.sessionId,
            });
            if (!submitRes.success) throw new Error(submitRes.message);
            const deployId = submitRes.data.deployId;
            this._setStep(2, 'completed');

            // Step 4: Poll until done
            this._setStep(3, 'running');
            const deployResult = await this._pollDeploy(deployId);
            const status = deployResult?.deployResult?.status;
            if (status === 'Succeeded' || status === 'SucceededPartial') {
                this._setStep(3, 'completed');

                // Step 5: Compile & publish the agent script (server-side Apex Next Gen Authoring REST callout)
                this._setStep(4, 'running');
                const publishData = await this._compileAndPublishAgent(agentName, promptName, botUserUsername);
                this._setStep(4, 'completed');

                // Step 6: Activate agent (activates the latest version)
                this._setStep(5, 'running');
                const actRes = await activateAgent({ agentDeveloperName: agentName, sessionId: this.sessionId });
                if (!actRes.success) throw new Error(actRes.message);
                this._setStep(5, 'completed');

                // Step 7: Assign agent runtime permissions to bot user
                this._setStep(6, 'running');
                const permRes = await assignAgentPermissions({
                    agentDeveloperName: agentName,
                    botUserId: userRes.data.userId,
                    sessionId: this.sessionId
                });
                if (!permRes.success) throw new Error(permRes.message);
                this._setStep(6, 'completed');

                this.result = {
                    agentName,
                    promptTemplateName: promptName,
                    agentProjectId: publishData?.projectId || '',
                    agentProjectVersionId: publishData?.versionId || '',
                };
            } else {
                const dr = deployResult?.deployResult;
                let errMsg = 'Deploy ' + (status || 'unknown');
                if (dr?.errorMessage) {
                    errMsg += ': ' + dr.errorMessage;
                }
                if (dr?.details?.componentFailures) {
                    const failures = Array.isArray(dr.details.componentFailures)
                        ? dr.details.componentFailures
                        : [dr.details.componentFailures];
                    const msgs = failures.map(f => f.fullName + ': ' + f.problem).join('; ');
                    if (msgs) errMsg += ' — ' + msgs;
                }

                // Enhanced debugging info
                console.error('Deploy failed:', {
                    status,
                    deployId,
                    errorMessage: dr?.errorMessage,
                    componentFailures: dr?.details?.componentFailures,
                    fullDeployResult: deployResult
                });

                // Add troubleshooting tips based on error
                errMsg += this._getTroubleshootingHint(errMsg);
                throw new Error(errMsg);
            }
        } catch (err) {
            // Enhanced error logging
            console.error('Agent creation error:', {
                error: err,
                message: err.message,
                stack: err.stack,
                body: err.body,
                agentName,
                currentStep: this.steps?.find(s => s.status === 'running')?.label
            });

            this.error = this._formatErrorMessage(err);

            // Mark the current running step as failed
            if (this.steps) {
                this.steps = this.steps.map(s =>
                    s.status === 'running' ? { ...s, status: 'failed', errorDetails: this.error } : s
                );
            }

            // Store failed state for continue/cleanup
            this.failedDeployState = {
                agentName,
                promptName,
                plannerName,
                botUserUsername: userRes?.data?.username,
                botUserId: userRes?.data?.userId,
                deployId: submitRes?.data?.deployId,
                zipBase64,
                failedStepIndex: this.steps?.findIndex(s => s.status === 'failed'),
                timestamp: new Date().toISOString(),
            };

            console.log('Failed state saved for continue/cleanup:', this.failedDeployState);
        } finally {
            this.creating = false;
        }
    }

    async _compileAndPublishAgent(agentName, promptName, botUserUsername) {
        const agentYaml = agentConfig.getAgentYaml(agentName, promptName, botUserUsername);
        // Compile & publish runs server-side: the Apex method issues the Next
        // Gen Authoring REST sequence (locate bundle -> draft -> save definition
        // -> publish) as an org self-callout, so it never crosses the browser's
        // origin boundary and needs no CORS allowlisting. Returns the standard
        // { success, message, data } envelope; data carries
        // { projectId, versionId, publishedBotId, publishedBotVersionId }.
        const res = await compileAndPublishAgent({
            agentName,
            agentYaml,
            sessionId: this.sessionId,
        });
        if (!res.success) throw new Error(res.message);
        return res.data;
    }

    _setStep(idx, status) {
        this.steps = this.steps.map((s, i) => i === idx ? { ...s, status } : s);
    }

    _formatErrorMessage(err) {
        const baseMsg = (err.body?.message) || err.message || 'Failed to create agent.';

        // Check for common error patterns and provide helpful context
        if (baseMsg.includes('User doesn\'t have access to agent')) {
            return baseMsg + '\n\n🔍 Debugging Tips:\n' +
                   '• Check if Einstein Agent User profile exists\n' +
                   '• Verify bot user has correct permissions\n' +
                   '• Check Setup → Debug Logs for detailed errors\n' +
                   '• See browser console for full deployment details';
        }

        if (baseMsg.includes('BotVersion') && baseMsg.includes('not found')) {
            return baseMsg + '\n\n🔍 Possible Causes:\n' +
                   '• Timing issue: Bot metadata deploying before version\n' +
                   '• Permission issue: User lacks Bot version access\n' +
                   '• Try again: Metadata sometimes needs retry\n' +
                   '• Check Debug Logs in Setup for underlying cause';
        }

        if (baseMsg.includes('DeveloperName already in use')) {
            return baseMsg + '\n\n🔍 Solution:\n' +
                   '• An agent with this name already exists\n' +
                   '• Choose a different base name\n' +
                   '• Or delete the existing agent in Setup → Agent Builder';
        }

        if (baseMsg.includes('LICENSE_LIMIT_EXCEEDED')) {
            return baseMsg + '\n\n🔍 Solution:\n' +
                   '• Trial orgs have limited Einstein Agent licenses\n' +
                   '• Delete unused bot users in Setup → Users\n' +
                   '• Or use a production org';
        }

        return baseMsg + '\n\n🔍 For detailed error info:\n' +
               '1. Open browser console (F12)\n' +
               '2. Check Setup → Debug Logs\n' +
               '3. Look for deploy ID in console logs';
    }

    _getTroubleshootingHint(errMsg) {
        const hints = [];

        if (errMsg.includes('permission') || errMsg.includes('access')) {
            hints.push('\n\n📋 Permission Checklist:');
            hints.push('• Ensure Einstein Agent User profile exists');
            hints.push('• Check Agentforce permission sets assigned');
            hints.push('• Verify bot user has correct profile');
            hints.push('• Review Setup → Permission Sets');
        }

        if (errMsg.includes('BotVersion') || errMsg.includes('Bot')) {
            hints.push('\n\n🔧 Bot Metadata Issues:');
            hints.push('• Check Setup → Agent Builder for existing agents');
            hints.push('• Verify no duplicate DeveloperNames');
            hints.push('• Review Setup → Debug Logs for metadata errors');
        }

        if (errMsg.includes('compile') || errMsg.includes('publish')) {
            hints.push('\n\n⚙️ Compilation Issues:');
            hints.push('• Check agent YAML syntax');
            hints.push('• Verify prompt template exists');
            hints.push('• Review Setup → Agent Builder → Logs');
        }

        return hints.join('\n');
    }

    async _pollDeploy(deployId) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            await this._sleep(POLL_INTERVAL);
            const res = await checkAgentDeploy({
                deployId,
                sessionId: this.sessionId,
            });
            if (!res.success) throw new Error(res.message);
            const dr = res.data?.deployResult;
            if (dr && dr.done) return res.data;
        }
    }

    _sleep(ms) {
        return new Promise(resolve => {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(resolve, ms);
        });
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('agentcreated', {
            detail: { agent: this.result }
        }));
    }

    async handleContinue() {
        if (!this.failedDeployState) return;

        this.creating = true;
        this.error = null;

        const {
            agentName,
            promptName,
            botUserUsername,
            botUserId,
            deployId,
            failedStepIndex,
        } = this.failedDeployState;

        console.log('Continuing from step:', failedStepIndex, this.steps[failedStepIndex]?.label);

        try {
            // Resume from the failed step
            if (failedStepIndex === 3) {
                // Failed during "Deploy to Org" - re-poll deployment
                this._setStep(3, 'running');
                const deployResult = await this._pollDeploy(deployId);
                const status = deployResult?.deployResult?.status;

                if (status === 'Succeeded' || status === 'SucceededPartial') {
                    this._setStep(3, 'completed');
                    await this._continueFromCompile(agentName, promptName, botUserUsername, botUserId);
                } else {
                    throw new Error('Deployment still failing: ' + status);
                }
            } else if (failedStepIndex === 4) {
                // Failed during "Compile & Publish" - retry compilation
                await this._continueFromCompile(agentName, promptName, botUserUsername, botUserId);
            } else if (failedStepIndex === 5) {
                // Failed during "Activate Agent" - retry activation
                await this._continueFromActivate(agentName, botUserId);
            } else if (failedStepIndex === 6) {
                // Failed during "Assign Permissions" - retry permissions
                await this._continueFromPermissions(agentName, botUserId);
            }

            // Clear failed state on success
            this.failedDeployState = null;

        } catch (err) {
            console.error('Continue failed:', err);
            this.error = this._formatErrorMessage(err);

            // Mark step as failed again
            if (this.steps && failedStepIndex >= 0) {
                this._setStep(failedStepIndex, 'failed');
            }
        } finally {
            this.creating = false;
        }
    }

    async _continueFromCompile(agentName, promptName, botUserUsername, botUserId) {
        // Step 5: Compile + publish
        this._setStep(4, 'running');
        const publishData = await this._compileAndPublishAgent(agentName, promptName, botUserUsername);
        this._setStep(4, 'completed');

        await this._continueFromActivate(agentName, botUserId, publishData);
    }

    async _continueFromActivate(agentName, botUserId, publishData) {
        // Step 6: Activate
        this._setStep(5, 'running');
        const actRes = await activateAgent({ agentDeveloperName: agentName, sessionId: this.sessionId });
        if (!actRes.success) throw new Error(actRes.message);
        this._setStep(5, 'completed');

        await this._continueFromPermissions(agentName, botUserId, publishData);
    }

    async _continueFromPermissions(agentName, botUserId, publishData) {
        // Step 7: Assign permissions
        this._setStep(6, 'running');
        const permRes = await assignAgentPermissions({
            agentDeveloperName: agentName,
            botUserId,
            sessionId: this.sessionId
        });
        if (!permRes.success) throw new Error(permRes.message);
        this._setStep(6, 'completed');

        // Success!
        this.result = {
            agentName,
            promptTemplateName: this.failedDeployState.promptName,
            agentProjectId: publishData?.projectId || '',
            agentProjectVersionId: publishData?.versionId || '',
        };
    }

    async handleCleanup() {
        if (!this.failedDeployState) return;

        if (!confirm('This will delete the partially created agent artifacts. Continue?')) {
            return;
        }

        this.creating = true;
        const { agentName, botUserId } = this.failedDeployState;

        const cleanupResults = [];

        try {
            // Note: We cannot actually delete Bot metadata via Metadata API easily
            // But we can deactivate the bot user to prevent license issues

            console.log('Cleaning up agent:', agentName);

            // Attempt to deactivate bot user (if it's the shared user, skip this)
            if (botUserId) {
                try {
                    // We can't easily deactivate via API without DML
                    // Just log that manual cleanup is needed
                    cleanupResults.push({
                        artifact: 'Bot User',
                        status: 'manual',
                        message: 'Please deactivate manually in Setup → Users if needed'
                    });
                } catch (e) {
                    console.warn('Could not deactivate bot user:', e);
                }
            }

            // Log cleanup guidance
            cleanupResults.push({
                artifact: 'Bot Metadata',
                status: 'manual',
                message: `Delete agent "${agentName}" in Setup → Agent Builder`
            });

            cleanupResults.push({
                artifact: 'Prompt Template',
                status: 'manual',
                message: `Delete prompt "${this.failedDeployState.promptName}" in Setup → Prompt Builder`
            });

            cleanupResults.push({
                artifact: 'Planner Bundle',
                status: 'manual',
                message: `Delete planner "${this.failedDeployState.plannerName}" via Tooling API if needed`
            });

            // Show cleanup instructions
            const cleanupMsg = cleanupResults.map(r =>
                `• ${r.artifact}: ${r.message}`
            ).join('\n');

            this.error = `🧹 Cleanup Instructions:\n\n${cleanupMsg}\n\n` +
                        `Note: Salesforce does not provide easy API-based deletion of Bot metadata. ` +
                        `Most cleanup must be done manually via Setup. The wizard reuses bot users ` +
                        `automatically, so you typically only need to delete the agent if retrying with a different name.`;

            // Clear failed state
            this.failedDeployState = null;

            // Reset steps
            this.steps = null;

            console.log('Cleanup initiated. See error message for manual steps.');

        } catch (err) {
            console.error('Cleanup error:', err);
            this.error = 'Cleanup failed: ' + err.message;
        } finally {
            this.creating = false;
        }
    }
}
