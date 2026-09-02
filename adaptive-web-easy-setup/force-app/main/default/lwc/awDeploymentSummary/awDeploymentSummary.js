import { LightningElement, api, track } from 'lwc';

export default class AwDeploymentSummary extends LightningElement {
    @api sessionId;
    @api createdAgent;
    @api deploymentResult;

    @track copiedSnippet = false;
    @track copiedUrl = false;

    get agentName() {
        return this.createdAgent?.agentName || 'N/A';
    }

    get botUserUsername() {
        return this.deploymentResult?.botUserUsername || 'N/A';
    }

    get webConnectorName() {
        return this.deploymentResult?.webConnectorName || 'N/A';
    }

    get queueName() {
        return this.deploymentResult?.queueName || 'N/A';
    }

    get messagingChannelName() {
        return this.deploymentResult?.messagingChannelName || 'N/A';
    }

    get escDeploymentName() {
        return this.deploymentResult?.escDeploymentName || 'N/A';
    }

    get transformerName() {
        return this.deploymentResult?.transformerName || 'Org-Level Transformer';
    }

    get pecName() {
        return this.deploymentResult?.pecName || 'N/A';
    }

    get cdnSnippet() {
        return this.deploymentResult?.cdnSnippet || '<script src="..."></script>';
    }

    get messagingPreviewUrl() {
        // Construct URL to messaging preview
        const baseUrl = window.location.origin;
        return `${baseUrl}/lightning/setup/EmbeddedServiceConfigs/home`;
    }

    get agentStudioUrl() {
        const baseUrl = window.location.origin;
        return `${baseUrl}/lightning/setup/Agents/home`;
    }

    get dataCloudUrl() {
        const baseUrl = window.location.origin;
        return `${baseUrl}/lightning/setup/DataCloudSetup/home`;
    }

    get artifacts() {
        return [
            {
                id: 'agent',
                label: 'Agent',
                value: this.agentName,
                setupPath: this.agentStudioUrl,
                icon: 'standard:bot',
            },
            {
                id: 'botuser',
                label: 'Bot User',
                value: this.botUserUsername,
                setupPath: `${window.location.origin}/lightning/setup/ManageUsers/home`,
                icon: 'standard:user',
            },
            {
                id: 'webconnector',
                label: 'Web Connector',
                value: this.webConnectorName,
                setupPath: this.dataCloudUrl,
                icon: 'standard:data_streams',
            },
            {
                id: 'queue',
                label: 'Queue',
                value: this.queueName,
                setupPath: `${window.location.origin}/lightning/setup/Queues/home`,
                icon: 'standard:queue',
            },
            {
                id: 'messaging',
                label: 'Messaging Channel',
                value: this.messagingChannelName,
                setupPath: `${window.location.origin}/lightning/setup/MessagingChannels/home`,
                icon: 'standard:messaging_session',
            },
            {
                id: 'esc',
                label: 'Embedded Service Deployment',
                value: this.escDeploymentName,
                setupPath: `${window.location.origin}/lightning/setup/EmbeddedServiceConfigs/home`,
                icon: 'standard:portal',
            },
            {
                id: 'transformer',
                label: 'Transformer',
                value: this.transformerName,
                setupPath: this.dataCloudUrl,
                icon: 'standard:flow',
            },
            {
                id: 'pec',
                label: 'Personalization Experience Config',
                value: this.pecName,
                setupPath: this.dataCloudUrl,
                icon: 'standard:custom',
            },
        ];
    }

    get postDeploymentSteps() {
        return [
            {
                id: 'step1',
                label: 'Copy the CDN snippet below and add it to your website',
                completed: false,
            },
            {
                id: 'step2',
                label: 'Load product catalog data into Data Cloud (ssot__GoodsProduct__dlm)',
                completed: false,
            },
            {
                id: 'step3',
                label: 'Test the agent in Messaging Preview',
                completed: false,
            },
            {
                id: 'step4',
                label: 'Configure agent topics and actions in Agent Studio',
                completed: false,
            },
            {
                id: 'step5',
                label: 'Set up monitoring for agent sessions',
                completed: false,
            },
        ];
    }

    handleCopySnippet() {
        const snippet = this.cdnSnippet;
        navigator.clipboard.writeText(snippet).then(() => {
            this.copiedSnippet = true;
            setTimeout(() => {
                this.copiedSnippet = false;
            }, 2000);
        });
    }

    handleCopyUrl() {
        const url = this.messagingPreviewUrl;
        navigator.clipboard.writeText(url).then(() => {
            this.copiedUrl = true;
            setTimeout(() => {
                this.copiedUrl = false;
            }, 2000);
        });
    }

    handleOpenMessagingPreview() {
        window.open(this.messagingPreviewUrl, '_blank');
    }

    handleOpenAgentStudio() {
        window.open(this.agentStudioUrl, '_blank');
    }

    handleOpenDataCloud() {
        window.open(this.dataCloudUrl, '_blank');
    }

    handleFinish() {
        this.dispatchEvent(new CustomEvent('finish'));
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }
}
