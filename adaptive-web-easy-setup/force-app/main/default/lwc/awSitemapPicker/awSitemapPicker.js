import { LightningElement, api, track } from 'lwc';
import getSitemaps from '@salesforce/apex/AdaptiveWebService.getSitemaps';
import updateSitemap from '@salesforce/apex/AdaptiveWebService.updateSitemap';

// Template for sitemap - {STATIC_RESOURCE_URL} will be replaced with actual URL
const SITEMAP_TEMPLATE = `
(function() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "{STATIC_RESOURCE_URL}";
  script.onload = () => {
    if (window.addControllerToPage) window.addControllerToPage();
    if (window.addAppToPage) window.addAppToPage();
  };
  script.onerror = (err) => {
    console.error("Failed to load Adaptive Web SDK:", err);
  };
  document.head.appendChild(script);
})();
SalesforceInteractions.init().then(() => { SalesforceInteractions.initSitemap({}) });
`.trim();

export default class AwSitemapPicker extends LightningElement {
    @api sessionId;

    // Public Asset File URL for the bootstrap bundle, resolved server-side by getSitemaps().
    _bootstrapUrl = '';

    @track loading       = true;
    @track error         = null;
    @track apps          = [];
    @track selectedAppId = '';
    @track saving        = false;
    @track saveError     = null;

    connectedCallback() {
        this._loadApps();
    }

    async _loadApps() {
        this.loading = true;
        this.error   = null;
        try {
            const result = await getSitemaps({ sessionId: this.sessionId });
            if (!result.success) throw new Error(result.message);
            this.apps    = result.data.apps || [];
            this._bootstrapUrl = result.data.bootstrapUrl || '';
        } catch (err) {
            this.error = (err.body?.message) || err.message || 'Failed to load web connectors.';
        } finally {
            this.loading = false;
        }
    }

    get appOptions() {
        return this.apps.map(a => ({ label: a.label || a.name, value: a.id }));
    }

    get selectedApp() {
        return this.apps.find(a => a.id === this.selectedAppId) || null;
    }

    get selectedHasSitemap() {
        return !!this.selectedApp?.hasSitemap;
    }

    get nextLabel() { return this.saving ? 'Saving...' : 'Next'; }

    get isNextDisabled() {
        return !this.selectedAppId || this.saving;
    }

    handleAppChange(e) {
        this.selectedAppId = e.detail.value;
        this.saveError     = null;
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    async handleNext() {
        this.saving    = true;
        this.saveError = null;
        try {
            const app      = this.selectedApp || {};
            const recordId = app.recordId || this.selectedAppId;
            if (!app.hasSitemap) {
                // Public Asset File (ContentAsset) URL, resolved server-side by getSitemaps()
                // as https://<my_domain>.my.salesforce.com/file-asset/<name>?oid=<orgId>.
                // The Asset File is marked isVisibleByExternalUsers so it loads
                // unauthenticated on the customer's website.
                if (!this._bootstrapUrl) throw new Error('Bootstrap asset URL unavailable; cannot build sitemap.');

                // Replace placeholder with actual URL
                const sitemapContent = SITEMAP_TEMPLATE.replace('{STATIC_RESOURCE_URL}', this._bootstrapUrl);

                const result = await updateSitemap({
                    recordId,
                    sitemapContent,
                    sessionId:     this.sessionId,
                });
                if (!result.success) throw new Error(result.message);
            }

            const sitemap = {
                id:      recordId,
                name:    app.name  || recordId,
                label:   app.label || app.name || recordId,
                appId:   this.selectedAppId,
                appName: app.name  || this.selectedAppId,
            };

            this.dispatchEvent(new CustomEvent('sitemapselected', { detail: { sitemap } }));
        } catch (err) {
            this.saveError = (err.body?.message) || err.message || 'Failed to update web connector.';
        } finally {
            this.saving = false;
        }
    }
}


