window.SalesforceInteractions.log.setLoggingLevel('debug')
/* DATA CLOUD WEB SDK SITEMAP */
SalesforceInteractions.init({
    consents: [{
        provider: 'Test Provider',
        purpose: SalesforceInteractions.ConsentPurpose.Tracking,
        status: SalesforceInteractions.ConsentStatus.OptIn
    }]
}).then(() => {
    const sitemapConfig = {
        pageTypeDefault: {
            name: "default",
            interaction: {
                name: "Default_Page",
                eventType: "userEngagement"
            },
            isMatch: () => true
        },
        pageTypes: [],
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});
/* END DATA CLOUD WEB SDK SITEMAP */
function addControllerToPage() {
    //Controller Code Goes Here
}

function addAppToPage() {
    // App Code Goes Here
}


window.addControllerToPage = addControllerToPage;
window.addAppToPage = addAppToPage;

try { 
  window.addControllerToPage()
  window.addAppToPage()
  window.AdaptiveWebsite.initialize({
    organizationId: "00DHu00000sTjID",
    messagingUrl: "adaptive_web_agent_custom",
    deploymentDeveloperName: "https://storm-d759b260ae0825.my.salesforce-scrt.com"
  })
} catch (e) {
  console.error("[Salesforce Personalization] Error initializing AgentScript:", e);
}