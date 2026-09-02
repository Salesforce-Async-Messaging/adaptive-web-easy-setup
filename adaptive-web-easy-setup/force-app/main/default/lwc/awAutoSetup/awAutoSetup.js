import { LightningElement, api, track } from 'lwc';
import { buildZip }              from 'c/zipBuilder';
import submitAgentDeploy         from '@salesforce/apex/AdaptiveWebService.submitAgentDeploy';
import checkAgentDeploy          from '@salesforce/apex/AdaptiveWebService.checkAgentDeploy';
import createEswSite             from '@salesforce/apex/AdaptiveWebService.createEswSite';
import getEswPicassoSiteName     from '@salesforce/apex/AdaptiveWebService.getEswPicassoSiteName';
import provisionMessagingChannel from '@salesforce/apex/AdaptiveWebService.provisionMessagingChannel';
import fetchSnippetData          from '@salesforce/apex/AdaptiveWebService.fetchSnippetData';
import createWebConnector        from '@salesforce/apex/AdaptiveWebService.createWebConnector';
import runDeploy                 from '@salesforce/apex/AdaptiveWebService.runDeploy';

const POLL_INTERVAL = 3000;

const STEP_LABELS = {
    create_web_connector:    'Create Web Connector',
    deploy_routing_queue:    'Deploy Routing and Queue',
    create_messaging_ch:     'Set Up Messaging Channel',
    create_site:             'Creating Experience Cloud Site',
    deploy_esc:              'Create Enhanced Chat Deployment',
    fetch_snippet_data:      'Fetching Configuration Data',
    fetch_config:            'Fetching Org Config',
    create_transformer:      'Set Up Experience Template',
    create_pec:              'Create Personalization Experience Configuration',
};

// Aliases fold internal sub-steps from the server into a single visible
// step so pairs like create+activate or build+create aren't shown twice.
const STEP_ALIASES = {
    activate_messaging_ch: 'create_messaging_ch',
    build_transformer:     'create_transformer',
};

function canonicalName(name) {
    return STEP_ALIASES[name] || name;
}

function makeStep(name) {
    return { name, status: 'pending', label: STEP_LABELS[name] || name };
}

const HIDDEN_STEPS = new Set([
    'create_site',
    'fetch_snippet_data',
    'fetch_config',
]);

function enrichStep(s) {
    const icons    = { completed: 'utility:check', failed: 'utility:error' };
    const variants = { completed: 'success', failed: 'error' };
    return {
        ...s,
        label:       STEP_LABELS[s.name] || s.name,
        isRunning:   s.status === 'running',
        icon:        icons[s.status]    || 'utility:routing_offline',
        iconVariant: variants[s.status] || '',
        stepClass:   `step-item step-${s.status}`,
        hidden:      HIDDEN_STEPS.has(s.name),
    };
}

const INFRA_STEPS = [
    'create_web_connector',
    'deploy_routing_queue',
    'create_messaging_ch',
    'create_site',
    'deploy_esc',
    'fetch_snippet_data',
];

const DEPLOY_STEPS = [
    'fetch_config',
    'create_transformer',
    'create_pec',
];

export default class AwAutoSetup extends LightningElement {
    @api sessionId;
    @api createdAgent;

    @track steps         = [...INFRA_STEPS, ...DEPLOY_STEPS].map(n => enrichStep(makeStep(n)));
    @track isRunning     = true;
    @track isFailed      = false;
    @track isComplete    = false;
    @track errorMessage  = '';
    @track statusMessage = 'This step creates the communication channel between your org and your website, deploys the components that deliver personalized content, and enables real-time behavioral tracking so the agent improves with every interaction.';

    _pendingResult = null;

    get visibleSteps() {
        const visible = this.steps.filter(s => !s.hidden);
        if (!this.isRunning) return visible;
        const hasRunning = visible.some(s => s.isRunning);
        if (hasRunning) return visible;
        let foundFirst = false;
        return visible.map(s => {
            if (!foundFirst && s.status === 'pending') {
                foundFirst = true;
                return { ...s, isRunning: true, stepClass: 'step-item step-running' };
            }
            return s;
        });
    }

