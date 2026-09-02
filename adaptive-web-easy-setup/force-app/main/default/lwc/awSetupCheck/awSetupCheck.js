import { LightningElement, api, track } from 'lwc';
import getPersonalizationSetupUrl from '@salesforce/apex/AdaptiveWebService.getPersonalizationSetupUrl';

export default class AwSetupCheck extends LightningElement {
    @api sessionId;

    @track loading  = true;
    @track error    = null;
    @track setupUrl = null;
    @track visited  = false;

    connectedCallback() {
        this._loadUrl();
        this._boundVisibility = this._handleVisibility.bind(this);
        document.addEventListener('visibilitychange', this._boundVisibility);
    }

    disconnectedCallback() {
        document.removeEventListener('visibilitychange', this._boundVisibility);
    }

    async _loadUrl() {
        this.loading = true;
        this.error   = null;
        try {
            const result = await getPersonalizationSetupUrl();
            if (!result.success) throw new Error(result.message);
            this.setupUrl = result.data.url;
        } catch (err) {
            this.error = (err.body?.message) || err.message || 'Failed to load setup URL.';
        } finally {
            this.loading = false;
        }
    }

    handleOpenSetup() {
        // Append setupApp=p13n query param so the setup page bootstraps
        // in the Personalization context instead of the default "all" context.
        const url = this.setupUrl + '?setupApp=p13n';
        window.open(url, '_blank');
        this.visited = true;
    }

    _handleVisibility() {
        if (this._linkClicked && !document.hidden) {
            this.visited = true;
        }
    }

    get isNextDisabled() {
        return !this.visited;
    }

    get showVisited() {
        return this.visited;
    }

    get cardTitle() {
        return this.visited ? 'Verified' : 'Personalization Setup';
    }

    get cardDescription() {
        return this.visited
            ? 'Your personalization setup is ready.'
            : "This opens Personalization Setup in a new tab. Return here when you're done.";
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('setupchecked'));
    }
}
