import { LightningElement, api, track } from 'lwc';
import runDeploy from '@salesforce/apex/AdaptiveWebService.runDeploy';


const STEP_LABELS = {
    fetch_config:        'Fetching Configuration',
    create_transformer:  'Setting Up Transformer',
    create_pec:          'Creating Personalization Experience Config',
};

// Fold internal sub-steps into a single visible step.
const STEP_ALIASES = {
    build_transformer: 'create_transformer',
};

function canonicalName(name) {
    return STEP_ALIASES[name] || name;
}

const STEP_ORDER = [
    'fetch_config',
    'create_transformer',
    'create_pec',
];

function makeStep(name) {
    return {
        name,
        status:      'pending',
        label:       STEP_LABELS[name] || name,
        icon:        'utility:routing_offline',
        iconVariant: '',
        stepClass:   'step-item step-pending',
    };
}

function enrichStep(s) {
    const icons = {
        completed: 'utility:check',
        failed:    'utility:error',
        running:   'utility:clock',
    };
    const variants = {
        completed: 'success',
        failed:    'error',
        running:   'warning',
    };
    return {
        ...s,
        label:       STEP_LABELS[s.name] || s.name,
        icon:        icons[s.status] || 'utility:routing_offline',
        iconVariant: variants[s.status] || '',
        stepClass:   `step-item step-${s.status}`,
    };
}

export default class AwDeployProgress extends LightningElement {
    @api sessionId;
    @api selectedSitemap;
    @api selectedDeployment;

    @track steps         = STEP_ORDER.map(makeStep);
    @track statusMessage = 'Setting up Adaptive Web...';
    @track isRunning     = true;
    @track isFailed      = false;
    @track errorMessage  = '';

    // Collapse server-reported sub-steps (e.g. build_transformer) into the
    // single visible step they belong to, and aggregate statuses so the
    // visible step reflects the worst/most-advanced sub-step state.
    _mergeServerSteps(sfSteps) {
        const PRIORITY = { failed: 4, running: 3, pending: 2, completed: 1 };
        const byCanonical = new Map();
        const allCompleted = new Map();
        for (const s of sfSteps) {
            const key = canonicalName(s.name);
            const prev = byCanonical.get(key);
            if (!prev || (PRIORITY[s.status] || 0) > (PRIORITY[prev.status] || 0)) {
                byCanonical.set(key, { name: key, status: s.status, error: s.error });
            }
            const done = allCompleted.has(key) ? allCompleted.get(key) : true;
            allCompleted.set(key, done && s.status === 'completed');
        }
        for (const [key, done] of allCompleted) {
            if (done) byCanonical.set(key, { name: key, status: 'completed' });
        }

        return STEP_ORDER.map(n => {
            const merged = byCanonical.get(n);
            return enrichStep({ ...makeStep(n), ...(merged || {}) });
        });
    }

    async connectedCallback() {
        try {
            const result = await runDeploy({
                deploymentDevName: this.selectedDeployment?.developerName || '',
                appSourceId:       this.selectedSitemap?.appId || '',
                sessionId:         this.sessionId,
            });

            if (!result.success) {
                // Apex may return partial step data even on failure
                if (result.data?.steps) {
                    this.steps = this._mergeServerSteps(result.data.steps);
                }
                this.isFailed     = true;
                this.isRunning    = false;
                this.statusMessage = 'Deployment failed.';
                this.errorMessage = result.message || 'An error occurred during deployment.';
                return;
            }

            // Success — render all steps as completed
            if (result.data?.steps) {
                this.steps = this._mergeServerSteps(result.data.steps);
            } else {
                this.steps = STEP_ORDER.map(n => enrichStep({ ...makeStep(n), status: 'completed' }));
            }

            this.isRunning    = false;
            this.statusMessage = 'Deployment complete!';

            this.dispatchEvent(new CustomEvent('deploycomplete', {
                detail: { result: result.data?.result }
            }));

        } catch (err) {
            this.isFailed     = true;
            this.isRunning    = false;
            this.statusMessage = 'Deployment failed.';
            this.errorMessage = (err.body?.message) || err.message || 'Failed to run deployment.';
        }
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }
}