    _setSteps(updates) {
        // Normalize alias names → canonical step names.
        const normalized = updates.map(u => ({ ...u, name: canonicalName(u.name) }));
        this.steps = this.steps.map(s => {
            const u = normalized.find(x => x.name === s.name);
            return u ? enrichStep({ ...s, ...u }) : s;
        });
    }

    _markRunning(name) { this._setSteps([{ name, status: 'running' }]); }
    _markDone(name)    { this._setSteps([{ name, status: 'completed' }]); }
    _markFailed(name)  { this._setSteps([{ name, status: 'failed' }]); }

    _mergeSfSteps(sfSteps) {
        // When the server returns multiple sub-steps that collapse to the
        // same visible step, merge them: failed > running > pending <
        // completed. The visible step is only "completed" once every
        // sub-step under it is completed.
        const PRIORITY = { failed: 4, running: 3, pending: 2, completed: 1 };
        const byCanonical = new Map();
        for (const s of sfSteps) {
            const key = canonicalName(s.name);
            const prev = byCanonical.get(key);
            if (!prev || (PRIORITY[s.status] || 0) > (PRIORITY[prev.status] || 0)) {
                byCanonical.set(key, { name: key, status: s.status, error: s.error });
            }
        }
        // If every sub-step that maps to a canonical is completed, mark the
        // canonical completed — the priority check above would otherwise
        // leave it as completed only when the last sub-step wins.
        const allCompleted = new Map();
        for (const s of sfSteps) {
            const key = canonicalName(s.name);
            const running = allCompleted.get(key);
            if (running === undefined) {
                allCompleted.set(key, s.status === 'completed');
            } else {
                allCompleted.set(key, running && s.status === 'completed');
            }
        }
        for (const [key, done] of allCompleted) {
            if (done) byCanonical.set(key, { name: key, status: 'completed' });
        }
        this._setSteps(Array.from(byCanonical.values()));
    }

    _sleep(ms) {
        return new Promise(resolve => {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(resolve, ms);
        });
    }

    async connectedCallback() {
        try {
            await this._run();
        } catch (err) {
            this.isFailed      = true;
            this.isRunning     = false;
            this.statusMessage = 'Setup failed.';
            this.errorMessage  = (err.body?.message) || err.message || 'Unexpected error.';
        }
    }

    // ── Metadata builders ─────────────────────────────────────────────

    _buildRoutingQueueFiles(routingDevName, queueDevName, baseLabel) {
        return [
            { name: 'package.xml', content:
`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
    <members>${routingDevName}</members>
    <name>QueueRoutingConfig</name>
  </types>
  <types>
    <members>${queueDevName}</members>
    <name>Queue</name>
  </types>
  <version>66.0</version>
</Package>` },
            { name: `queueRoutingConfigs/${routingDevName}.queueRoutingConfig-meta.xml`, content:
`<?xml version="1.0" encoding="UTF-8"?>
<QueueRoutingConfig xmlns="http://soap.sforce.com/2006/04/metadata">
    <capacityWeight>1.0</capacityWeight>
    <isAttributeBased>false</isAttributeBased>
    <label>${baseLabel} Routing</label>
    <routingModel>MOST_AVAILABLE</routingModel>
    <routingPriority>1</routingPriority>
</QueueRoutingConfig>` },
            { name: `queues/${queueDevName}.queue-meta.xml`, content:
`<?xml version="1.0" encoding="UTF-8"?>
<Queue xmlns="http://soap.sforce.com/2006/04/metadata">
    <doesSendEmailToMembers>false</doesSendEmailToMembers>
    <name>${baseLabel} Queue</name>
    <queueRoutingConfig>${routingDevName}</queueRoutingConfig>
    <queueSobject>
        <sobjectType>MessagingSession</sobjectType>
    </queueSobject>
</Queue>` },
        ];
    }

