import { LightningElement, track } from 'lwc';

const SCREENS = {
    SETUP:      'setup',
    AGENT:      'agent',
    AUTO_SETUP: 'autosetup',
    SITEMAP:    'sitemap',
    DEPLOYMENT: 'deployment',
    DEPLOY:     'deploy',
    DONE:       'done',
};

const STAGE_ORDER = ['setup', 'agent', 'configure', 'golive'];

const SCREEN_TO_STAGE = {
    setup:      'setup',
    agent:      'agent',
    autosetup:  'configure',
    sitemap:    'configure',
    deployment: 'configure',
    deploy:     'golive',
    done:       'golive',
};

const STAGE_DEFS = [
    { id: 'setup',     label: 'Before you Begin' },
    { id: 'agent',     label: 'Create Agent' },
    { id: 'configure', label: 'Configure' },
    { id: 'golive',    label: 'Go Live' },
];

const INITIAL_MOUNTED = {
    setup:      true,
    agent:      false,
    autosetup:  false,
    sitemap:    false,
    deployment: false,
    deploy:     false,
    done:       false,
};

export default class AwWizard extends LightningElement {
    @track screen = SCREENS.SETUP;

    @track betaAccepted       = false;
    @track createdAgent       = null;
    @track selectedSitemap    = null;
    @track selectedDeployment = null;
    @track deployResult       = null;
    @track sessionId          = null;

    // Tracks which screens have been mounted. Once mounted, a screen
    // stays mounted (just hidden) so its state — progress, checkmarks,
    // fetched data — is preserved when the user navigates back.
    @track mounted = { ...INITIAL_MOUNTED };

    // Remembers the screen the user was on right before Done, so the
    // Done page's Back button returns to the correct configure step.
    _previousBeforeDone = null;

    // ── Lifecycle ─────────────────────────────────────────────────

    connectedCallback() {
        this._boundMessageHandler = this._handleMessage.bind(this);
        window.addEventListener('message', this._boundMessageHandler);
    }

    disconnectedCallback() {
        window.removeEventListener('message', this._boundMessageHandler);
    }

    _handleMessage(evt) {
        if (evt.data && evt.data.type === 'sf_session' && evt.data.sessionId) {
            this.sessionId = evt.data.sessionId;
        }
    }

    get isSessionReady() {
        return !!this.sessionId;
    }

    // ── Stage sidebar ─────────────────────────────────────────────

    get currentStageId() {
        return SCREEN_TO_STAGE[this.screen] || 'configure';
    }

    get _reachedStageIdx() {
        const stagesReached = Object.keys(this.mounted)
            .filter(k => this.mounted[k])
            .map(k => STAGE_ORDER.indexOf(SCREEN_TO_STAGE[k] || 'configure'));
        return stagesReached.length ? Math.max(...stagesReached) : 0;
    }

    get wizardStages() {
        const currentIdx = STAGE_ORDER.indexOf(this.currentStageId);
        const reachedIdx = this._reachedStageIdx;
        const last = STAGE_DEFS.length - 1;
        return STAGE_DEFS.map((s, i) => {
            const isCurrent  = i === currentIdx;
            const isComplete = !isCurrent && i <= reachedIdx;
            return {
                ...s,
                isLast: i === last,
                itemClass: 'stage-item',
                dotClass: isComplete ? 'stage-dot stage-dot-complete'
                        : isCurrent  ? 'stage-dot stage-dot-active'
                        : 'stage-dot',
                lineClass: isComplete ? 'stage-line stage-line-complete'
                         : 'stage-line',
                labelClass: isComplete ? 'stage-label stage-label-complete'
                           : isCurrent  ? 'stage-label stage-label-active'
                           : 'stage-label',
            };
        });
    }

    // ── Screen mount flags (stay true once visited) ───────────────

    get showSetup()      { return this.mounted.setup; }
    get showAgent()      { return this.mounted.agent; }
    get showAutoSetup()  { return this.mounted.autosetup; }
    get showSitemap()    { return this.mounted.sitemap; }
    get showDeployment() { return this.mounted.deployment; }
    get showDeploy()     { return this.mounted.deploy; }
    get showDone()       { return this.mounted.done; }

    // ── Screen visibility classes ─────────────────────────────────

    _classFor(s) {
        return this.screen === s ? 'screen-wrapper' : 'screen-wrapper is-hidden';
    }

    get setupClass()      { return this._classFor(SCREENS.SETUP); }
    get agentClass()      { return this._classFor(SCREENS.AGENT); }
    get autoSetupClass()  { return this._classFor(SCREENS.AUTO_SETUP); }
    get sitemapClass()    { return this._classFor(SCREENS.SITEMAP); }
    get deploymentClass() { return this._classFor(SCREENS.DEPLOYMENT); }
    get deployClass()     { return this._classFor(SCREENS.DEPLOY); }
    get doneClass()       { return this._classFor(SCREENS.DONE); }

    _goTo(screen) {
        this.mounted = { ...this.mounted, [screen]: true };
        this.screen  = screen;
    }

    // ── Step navigations ──────────────────────────────────────────

    handleSetupChecked()       { this._goTo(SCREENS.AGENT); }

    handleAgentCreated(event) {
        this.createdAgent = event.detail.agent;
        this._goTo(SCREENS.AUTO_SETUP);
    }

    handleBackToSetup()      { this.screen = SCREENS.SETUP; }
    handleBackToAgent()      { this.screen = SCREENS.AGENT; }
    handleBackToAutoSetup()  { this.screen = SCREENS.AUTO_SETUP; }
    handleBackToSitemap()    { this.screen = SCREENS.SITEMAP; }
    handleBackToDeployment() { this.screen = SCREENS.DEPLOYMENT; }

    handleBackFromDone() {
        this.screen = this._previousBeforeDone || SCREENS.AUTO_SETUP;
    }

    handleAutoSetupComplete(event) {
        this.deployResult        = event.detail.result;
        this._previousBeforeDone = SCREENS.AUTO_SETUP;
        // Only forward to the Done screen if the user is still watching
        // the auto-setup run. If they navigated away (e.g. hit Back), keep
        // their current screen — they can advance manually.
        if (this.screen === SCREENS.AUTO_SETUP) {
            this._goTo(SCREENS.DONE);
        } else {
            this.mounted = { ...this.mounted, done: true };
        }
    }

    // Existing-user manual path
    handleUseExisting() {
        this._goTo(SCREENS.SITEMAP);
    }

    handleSitemapSelected(event) {
        this.selectedSitemap = event.detail.sitemap;
        this._goTo(SCREENS.DEPLOYMENT);
    }

    handleDeploymentSelected(event) {
        this.selectedDeployment = event.detail.deployment;
        this._goTo(SCREENS.DEPLOY);
    }

    handleDeployComplete(event) {
        this.deployResult        = event.detail.result;
        this._previousBeforeDone = SCREENS.DEPLOY;
        if (this.screen === SCREENS.DEPLOY) {
            this._goTo(SCREENS.DONE);
        } else {
            this.mounted = { ...this.mounted, done: true };
        }
    }

    handleStartOver() {
        this.screen             = SCREENS.SETUP;
        this.mounted            = { ...INITIAL_MOUNTED };
        this.createdAgent       = null;
        this.selectedSitemap    = null;
        this.selectedDeployment = null;
        this.deployResult       = null;
        this._previousBeforeDone = null;
    }

    handleAcceptBeta() {
        this.betaAccepted = true;
    }
}
