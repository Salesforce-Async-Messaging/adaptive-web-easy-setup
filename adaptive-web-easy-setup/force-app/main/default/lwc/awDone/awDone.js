import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class AwDone extends NavigationMixin(LightningElement) {
    @api deployResult;

    // Created Object Summary is collapsed by default; the user can expand
    // it to review the objects created during setup.
    @track _summaryExpanded = false;

    get isSummaryExpanded() {
        return this._summaryExpanded;
    }

    get summaryAriaExpanded() {
        return this._summaryExpanded ? 'true' : 'false';
    }

    get summaryToggleIcon() {
        return this._summaryExpanded ? 'utility:chevrondown' : 'utility:chevronright';
    }

    handleToggleSummary() {
        this._summaryExpanded = !this._summaryExpanded;
    }

    get hasDeploymentInfo() {
        return !!(this.deployResult?.deployment?.developerName);
    }

    get deploymentLabel() {
        return this.deployResult?.deployment?.label || '';
    }

    get deploymentDevName() {
        return this.deployResult?.deployment?.developerName || '';
    }

    get webConnectorLabel() {
        return this.deployResult?.webConnector?.label || '';
    }

    get webConnectorUrl() {
        const devName = this.deployResult?.webConnector?.name;
        return devName ? '/lightning/setup/StreamingAppSetup/' + devName + '/view' : '';
    }

    get hasWebConnectorUrl() {
        return !!this.webConnectorUrl;
    }

    get cdnUrl() {
        return this.deployResult?.cdnUrl || '';
    }

    get hasCdnUrl() {
        return !!this.deployResult?.cdnUrl;
    }

    get hasPublishStep() {
        return this.hasDeploymentInfo;
    }

    get publishUrl() {
        const escId = this.deployResult?.deployment?.id;
        return escId ? '/lightning/setup/EmbeddedServiceDeployments/' + escId + '/view' : '';
    }

    get agentName() {
        return this.deployResult?.agentName || '';
    }

    get agentUrl() {
        const projectId = this.deployResult?.agentProjectId;
        const versionId = this.deployResult?.agentProjectVersionId;
        if (projectId && versionId) {
            return '/AgentAuthoring/agentAuthoringBuilder.app#/project?projectId=' + projectId + '&projectVersionId=' + versionId;
        }
        return '';
    }

    get hasAgentUrl() {
        return !!this.agentUrl;
    }

    get transformerName() {
        return this.deployResult?.transformerName || '';
    }

    get transformerId() {
        return this.deployResult?.transformerId || '';
    }

    get transformerUrl() {
        const id = this.transformerId;
        return id ? '/lightning/r/PersnlTransformer/' + id + '/view' : '';
    }

    get hasTransformerUrl() {
        return !!this.transformerUrl;
    }

    get pecName() {
        return this.deployResult?.pecName || '';
    }

    handleCopyCdn() {
        navigator.clipboard.writeText(this.cdnUrl);
    }

    handleOpenSitemap() {
        const wcName = this.deployResult?.webConnector?.name;
        if (wcName) {
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/lightning/setup/StreamingAppSetup/' + wcName + '/view'
                }
            });
        }
    }

    handleStartOver() {
        this.dispatchEvent(new CustomEvent('startover'));
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }
}