    _buildEscFiles(escDevName, baseLabel, picassoSiteName, messagingChannelDevName) {
        return [
            { name: 'package.xml', content:
`<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
    <members>${escDevName}</members>
    <name>EmbeddedServiceConfig</name>
  </types>
  <version>66.0</version>
</Package>` },
            { name: `EmbeddedServiceConfig/${escDevName}.EmbeddedServiceConfig-meta.xml`, content:
`<?xml version="1.0" encoding="UTF-8"?>
<EmbeddedServiceConfig xmlns="http://soap.sforce.com/2006/04/metadata">
    <deploymentFeature>EmbeddedMessaging</deploymentFeature>
    <deploymentType>Api</deploymentType>
    <embeddedServiceMessagingChannel>
        <isEnabled>true</isEnabled>
        <messagingChannel>${messagingChannelDevName}</messagingChannel>
        <shouldShowAgentforceTagline>false</shouldShowAgentforceTagline>
        <shouldShowDeliveryReceipts>false</shouldShowDeliveryReceipts>
        <shouldShowEmojiSelection>false</shouldShowEmojiSelection>
        <shouldShowReadReceipts>false</shouldShowReadReceipts>
        <shouldShowTypingIndicators>false</shouldShowTypingIndicators>
        <shouldStartNewLineOnEnter>false</shouldStartNewLineOnEnter>
    </embeddedServiceMessagingChannel>
    <isEnabled>true</isEnabled>
    <masterLabel>${baseLabel} Deployment</masterLabel>
</EmbeddedServiceConfig>` },
        ];
    }

    // ── Deploy helpers ────────────────────────────────────────────────

