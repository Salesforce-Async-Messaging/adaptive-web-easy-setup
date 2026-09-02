import { LightningElement, api, track } from 'lwc';
import getDeployments from '@salesforce/apex/AdaptiveWebService.getDeployments';

export default class AwDeploymentPicker extends LightningElement {
    @api sessionId;

    @track loading     = true;
    @track error       = null;
    @track deployments = [];
    @track selectedId  = '';

    connectedCallback() {
        this._load();
    }

    async _load() {
        this.loading = true;
        this.error   = null;
        try {
            const result = await getDeployments({ sessionId: this.sessionId });
            if (!result.success) throw new Error(result.message);
            this.deployments = result.data.deployments || [];
        } catch (err) {
            this.error = (err.body?.message) || err.message || 'Failed to load deployments.';
        } finally {
            this.loading = false;
        }
    }

    get deploymentOptions() {
        return this.deployments.map(d => ({
            label: `${d.label} (${d.developerName})`,
            value: d.id,
        }));
    }

    get selectedDeployment() {
        return this.deployments.find(d => d.id === this.selectedId) || null;
    }

    get hasSelection()   { return !!this.selectedId; }
    get isNextDisabled() { return !this.selectedId; }

    get detailLabel()    { return this.selectedDeployment?.label || ''; }
    get detailDevName()  { return this.selectedDeployment?.developerName || ''; }
    get detailSiteUrl()  { return this.selectedDeployment?.siteUrl || '—'; }
    get detailFullName() { return this.selectedDeployment?.fullName || ''; }

    handleChange(e) { this.selectedId = e.detail.value; }

    handleNext() {
        this.dispatchEvent(new CustomEvent('deploymentselected', {
            detail: { deployment: this.selectedDeployment }
        }));
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }
}