    async _pollDeploy(deployId) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            await this._sleep(POLL_INTERVAL);
            const res = await checkAgentDeploy({ deployId, sessionId: this.sessionId });
            if (!res.success) throw new Error(res.message);
            const dr = res.data?.deployResult;
            if (dr && dr.done) {
                if (dr.status === 'Succeeded' || dr.status === 'SucceededPartial') {
                    return dr;
                }
                const failures = dr.details?.componentFailures;
                let msg = 'Deploy ' + (dr.status || 'failed');
                if (failures) {
                    const arr = Array.isArray(failures) ? failures : [failures];
                    msg += ' — ' + arr.map(f => f.fullName + ': ' + f.problem).join('; ');
                }
                throw new Error(msg);
            }
        }
    }

    async _deployAndPoll(zipBase64) {
        const submitRes = await submitAgentDeploy({ zipBase64, sessionId: this.sessionId });
        if (!submitRes.success) throw new Error(submitRes.message);
        return this._pollDeploy(submitRes.data.deployId);
    }

    // ── Main flow ──────────────────────────────────────────────────────

    async _run() {
        const agentName = this.createdAgent?.agentName || '';
        const baseLabel = 'Adaptive Web';
        const suffix    = Date.now();
        const safeName  = 'AW_' + suffix;

        // ── Phase 1: Create Web Connector ────────────────────────────────
        this._markRunning('create_web_connector');
        const wcRes = await createWebConnector({ sessionId: this.sessionId });
        if (!wcRes.success) {
            this._markFailed('create_web_connector');
            throw new Error(wcRes.message);
        }
        const webConnector = wcRes.data;
        this._markDone('create_web_connector');

        // ── Phase 2: Deploy Routing Config + Queue ───────────────────────
        this._markRunning('deploy_routing_queue');
        const routingDevName = safeName + '_Routing';
        const queueDevName   = safeName + '_Queue';
        await this._deployAndPoll(buildZip(this._buildRoutingQueueFiles(routingDevName, queueDevName, baseLabel)));
        this._markDone('deploy_routing_queue');

        // ── Phase 3: Create + Activate Messaging Channel ─────────────────
        this._markRunning('create_messaging_ch');
        const agentDevName = (agentName && agentName !== 'SKIPPED')
            ? agentName
            : 'AdaptiveWeb_1777308807553';
        const msgChRes = await provisionMessagingChannel({
            baseLabel,
            queueDevName,
            agentDeveloperName: agentDevName,
            sessionId: this.sessionId,
        });
        if (msgChRes.data?.steps) {
            this._mergeSfSteps(msgChRes.data.steps);
        }
        if (!msgChRes.success) {
            throw new Error(msgChRes.message);
        }
        const messagingChannelDevName = msgChRes.data.messagingChannelDevName;

        // ── Phase 4: Create ESW Site via Connect API ─────────────────────
        this._markRunning('create_site');
        const escDevName = safeName + '_ESC';
        const siteRes = await createEswSite({ deploymentName: escDevName, sessionId: this.sessionId });
        if (!siteRes.success) {
            this._markFailed('create_site');
            throw new Error(siteRes.message);
        }
        const eswSiteName = siteRes.data.siteName;

        let picassoSiteName = null;
        for (let i = 0; i < 100; i++) {   // 100 × 3s = ~5 min (first Experience site in a fresh org can cold-start > 2 min)
            await this._sleep(POLL_INTERVAL);
            const pollRes = await getEswPicassoSiteName({ siteName: eswSiteName, sessionId: this.sessionId });
            if (pollRes.success) {
                picassoSiteName = pollRes.data.picassoSiteName;
                break;
            }
        }
        if (!picassoSiteName) {
            this._markFailed('create_site');
            throw new Error('Timed out waiting for ESW site creation.');
        }
        this._markDone('create_site');

        // ── Phase 5: Deploy ESC with messaging channel link + enabled ────
        this._markRunning('deploy_esc');
        await this._deployAndPoll(buildZip(
            this._buildEscFiles(escDevName, baseLabel, picassoSiteName, messagingChannelDevName)
        ));
        this._markDone('deploy_esc');

        // ── Phase 6: Fetch snippet data ──────────────────────────────────
        this._markRunning('fetch_snippet_data');
        const snippetRes = await fetchSnippetData({ escDevName, sessionId: this.sessionId });
        const deployment = snippetRes.success ? snippetRes.data : { developerName: escDevName, label: baseLabel + ' Deployment' };
        this._markDone('fetch_snippet_data');

        // ── Phase 7: Run Personalization deploy ──────────────────────────
        this.statusMessage = 'Configuring Adaptive Web transformer…';
        const deployRes = await runDeploy({
            deploymentDevName: deployment.developerName || escDevName,
            appSourceId:       webConnector.id,
            sessionId:         this.sessionId,
        });

        if (deployRes.data?.steps) {
            this._mergeSfSteps(deployRes.data.steps);
        }

        if (!deployRes.success) {
            this.isFailed      = true;
            this.isRunning     = false;
            this.statusMessage = 'Setup failed.';
            this.errorMessage  = deployRes.message || 'Deploy error.';
            return;
        }

        // ── Done ─────────────────────────────────────────────────────────
        this.isRunning     = false;
        this.isComplete    = true;
        this.statusMessage = 'Setup complete!';

        const cdnUrl = `https://cdn.c360a.salesforce.com/beacon/c360a/${webConnector.id}/scripts/c360a.min.js`;

        this._pendingResult = {
            ...deployRes.data?.result,
            agentName: this.createdAgent?.agentName || '',
            agentProjectId: this.createdAgent?.agentProjectId || '',
            agentProjectVersionId: this.createdAgent?.agentProjectVersionId || '',
            deployment,
            webConnector,
            cdnUrl,
        };
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    handleUseExisting() {
        this.dispatchEvent(new CustomEvent('useexisting'));
    }

    handleNext() {
        if (!this._pendingResult) return;
        this.dispatchEvent(new CustomEvent('autosetupcomplete', {
            detail: { result: this._pendingResult },
        }));
    }
}
