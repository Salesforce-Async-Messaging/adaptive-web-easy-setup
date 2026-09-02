/**
 * AdaptiveWebService — Apex callout implementation.
 *
 * Makes HTTP callouts to this org's Connect API and Tooling API.
 * Authentication uses a REST-capable session ID obtained from the
 * GetSessionId Visualforce page via postMessage in the LWC parent.
 * (UserInfo.getSessionId() returns a Lightning UI-only token that is
 * blocked by Salesforce's REST API layer — the VF page gives us a token
 * that works for REST calls.)
 *
 * All @AuraEnabled methods return Map<String,Object> with the shape:
 *   { success: Boolean, message: String, data: Map<String,Object> }
 */
public with sharing class AdaptiveWebService {

    private static final String API_VER = 'v66.0';
    private static final Integer TIMEOUT = 120000;

    // ── HTTP helpers ──────────────────────────────────────────────────────────

    private static String baseUrl() {
        return System.Url.getOrgDomainUrl().toExternalForm();
    }

    private static HttpResponse doGet(String path, String sessionId) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(baseUrl() + path);
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        req.setHeader('Content-Type', 'application/json');
        req.setTimeout(TIMEOUT);
        return new Http().send(req);
    }

    private static HttpResponse doPost(String path, String body, String sessionId) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(baseUrl() + path);
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        req.setHeader('Content-Type', 'application/json');
        req.setTimeout(TIMEOUT);
        req.setBody(body);
        return new Http().send(req);
    }

    private static HttpResponse doPostNoBody(String path, String sessionId) {
        // POST with no request body (Connect action endpoints that take their
        // input from the path, e.g. /draft and /publish). Mirrors the stock
        // browser call, which sends neither a body nor a Content-Type.
        HttpRequest req = new HttpRequest();
        req.setEndpoint(baseUrl() + path);
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        req.setTimeout(TIMEOUT);
        return new Http().send(req);
    }

    private static HttpResponse doPatch(String path, String body, String sessionId) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(baseUrl() + path);
        req.setMethod('PATCH');
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        req.setHeader('Content-Type', 'application/json');
        req.setTimeout(TIMEOUT);
        req.setBody(body);
        return new Http().send(req);
    }

    private static Map<String, Object> parseJson(HttpResponse res) {
        try {
            return (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        } catch (Exception e) {
            return new Map<String, Object>{
                'error' => 'Parse error: ' + e.getMessage(),
                'raw'   => res.getBody().abbreviate(500)
            };
        }
    }

    private static Map<String, Object> ok(Object data) {
        return new Map<String, Object>{ 'success' => true, 'data' => data };
    }

    private static Map<String, Object> fail(String message) {
        return new Map<String, Object>{ 'success' => false, 'message' => message, 'data' => new Map<String,Object>() };
    }

    // ── Setup URL ─────────────────────────────────────────────────────────────

    @AuraEnabled
    public static Map<String, Object> getPersonalizationSetupUrl() {
        try {
            String orgUrl = System.Url.getOrgDomainUrl().toExternalForm();
            String setupUrl = orgUrl.replace('.salesforce.com', '.salesforce-setup.com')
                + '/lightning/setup/SetupOneHome/home';
            return ok(new Map<String, Object>{ 'url' => setupUrl });
        } catch (Exception e) {
            return fail('Failed to get setup URL: ' + e.getMessage());
        }
    }

    // ── Sitemaps ──────────────────────────────────────────────────────────────

    @AuraEnabled
    public static Map<String, Object> getSitemaps(String sessionId) {
        try {
            // Step 1: list all StreamingAppDataConnector records via Tooling API SOQL
            String soql = 'SELECT Id, DeveloperName, MasterLabel FROM StreamingAppDataConnector LIMIT 20000';
            HttpResponse listRes = doGet(
                '/services/data/' + API_VER + '/tooling/query/?q=' + EncodingUtil.urlEncode(soql, 'UTF-8'),
                sessionId
            );
            if (listRes.getStatusCode() < 200 || listRes.getStatusCode() >= 300) {
                return fail('Failed to fetch StreamingAppDataConnectors (HTTP ' + listRes.getStatusCode() + '): ' + listRes.getBody().abbreviate(300));
            }

            Map<String, Object> listBody = parseJson(listRes);
            List<Object> records = (List<Object>) listBody.get('records');
            if (records == null) records = new List<Object>();

            List<Map<String, Object>> apps     = new List<Map<String, Object>>();
            List<Map<String, Object>> sitemaps = new List<Map<String, Object>>();

            // Step 2: fetch full detail for each record to get Metadata.connectorParameters
            for (Object r : records) {
                Map<String, Object> rec = (Map<String, Object>) r;
                String recordId  = String.valueOf(rec.get('Id'));
                String devName   = String.valueOf(rec.get('DeveloperName'));
                String label     = String.valueOf(rec.get('MasterLabel'));

                try {
                    HttpResponse detailRes = doGet(
                        '/services/data/' + API_VER + '/tooling/sobjects/StreamingAppDataConnector/' + recordId,
                        sessionId
                    );
                    if (detailRes.getStatusCode() < 200 || detailRes.getStatusCode() >= 300) continue;

                    Map<String, Object> detail = parseJson(detailRes);
                    String appIdentifier = detail.containsKey('AppIdentifier') && detail.get('AppIdentifier') != null
                        ? String.valueOf(detail.get('AppIdentifier')) : recordId;

                    // Parse Metadata to confirm it is a valid connector with a sitemap param
                    Map<String, Object> metadata = detail.containsKey('Metadata') && detail.get('Metadata') != null
                        ? (Map<String, Object>) detail.get('Metadata') : null;
                    Boolean hasSitemap = false;
                    if (metadata != null && metadata.containsKey('connectorParameters')) {
                        List<Object> params = (List<Object>) metadata.get('connectorParameters');
                        if (params != null) {
                            for (Object p : params) {
                                Map<String, Object> param = (Map<String, Object>) p;
                                if ('sitemap'.equals(String.valueOf(param.get('paramName')))) {
                                    hasSitemap = true;
                                    break;
                                }
                            }
                        }
                    }

                    apps.add(new Map<String, Object>{
                        'id'         => appIdentifier,
                        'recordId'   => recordId,
                        'name'       => devName,
                        'label'      => label,
                        'hasSitemap' => hasSitemap
                    });

                    if (hasSitemap) {
                        sitemaps.add(new Map<String, Object>{
                            'id'      => recordId,
                            'name'    => devName,
                            'label'   => label,
                            'appId'   => appIdentifier,
                            'appName' => label
                        });
                    }
                } catch (Exception ignored) { }
            }

            // Public Asset File (ContentAsset) URL for the SDK bundle, built here where
            // both the org domain and org id are available. The LWC injects this into
            // the sitemap script so it loads unauthenticated on the customer's website.
            String orgId  = UserInfo.getOrganizationId().substring(0, 15);
            String bootstrapUrl = baseUrl() + '/file-asset/adaptive_web_bootstrap?oid=' + orgId;

            return ok(new Map<String, Object>{ 'apps' => apps, 'sitemaps' => sitemaps, 'bootstrapUrl' => bootstrapUrl });

        } catch (Exception e) {
            return fail('Failed to fetch sitemaps: ' + e.getMessage());
        }
    }

    /**
     * Adds a sitemap connectorParameter to an existing StreamingAppDataConnector.
     * If a sitemap param already exists, returns success immediately without changes.
     *
     * Sends ONLY the new sitemap param — the Tooling API PATCH adds child records,
     * so re-sending existing params would cause DUPLICATE_VALUE errors.
     */
    @AuraEnabled
    public static Map<String, Object> updateSitemap(String recordId, String sitemapContent, String sessionId) {
        try {
            if (String.isBlank(recordId)) return fail('recordId is required.');
            if (sitemapContent == null)   return fail('sitemapContent is required.');

            HttpResponse getRes = doGet(
                '/services/data/' + API_VER + '/tooling/sobjects/StreamingAppDataConnector/' + recordId,
                sessionId
            );
            if (getRes.getStatusCode() < 200 || getRes.getStatusCode() >= 300) {
                return fail('Failed to fetch StreamingAppDataConnector (HTTP ' + getRes.getStatusCode() + '): ' + getRes.getBody().abbreviate(300));
            }

            Map<String, Object> existing = parseJson(getRes);
            Map<String, Object> metadata = existing.containsKey('Metadata') && existing.get('Metadata') != null
                ? (Map<String, Object>) existing.get('Metadata')
                : new Map<String, Object>();

            List<Object> existingParams = metadata.containsKey('connectorParameters') && metadata.get('connectorParameters') != null
                ? (List<Object>) metadata.get('connectorParameters')
                : new List<Object>();

            for (Object p : existingParams) {
                Map<String, Object> param = (Map<String, Object>) p;
                if ('sitemap'.equals(String.valueOf(param.get('paramName')))) {
                    String existingValue = param.get('paramValue') != null ? String.valueOf(param.get('paramValue')) : '';
                    if (!String.isBlank(existingValue) && existingValue != '""' && existingValue != '\'\'') {
                        return ok(new Map<String, Object>{ 'id' => recordId });
                    }
                }
            }

            List<Object> newParams = new List<Object>{
                new Map<String, Object>{ 'paramName' => 'sitemap', 'paramValue' => sitemapContent }
            };

            Map<String, Object> minimalMetadata = new Map<String, Object>();
            for (String field : new String[]{ 'masterLabel', 'dataConnectorType', 'appIdentifier', 'streamingAppDataConnectorType' }) {
                if (metadata.containsKey(field)) {
                    minimalMetadata.put(field, metadata.get(field));
                }
            }
            minimalMetadata.put('connectorParameters', newParams);

            Map<String, Object> patchBody = new Map<String, Object>{ 'Metadata' => minimalMetadata };

            HttpResponse res = doPatch(
                '/services/data/' + API_VER + '/tooling/sobjects/StreamingAppDataConnector/' + recordId,
                JSON.serialize(patchBody),
                sessionId
            );

            if (res.getStatusCode() == 204 || (res.getStatusCode() >= 200 && res.getStatusCode() < 300)) {
                return ok(new Map<String, Object>{ 'id' => recordId });
            }

            return fail('Failed to update sitemap (HTTP ' + res.getStatusCode() + '): ' + res.getBody().abbreviate(300));

        } catch (Exception e) {
            return fail('Failed to update sitemap: ' + e.getMessage());
        }
    }

    // ── Deployments ───────────────────────────────────────────────────────────

    @AuraEnabled
    public static Map<String, Object> getDeployments(String sessionId) {
        try {
            String soql = 'SELECT Id, DeveloperName, MasterLabel, SiteId, NamespacePrefix FROM EmbeddedServiceConfig WHERE IsDeleted = false';
            HttpResponse res = doGet('/services/data/' + API_VER + '/tooling/query?q=' + EncodingUtil.urlEncode(soql, 'UTF-8'), sessionId);

            if (res.getStatusCode() < 200 || res.getStatusCode() >= 300) {
                return fail('Failed to fetch deployments (HTTP ' + res.getStatusCode() + '): ' + res.getBody().abbreviate(300));
            }

            Map<String, Object> body    = parseJson(res);
            List<Object> records        = (List<Object>) body.get('records');
            if (records == null) records = new List<Object>();

            // Fetch org ID once for the whole list
            String orgId = null;
            try {
                HttpResponse orgRes = doGet(
                    '/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode('SELECT Id FROM Organization', 'UTF-8'),
                    sessionId
                );
                if (orgRes.getStatusCode() == 200) {
                    Map<String, Object> orgBody = parseJson(orgRes);
                    List<Object> orgRecs = (List<Object>) orgBody.get('records');
                    if (orgRecs != null && !orgRecs.isEmpty()) {
                        orgId = String.valueOf(((Map<String, Object>) orgRecs[0]).get('Id')).substring(0, 15);
                    }
                }
            } catch (Exception ignored) { }
            if (String.isBlank(orgId)) {
                orgId = UserInfo.getOrganizationId().substring(0, 15);
            }

            List<Map<String, Object>> deployments = new List<Map<String, Object>>();
            for (Object r : records) {
                Map<String, Object> rec  = (Map<String, Object>) r;
                String ns       = rec.containsKey('NamespacePrefix') && rec.get('NamespacePrefix') != null
                                  ? String.valueOf(rec.get('NamespacePrefix')) : '';
                String devName  = String.valueOf(rec.get('DeveloperName'));
                String fullName = String.isBlank(ns) ? devName : ns + '__' + devName;
                String siteId   = rec.containsKey('SiteId') && rec.get('SiteId') != null ? String.valueOf(rec.get('SiteId')) : null;
                String siteUrl  = null;

                // Resolve site secure URL via EmbeddedServiceConfig.SiteId → Site.SecureURL
                if (!String.isBlank(siteId)) {
                    try {
                        String siteSoql = 'SELECT SecureURL FROM Site WHERE Id = \'' + siteId + '\'';
                        HttpResponse siteRes = doGet('/services/data/' + API_VER + '/tooling/query?q=' + EncodingUtil.urlEncode(siteSoql, 'UTF-8'), sessionId);
                        if (siteRes.getStatusCode() == 200) {
                            Map<String, Object> siteBody = parseJson(siteRes);
                            List<Object> siteRecs = (List<Object>) siteBody.get('records');
                            if (siteRecs != null && !siteRecs.isEmpty()) {
                                siteUrl = String.valueOf(((Map<String,Object>) siteRecs[0]).get('SecureURL'));
                            }
                        }
                    } catch (Exception ignored) { }
                }

                deployments.add(new Map<String, Object>{
                    'id'            => String.valueOf(rec.get('Id')),
                    'developerName' => devName,
                    'label'         => String.valueOf(rec.get('MasterLabel')),
                    'siteId'        => siteId,
                    'siteUrl'       => siteUrl,
                    'scrt2URL'      => baseUrl().replace('.my.salesforce.com', '.my.salesforce-scrt.com'),
                    'orgId'         => orgId,
                    'fullName'      => fullName
                });
            }

            return ok(new Map<String, Object>{ 'deployments' => deployments });

        } catch (Exception e) {
            return fail('Failed to fetch deployments: ' + e.getMessage());
        }
    }

    // ── Deploy ────────────────────────────────────────────────────────────────

    /**
     * Runs the 5-step Adaptive Web setup pipeline synchronously.
     * Returns all step statuses and the final created resources in one response.
     *
     * Steps:
     *   1. fetch_config       — Fetch org ID (Organization API) + EmbeddedServiceConfig developer name (Tooling API)
     *   2. build_transformer  — Build transformer body from hardcoded template with dynamic value injection
     *   3. create_transformer — POST transformer to Connect API
     *   4. create_pec         — POST PEC to Connect API using the web connector ID
     *   5. publish_deployment — PATCH IsEnabled=true on EmbeddedServiceConfig to publish deployment
     */
    @AuraEnabled
    public static Map<String, Object> runDeploy(String deploymentDevName, String appSourceId, String sessionId) {
        if (String.isBlank(deploymentDevName) || String.isBlank(appSourceId)) {
            return fail('deploymentDevName and appSourceId are required.');
        }

        List<Map<String, Object>> steps = new List<Map<String, Object>>{
            new Map<String, Object>{ 'name' => 'fetch_config',        'status' => 'pending' },
            new Map<String, Object>{ 'name' => 'build_transformer',   'status' => 'pending' },
            new Map<String, Object>{ 'name' => 'create_transformer',  'status' => 'pending' },
            new Map<String, Object>{ 'name' => 'create_pec',          'status' => 'pending' },
            new Map<String, Object>{ 'name' => 'publish_deployment',  'status' => 'pending' }
        };

        // ── Step 1: Fetch org ID and EmbeddedServiceConfig developer name ─────
        steps[0].put('status', 'running');
        String escFullName;
        String escId;
        String orgId;

        try {
            HttpResponse orgRes = doGet(
                '/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode('SELECT Id FROM Organization', 'UTF-8'),
                sessionId
            );
            if (orgRes.getStatusCode() == 200) {
                Map<String, Object> orgBody = parseJson(orgRes);
                List<Object> orgRecs = (List<Object>) orgBody.get('records');
                if (orgRecs != null && !orgRecs.isEmpty()) {
                    orgId = String.valueOf(((Map<String, Object>) orgRecs[0]).get('Id')).substring(0, 15);
                }
            }
            if (String.isBlank(orgId)) {
                orgId = UserInfo.getOrganizationId().substring(0, 15);
            }

            String soql = 'SELECT Id, DeveloperName, NamespacePrefix FROM EmbeddedServiceConfig WHERE DeveloperName = \''
                + String.escapeSingleQuotes(deploymentDevName) + '\' AND IsDeleted = false';
            HttpResponse escRes = doGet('/services/data/' + API_VER + '/tooling/query?q=' + EncodingUtil.urlEncode(soql, 'UTF-8'), sessionId);

            if (escRes.getStatusCode() < 200 || escRes.getStatusCode() >= 300) {
                return failStep(steps, 0, 'Tooling API error (HTTP ' + escRes.getStatusCode() + ')');
            }

            Map<String, Object> escBody = parseJson(escRes);
            List<Object> escRecs = (List<Object>) escBody.get('records');
            if (escRecs == null || escRecs.isEmpty()) {
                return failStep(steps, 0, 'EmbeddedServiceConfig "' + deploymentDevName + '" not found.');
            }

            Map<String, Object> rec = (Map<String, Object>) escRecs[0];
            escId          = String.valueOf(rec.get('Id'));
            String ns      = rec.containsKey('NamespacePrefix') && rec.get('NamespacePrefix') != null
                             ? String.valueOf(rec.get('NamespacePrefix')) : '';
            String devName = String.valueOf(rec.get('DeveloperName'));
            escFullName    = String.isBlank(ns) ? devName : ns + '__' + devName;

            steps[0].put('status', 'completed');
        } catch (Exception e) {
            return failStep(steps, 0, e.getMessage());
        }

        // ── Step 2: Build transformer body from hardcoded template ────────────
        steps[1].put('status', 'running');
        Map<String, Object> transformerInput;
        String orgTransformerName;

        try {
            transformerInput  = buildTransformerBody(orgId, escFullName, appSourceId);
            orgTransformerName = (String) transformerInput.get('name');
            steps[1].put('status', 'completed');
        } catch (Exception e) {
            return failStep(steps, 1, e.getMessage());
        }

        // ── Step 3: POST org-level transformer to Connect API ─────────────────
        steps[2].put('status', 'running');
        String transformerId = null;

        try {
            HttpResponse createTrRes = doPost(
                '/services/data/' + API_VER + '/personalization/external-apps/transformers',
                JSON.serialize(transformerInput),
                sessionId
            );

            Integer sc = createTrRes.getStatusCode();
            if (sc >= 200 && sc < 300) {
                steps[2].put('status', 'completed');
                Map<String, Object> trBody = parseJson(createTrRes);
                if (trBody != null && trBody.containsKey('id')) {
                    transformerId = String.valueOf(trBody.get('id'));
                }
            } else {
                String responseBody = createTrRes.getBody().toLowerCase();
                if (sc == 409 || responseBody.contains('already exists') || responseBody.contains('duplicate')) {
                    steps[2].put('status', 'completed');
                } else {
                    return failStep(steps, 2, 'Failed to create transformer (HTTP ' + sc + '): ' + createTrRes.getBody().abbreviate(300));
                }
            }
        } catch (Exception e) {
            return failStep(steps, 2, e.getMessage());
        }

        // ── Step 4: POST PEC to Connect API ───────────────────────────────────
        steps[3].put('status', 'running');
        String pecName = 'AdaptiveWebAgent_' + String.valueOf(System.currentTimeMillis());

        try {
            Map<String, Object> pecInput = new Map<String, Object>{
                'name'    => pecName,
                'label'   => 'AdaptiveWebAgent',
                'sourceMatchers' => new List<Object>{
                    new Map<String, Object>{ 'type' => 'PageUrlMatcher', 'value' => '*:*' }
                },
                'transformationConfig' => new Map<String, Object>{
                    'renderIfEmpty'        => false,
                    'when'                 => 'Immediately',
                    'engagementDestination'=> 'Other',
                    'transformations'      => new List<Object>{
                        new Map<String, Object>{ 'transformerName' => orgTransformerName }
                    }
                },
                'isEnabled' => true
            };

            HttpResponse pecRes = doPost(
                '/services/data/' + API_VER + '/personalization/external-apps/' + appSourceId + '/personalization-experience-configs',
                JSON.serialize(pecInput),
                sessionId
            );

            Integer pecSc = pecRes.getStatusCode();
            if (pecSc >= 200 && pecSc < 300) {
                steps[3].put('status', 'completed');
            } else {
                String pecBody = pecRes.getBody().toLowerCase();
                if (pecSc == 409 || pecBody.contains('already exists') || pecBody.contains('duplicate')) {
                    steps[3].put('status', 'completed');
                } else {
                    return failStep(steps, 3, 'Failed to create PEC (HTTP ' + pecSc + '): ' + pecRes.getBody().abbreviate(300));
                }
            }
        } catch (Exception e) {
            return failStep(steps, 3, e.getMessage());
        }

        // ── Step 5: Publish EmbeddedServiceConfig deployment ──────────────────
        steps[4].put('status', 'running');
        try {
            // First, GET the existing record to retrieve current metadata including deploymentFeature
            String getPath = '/services/data/' + API_VER + '/tooling/sobjects/EmbeddedServiceConfig/' + escId;
            HttpResponse getRes = doGet(getPath, sessionId);

            if (getRes.getStatusCode() >= 200 && getRes.getStatusCode() < 300) {
                Map<String, Object> existingRecord = parseJson(getRes);
                Map<String, Object> existingMetadata = existingRecord.containsKey('Metadata') && existingRecord.get('Metadata') != null
                    ? (Map<String, Object>) existingRecord.get('Metadata')
                    : new Map<String, Object>();

                // Check if already enabled
                Boolean currentlyEnabled = existingMetadata.containsKey('isEnabled') && existingMetadata.get('isEnabled') != null
                    ? (Boolean) existingMetadata.get('isEnabled')
                    : false;

                if (currentlyEnabled) {
                    // Already published, mark complete
                    steps[4].put('status', 'completed');
                    steps[4].put('message', 'Deployment already published');
                } else {
                    // Update isEnabled while preserving other fields (especially deploymentFeature)
                    existingMetadata.put('isEnabled', true);

                    Map<String, Object> publishInput = new Map<String, Object>{
                        'Metadata' => existingMetadata
                    };

                    HttpResponse publishRes = doPatch(
                        getPath,
                        JSON.serialize(publishInput),
                        sessionId
                    );

                    Integer publishSc = publishRes.getStatusCode();
                    if (publishSc >= 200 && publishSc < 300) {
                        // Best-effort verification: check if deployment is enabled
                        // Trust the PATCH 200 response even if verification shows disabled
                        // (may be propagation delay, not actual failure)
                        HttpResponse verifyRes = doGet(getPath, sessionId);
                        if (verifyRes.getStatusCode() >= 200 && verifyRes.getStatusCode() < 300) {
                            Map<String, Object> verifiedRecord = parseJson(verifyRes);
                            Map<String, Object> verifiedMetadata = verifiedRecord.containsKey('Metadata') && verifiedRecord.get('Metadata') != null
                                ? (Map<String, Object>) verifiedRecord.get('Metadata')
                                : new Map<String, Object>();

                            Boolean nowEnabled = verifiedMetadata.containsKey('isEnabled') && verifiedMetadata.get('isEnabled') != null
                                ? (Boolean) verifiedMetadata.get('isEnabled')
                                : false;

                            if (nowEnabled) {
                                steps[4].put('status', 'completed');
                                steps[4].put('message', 'Successfully published deployment');
                            } else {
                                // PATCH succeeded but GET shows disabled - likely propagation delay
                                steps[4].put('status', 'completed');
                                steps[4].put('message', 'Published successfully. Deployment may take a moment to become fully enabled.');
                            }
                        } else {
                            // Verification GET failed - trust the PATCH response
                            steps[4].put('status', 'completed');
                            steps[4].put('message', 'Published (verification skipped)');
                        }
                    } else {
                        return failStep(steps, 4, 'Failed to publish deployment (HTTP ' + publishSc + '): ' + publishRes.getBody().abbreviate(300));
                    }
                }
            } else {
                return failStep(steps, 4, 'Failed to fetch deployment for publishing (HTTP ' + getRes.getStatusCode() + '): ' + getRes.getBody().abbreviate(300));
            }
        } catch (Exception e) {
            return failStep(steps, 4, 'Failed to publish deployment: ' + e.getMessage());
        }

        // ── All done ──────────────────────────────────────────────────────────
        Map<String, Object> result = new Map<String, Object>{
            'transformerName' => orgTransformerName,
            'transformerId'   => transformerId,
            'pecName'         => pecName,
            'createdAt'       => String.valueOf(System.now())
        };

        return ok(new Map<String, Object>{
            'steps'  => steps,
            'result' => result
        });
    }

    /**
     * Builds the transformer request body from the hardcoded Adaptive Web template,
     * injecting the dynamic org ID, deployment developer name, and web connector ID.
     */
    private static Map<String, Object> buildTransformerBody(String orgId, String deploymentDeveloperName, String webConnectorId) {
        Integer suffix = Math.mod(Math.abs(Crypto.getRandomInteger()), 9000) + 1000;
        String transformerName = 'default_AdaptiveWebDemoTransformer_' + suffix;

        String orgDomain = baseUrl();
        // Asset File (ContentAsset) hosted publicly for external websites. Unlike a
        // StaticResource (which 302-redirects to login off-org), an Asset File marked
        // isVisibleByExternalUsers is reachable unauthenticated at a stable,
        // DeveloperName-keyed URL: https://<my_domain>.my.salesforce.com/file-asset/<name>?oid=<orgId>
        String staticResourceUrl = orgDomain
            + '/file-asset/adaptive_web_bootstrap?oid=' + orgId;
        String messagingUrl = orgDomain.replace('salesforce.com', 'salesforce-scrt.com');

        String script =
            'var adaptiveWebScript = document.createElement(\"script\");\n' +
            'adaptiveWebScript.type = \"text/javascript\";\n' +
            'adaptiveWebScript.src = \"' + staticResourceUrl + '\";\n' +
            'adaptiveWebScript.onload = () => {            \n' +
            '  window.addControllerToPage()\n' +
            '  window.addAppToPage(); window.AdaptiveWebsite.initialize({\n' +
            '  organizationId: \'{{ subVar \"organizationId\" }}\',\n' +
            '  messagingUrl: \'{{ subVar \"messagingUrl\" }}\',\n' +
            '  deploymentDeveloperName: \'{{ subVar \"deploymentDeveloperName\" }}\'\n' +
            '})\n' +
            '};\n' +
            'document.head.appendChild(adaptiveWebScript);\n';

        Map<String, Object> substitutionDefinitions = new Map<String, Object>{
            'organizationId' => new Map<String, Object>{
                'label'        => 'organizationId',
                'configType'   => 'Static',
                'defaultValue' => orgId
            },
            'messagingUrl' => new Map<String, Object>{
                'label'        => 'messagingUrl',
                'configType'   => 'Static',
                'defaultValue' => messagingUrl
            },
            'deploymentDeveloperName' => new Map<String, Object>{
                'label'        => 'deploymentDeveloperName',
                'configType'   => 'Static',
                'defaultValue' => deploymentDeveloperName
            }
        };

        List<Object> dataConnectors = new List<Object>{ webConnectorId };

        return new Map<String, Object>{
            'channel'                 => 'WebApp',
            'dataConnectors'          => dataConnectors,
            'dataSpace'               => 'default',
            'description'             => 'Adaptive Web Transformer',
            'isEnabled'               => false,
            'label'                   => 'Adaptive Web Basic',
            'name'                    => transformerName,
            'schemaReference'         => null,
            'substitutionDefinitions' => substitutionDefinitions,
            'transformerType'         => 'AgentScript',
            'transformerTypeDetails'  => new Map<String, Object>{ 'script' => script }
        };
    }

    // ── Agent Creation (REST Metadata Deploy API) ──────────────────────────

    /**
     * Submits a metadata deploy zip (base64-encoded, built in the LWC)
     * via the REST Metadata Deploy API. Returns the deploy ID for polling.
     */
    @AuraEnabled
    public static Map<String, Object> submitAgentDeploy(String zipBase64, String sessionId) {
        if (String.isBlank(zipBase64)) return fail('zipBase64 is required.');
        try {
            String boundary = '----DeployBoundary' + String.valueOf(System.currentTimeMillis());

            String deployOptions = JSON.serialize(new Map<String, Object>{
                'deployOptions' => new Map<String, Object>{
                    'allowMissingFiles' => false,
                    'checkOnly'         => false,
                    'rollbackOnError'   => true,
                    'singlePackage'     => true,
                    'testLevel'         => 'NoTestRun'
                }
            });

            Blob zipBlob = EncodingUtil.base64Decode(zipBase64);

            String bodyStart =
                '--' + boundary + '\r\n' +
                'Content-Disposition: form-data; name="json"\r\n' +
                'Content-Type: application/json\r\n\r\n' +
                deployOptions + '\r\n' +
                '--' + boundary + '\r\n' +
                'Content-Disposition: form-data; name="file"; filename="deploy.zip"\r\n' +
                'Content-Type: application/zip\r\n\r\n';
            String bodyEnd = '\r\n--' + boundary + '--\r\n';

            Blob bodyBlob = combineBlobs(
                Blob.valueOf(bodyStart),
                zipBlob,
                Blob.valueOf(bodyEnd)
            );

            HttpRequest req = new HttpRequest();
            req.setEndpoint(baseUrl() + '/services/data/' + API_VER + '/metadata/deployRequest');
            req.setMethod('POST');
            req.setHeader('Authorization', 'Bearer ' + sessionId);
            req.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            req.setTimeout(TIMEOUT);
            req.setBodyAsBlob(bodyBlob);

            HttpResponse res = new Http().send(req);
            if (res.getStatusCode() >= 200 && res.getStatusCode() < 300) {
                Map<String, Object> body = parseJson(res);
                return ok(new Map<String, Object>{ 'deployId' => body.get('id') });
            }
            return fail('Deploy submit failed (HTTP ' + res.getStatusCode() + '): ' + res.getBody().abbreviate(500));
        } catch (Exception e) {
            return fail('Deploy submit error: ' + e.getMessage());
        }
    }

    /**
     * Polls the Metadata Deploy status endpoint with enhanced error details.
     */
    @AuraEnabled
    public static Map<String, Object> checkAgentDeploy(String deployId, String sessionId) {
        if (String.isBlank(deployId)) return fail('deployId is required.');
        try {
            HttpResponse res = doGet(
                '/services/data/' + API_VER + '/metadata/deployRequest/' + deployId + '?includeDetails=true',
                sessionId
            );
            if (res.getStatusCode() >= 200 && res.getStatusCode() < 300) {
                Map<String, Object> body = parseJson(res);

                // Enhanced logging for debugging deployment issues
                Map<String, Object> deployResult = (Map<String, Object>) body.get('deployResult');
                if (deployResult != null) {
                    String status = String.valueOf(deployResult.get('status'));
                    System.debug('Deploy Status: ' + status + ' (ID: ' + deployId + ')');

                    // Log detailed failure info if deploy failed
                    if (status == 'Failed' || status == 'Canceled') {
                        System.debug('Deploy Error Message: ' + deployResult.get('errorMessage'));

                        Object detailsObj = deployResult.get('details');
                        if (detailsObj != null) {
                            Map<String, Object> details = (Map<String, Object>) detailsObj;

                            // Log component failures
                            Object failuresObj = details.get('componentFailures');
                            if (failuresObj != null) {
                                List<Object> failures = failuresObj instanceof List<Object>
                                    ? (List<Object>) failuresObj
                                    : new List<Object>{ failuresObj };

                                System.debug('Component Failures Count: ' + failures.size());
                                for (Integer i = 0; i < failures.size(); i++) {
                                    Map<String, Object> failure = (Map<String, Object>) failures[i];
                                    System.debug('  Failure ' + (i + 1) + ':');
                                    System.debug('    Component: ' + failure.get('fullName'));
                                    System.debug('    Type: ' + failure.get('componentType'));
                                    System.debug('    Problem: ' + failure.get('problem'));
                                    System.debug('    Line: ' + failure.get('lineNumber'));
                                    System.debug('    Column: ' + failure.get('columnNumber'));
                                }
                            }

                            // Log run test failures if any
                            Object runTestResultObj = details.get('runTestResult');
                            if (runTestResultObj != null) {
                                Map<String, Object> runTestResult = (Map<String, Object>) runTestResultObj;
                                System.debug('Test Failures: ' + runTestResult.get('numFailures'));
                                System.debug('Test Errors: ' + runTestResult.get('numTestErrors'));
                            }
                        }
                    }
                }

                return ok(body);
            }

            String errorBody = res.getBody();
            System.debug('Deploy check HTTP error: ' + res.getStatusCode() + ' - ' + errorBody);
            return fail('Deploy status check failed (HTTP ' + res.getStatusCode() + '): ' + errorBody.abbreviate(500));

        } catch (Exception e) {
            System.debug('Deploy check exception: ' + e.getMessage());
            System.debug('Stack trace: ' + e.getStackTraceString());
            return fail('Deploy status error: ' + e.getMessage());
        }
    }

    /**
     * Creates a bot user (Einstein Agent User profile) for a service agent.
     * Returns the username wired into the agent as config.default_agent_user in the
     * authoring-bundle YAML (the bot user is bound at publish time, not via Bot metadata).
     *
     * Uses a single shared bot user per org. If the user already exists and is
     * active, it is reused. Otherwise a new one is created and permissions are
     * assigned. This avoids LICENSE_LIMIT_EXCEEDED errors in trial orgs.
     */
    @AuraEnabled
    public static Map<String, Object> createBotUser(String agentDeveloperName, String sessionId) {
        if (String.isBlank(agentDeveloperName)) return fail('agentDeveloperName is required.');
        try {
            String orgId = UserInfo.getOrganizationId().substring(0, 15).toLowerCase();
            String username = 'adaptive.web.user@' + orgId + '.ext';
            String alias = 'awuser';

            // The Einstein Agent User profile is needed on both the reuse and
            // create-new paths (reuse still needs it to (re)assign perm sets).
            String profSoql = 'SELECT Id FROM Profile WHERE Name = \'Einstein Agent User\'';
            HttpResponse profRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(profSoql, 'UTF-8'), sessionId);
            String profileId = null;
            if (profRes.getStatusCode() == 200) {
                List<Object> profRecs = (List<Object>) parseJson(profRes).get('records');
                if (profRecs != null && !profRecs.isEmpty()) {
                    profileId = String.valueOf(((Map<String, Object>) profRecs[0]).get('Id'));
                }
            }
            if (String.isBlank(profileId)) {
                return fail('Einstein Agent User profile not found. Ensure the DigitalAgent user license is provisioned.');
            }

            // Check if the shared bot user already exists.
            String existingSoql = 'SELECT Id, IsActive FROM User WHERE Username = \'' + String.escapeSingleQuotes(username) + '\' LIMIT 1';
            HttpResponse existingRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(existingSoql, 'UTF-8'), sessionId);
            if (existingRes.getStatusCode() == 200) {
                List<Object> existingRecs = (List<Object>) parseJson(existingRes).get('records');
                if (existingRecs != null && !existingRecs.isEmpty()) {
                    Map<String, Object> existingUser = (Map<String, Object>) existingRecs[0];
                    String existingId = String.valueOf(existingUser.get('Id'));
                    Boolean isActive = Boolean.valueOf(existingUser.get('IsActive'));
                    if (!isActive) {
                        doPatch('/services/data/' + API_VER + '/sobjects/User/' + existingId,
                                JSON.serialize(new Map<String, Object>{ 'IsActive' => true }),
                                sessionId);
                    }

                    // Reused bot users skipped perm-set assignment entirely, which
                    // is the real cause of "User doesn't have access to agent" on
                    // re-runs. Assign here too — the helper is idempotent.
                    List<String> reuseFailures = assignBotUserPermissions(existingId, profileId, sessionId);
                    if (!reuseFailures.isEmpty()) {
                        return fail('Bot user reused (' + username + ') but permission set assignment failed: ' + String.join(reuseFailures, '; '));
                    }

                    return ok(new Map<String, Object>{ 'userId' => existingId, 'username' => username });
                }
            }

            // Bot user does not exist yet — create it.
            String userBody = JSON.serialize(new Map<String, Object>{
                'FirstName'          => 'Adaptive Web',
                'LastName'           => 'User',
                'Email'              => 'noreply@salesforce.com',
                'Username'           => username,
                'Alias'              => alias,
                'ProfileId'          => profileId,
                'TimeZoneSidKey'     => 'America/Los_Angeles',
                'LocaleSidKey'       => 'en_US',
                'EmailEncodingKey'   => 'UTF-8',
                'LanguageLocaleKey'  => 'en_US'
            });
            HttpResponse userRes = doPost('/services/data/' + API_VER + '/sobjects/User', userBody, sessionId);
            Integer userSc = userRes.getStatusCode();
            if (userSc < 200 || userSc >= 300) {
                return fail('Failed to create bot user (HTTP ' + userSc + '): ' + userRes.getBody().abbreviate(300));
            }
            String userId = String.valueOf(parseJson(userRes).get('id'));

            List<String> psaFailures = assignBotUserPermissions(userId, profileId, sessionId);
            if (!psaFailures.isEmpty()) {
                return fail('Bot user created (' + username + ') but permission set assignment failed: ' + String.join(psaFailures, '; '));
            }

            return ok(new Map<String, Object>{ 'userId' => userId, 'username' => username });
        } catch (Exception e) {
            return fail('Failed to create bot user: ' + e.getMessage());
        }
    }

    /**
     * Assigns the permission sets a bot user needs (Agentforce/Copilot fallback,
     * custom Apex access, profile-level Apex access). Idempotent — treats
     * DUPLICATE_VALUE (already assigned) as success — so it's safe to call on
     * both newly-created and reused bot users. Returns a list of failure
     * strings; empty means everything succeeded.
     */
    private static List<String> assignBotUserPermissions(String userId, String profileId, String sessionId) {
        // Assign required permission sets with fallback to legacy naming.
        // Newer orgs: AgentforceServiceAgent* | Older orgs: CopilotSalesforce*
        List<String> psaFailures = new List<String>();
        Map<String, List<String>> psNameMapping = new Map<String, List<String>>{
            'base' => new List<String>{ 'AgentforceServiceAgentSecureBase', 'CopilotSalesforceUser' },
            'user' => new List<String>{ 'AgentforceServiceAgentUserPsg', 'CopilotSalesforceUserPSG' }
        };

        for (String psKey : psNameMapping.keySet()) {
            List<String> psNamesToTry = psNameMapping.get(psKey);
            Boolean assigned = false;
            String lastError = '';

            for (String psName : psNamesToTry) {
                String psSoql = 'SELECT Id FROM PermissionSet WHERE Name = \'' + psName + '\'';
                HttpResponse psRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(psSoql, 'UTF-8'), sessionId);
                if (psRes.getStatusCode() != 200) {
                    lastError = psName + ' (lookup HTTP ' + psRes.getStatusCode() + ')';
                    continue;
                }
                List<Object> psRecs = (List<Object>) parseJson(psRes).get('records');
                if (psRecs == null || psRecs.isEmpty()) {
                    lastError = psName + ' (not found in org)';
                    continue;
                }

                // Found the permission set, try to assign it
                String psId = String.valueOf(((Map<String, Object>) psRecs[0]).get('Id'));
                String psaBody = JSON.serialize(new Map<String, Object>{
                    'AssigneeId'      => userId,
                    'PermissionSetId' => psId
                });
                HttpResponse psaRes = doPost('/services/data/' + API_VER + '/sobjects/PermissionSetAssignment', psaBody, sessionId);
                Integer psaSc = psaRes.getStatusCode();
                if ((psaSc >= 200 && psaSc < 300) || psaRes.getBody().contains('DUPLICATE_VALUE')) {
                    assigned = true; // Success, or already assigned from a prior run
                    break; // Success - stop trying alternatives
                } else {
                    lastError = psName + ' (HTTP ' + psaSc + '): ' + psaRes.getBody().abbreviate(200);
                }
            }

            if (!assigned) {
                psaFailures.add(psKey + ' permission set: tried ' + String.join(psNamesToTry, ', ') + ' - ' + lastError);
            }
        }

        if (!psaFailures.isEmpty()) return psaFailures;

        // Ensure custom Apex class access permission set exists and assign to bot user.
        String apexPsId = ensureApexAccessPermissionSet(sessionId);
        if (apexPsId != null) {
            String apexPsaBody = JSON.serialize(new Map<String, Object>{
                'AssigneeId'      => userId,
                'PermissionSetId' => apexPsId
            });
            HttpResponse apexPsaRes = doPost('/services/data/' + API_VER + '/sobjects/PermissionSetAssignment', apexPsaBody, sessionId);
            Integer apexPsaSc = apexPsaRes.getStatusCode();
            Boolean apexPsaOk = (apexPsaSc >= 200 && apexPsaSc < 300) || apexPsaRes.getBody().contains('DUPLICATE_VALUE');
            if (!apexPsaOk) {
                psaFailures.add('Apex access permission set assignment failed (HTTP ' + apexPsaSc + '): ' + apexPsaRes.getBody().abbreviate(300));
                return psaFailures;
            }
        } else {
            psaFailures.add('Failed to create/find Apex access permission set.');
            return psaFailures;
        }

        // Grant Apex class access at the Profile level (Einstein Agent User profile).
        grantApexAccessToProfile(profileId, sessionId);

        return psaFailures;
    }

    /**
     * Activates an Agentforce Service Agent via the Connect API.
     * The bot user is bound via config.default_agent_user in the published authoring bundle.
     */
    @AuraEnabled
    public static Map<String, Object> activateAgent(String agentDeveloperName, String sessionId) {
        if (String.isBlank(agentDeveloperName)) return fail('agentDeveloperName is required.');
        try {
            String vSoql = 'SELECT Id FROM BotVersion WHERE BotDefinition.DeveloperName = \'' +
                String.escapeSingleQuotes(agentDeveloperName) + '\' ORDER BY CreatedDate DESC LIMIT 1';
            HttpResponse vRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(vSoql, 'UTF-8'), sessionId);
            if (vRes.getStatusCode() != 200) {
                return fail('Failed to query BotVersion (HTTP ' + vRes.getStatusCode() + ')');
            }
            List<Object> vRecs = (List<Object>) parseJson(vRes).get('records');
            if (vRecs == null || vRecs.isEmpty()) {
                return fail('No BotVersion found for agent "' + agentDeveloperName + '".');
            }
            String botVersionId = String.valueOf(((Map<String, Object>) vRecs[0]).get('Id'));

            String actBody = JSON.serialize(new Map<String, Object>{ 'status' => 'Active' });
            HttpResponse actRes = doPost(
                '/services/data/' + API_VER + '/connect/bot-versions/' + botVersionId + '/activation',
                actBody,
                sessionId
            );
            Integer actSc = actRes.getStatusCode();
            if (actSc >= 200 && actSc < 300) {
                Map<String, Object> actResult = parseJson(actRes);
                Boolean isActivated = actResult.get('isActivated') == true;
                if (!isActivated) {
                    String msgs = actResult.containsKey('messages') ? JSON.serialize(actResult.get('messages')) : 'Unknown reason';
                    return fail('Activation failed: ' + msgs);
                }
                return ok(new Map<String, Object>{ 'botVersionId' => botVersionId, 'activated' => true });
            }
            return fail('Failed to activate agent (HTTP ' + actSc + '): ' + actRes.getBody().abbreviate(300));
        } catch (Exception e) {
            return fail('Failed to activate agent: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String, Object> assignAgentPermissions(String agentDeveloperName, String botUserId, String sessionId) {
        if (String.isBlank(agentDeveloperName) || String.isBlank(botUserId)) {
            return fail('agentDeveloperName and botUserId are required.');
        }
        try {
            List<String> assigned = new List<String>();
            List<String> failures = new List<String>();

            // Look for auto-generated NextGen permission set and assign if found.
            String nextGenSoql = 'SELECT Id, Name FROM PermissionSet WHERE ' +
                'Name LIKE \'NextGen%25_Permissions\' AND Label LIKE \'%25' +
                String.escapeSingleQuotes(agentDeveloperName) + '%25\'';
            HttpResponse nextGenRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(nextGenSoql, 'UTF-8'), sessionId);
            if (nextGenRes.getStatusCode() == 200) {
                List<Object> nextGenRecs = (List<Object>) parseJson(nextGenRes).get('records');
                if (nextGenRecs != null) {
                    for (Object rec : nextGenRecs) {
                        String psId = String.valueOf(((Map<String, Object>) rec).get('Id'));
                        String psName = String.valueOf(((Map<String, Object>) rec).get('Name'));
                        String psaBody = JSON.serialize(new Map<String, Object>{
                            'AssigneeId'      => botUserId,
                            'PermissionSetId' => psId
                        });
                        HttpResponse psaRes = doPost('/services/data/' + API_VER + '/sobjects/PermissionSetAssignment', psaBody, sessionId);
                        Integer sc = psaRes.getStatusCode();
                        if (sc >= 200 && sc < 300) {
                            assigned.add(psName);
                        } else {
                            String body = psaRes.getBody().abbreviate(200);
                            if (!body.contains('DUPLICATE_VALUE')) {
                                failures.add(psName + ' (HTTP ' + sc + '): ' + body);
                            }
                        }
                    }
                }
            }

            // Create and assign an agent-name-based permission set (mirrors what the
            // Agentforce Studio UI does). The runtime may gate action execution on this.
            String agentPsName = agentDeveloperName + '_Permissions';
            if (agentPsName.length() > 80) {
                agentPsName = agentPsName.substring(0, 80);
            }
            String agentPsSoql = 'SELECT Id FROM PermissionSet WHERE Name = \'' + String.escapeSingleQuotes(agentPsName) + '\'';
            HttpResponse agentPsRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(agentPsSoql, 'UTF-8'), sessionId);
            String agentPsId = null;
            if (agentPsRes.getStatusCode() == 200) {
                List<Object> agentPsRecs = (List<Object>) parseJson(agentPsRes).get('records');
                if (agentPsRecs != null && !agentPsRecs.isEmpty()) {
                    agentPsId = String.valueOf(((Map<String, Object>) agentPsRecs[0]).get('Id'));
                }
            }
            if (agentPsId == null) {
                String createBody = JSON.serialize(new Map<String, Object>{
                    'Name'        => agentPsName,
                    'Label'       => 'Agentforce Agent ' + agentDeveloperName + ' Permissions',
                    'Description' => 'Runtime permissions for agent ' + agentDeveloperName
                });
                HttpResponse createRes = doPost('/services/data/' + API_VER + '/sobjects/PermissionSet', createBody, sessionId);
                if (createRes.getStatusCode() >= 200 && createRes.getStatusCode() < 300) {
                    agentPsId = String.valueOf(parseJson(createRes).get('id'));
                }
            }
            if (agentPsId != null) {
                String psaBody = JSON.serialize(new Map<String, Object>{
                    'AssigneeId'      => botUserId,
                    'PermissionSetId' => agentPsId
                });
                HttpResponse psaRes = doPost('/services/data/' + API_VER + '/sobjects/PermissionSetAssignment', psaBody, sessionId);
                Integer sc = psaRes.getStatusCode();
                if (sc >= 200 && sc < 300) {
                    assigned.add(agentPsName);
                } else {
                    String body = psaRes.getBody().abbreviate(200);
                    if (!body.contains('DUPLICATE_VALUE')) {
                        failures.add(agentPsName + ' (HTTP ' + sc + '): ' + body);
                    }
                }
            }

            if (!failures.isEmpty()) {
                return fail('Agent permission assignment failed: ' + String.join(failures, '; '));
            }
            return ok(new Map<String, Object>{ 'assigned' => assigned });
        } catch (Exception e) {
            return fail('Failed to assign agent permissions: ' + e.getMessage());
        }
    }

    // ── Compile & Publish Agent (Next Gen Authoring REST via Apex callout) ──
    //
    // WHY an Apex server-side callout to the Next Gen Authoring REST API — and
    // not a browser fetch, the /aura transport, or an in-process loopback:
    //   • /aura is unavailable to a custom LWC: Lightning Web Security blocks
    //     LWC fetch/XHR to /aura, and a c-namespace Aura component is refused
    //     when it binds the PUBLIC AgentAuthoringController. (The old
    //     Aura-via-Apex callout that scraped a CSRF token off awAgentPublisherApp
    //     and POSTed to /aura on the Lightning domain has been removed in favor
    //     of this simpler REST path.)
    //   • Calling the REST family straight from the browser works but is
    //     cross-origin: Enhanced Domains serve Lightning from
    //     *.lightning.force.com and REST from the *.my.salesforce.com My Domain,
    //     so every browser fetch to /services/* is CORS-gated and would force
    //     the admin to hand-add this origin under Setup → CORS. We want zero
    //     manual prerequisites.
    //   • Issuing the SAME REST sequence from Apex (Http.send) drops the browser
    //     origin entirely — no preflight, no allowlist. It targets the My Domain
    //     host, already covered by the Adaptive_Web_Setup_Server remote site.
    //   • It clears the "callout after uncommitted work" guard that killed the
    //     old in-process loopback: this method does NO DML before the callout,
    //     and the far end of the self-callout is a fresh top-level request with
    //     its own transaction, exactly like the stock UI's top-level /aura POST.
    //
    // The nextgen-authoring family reaches the SAME ProjectService.publish()
    // compile path as the stock Agent Builder, with the same permission gating.
    // Present since v64.0 (family min-version 256).
    private static final String NGA_API_VER = 'v64.0';

    @AuraEnabled
    public static Map<String, Object> compileAndPublishAgent(String agentName, String agentYaml, String sessionId) {
        if (String.isBlank(agentName) || String.isBlank(agentYaml)) {
            return fail('agentName and agentYaml are required.');
        }
        if (String.isBlank(sessionId)) {
            return fail('No session token available to compile & publish. Reload the setup page and try again.');
        }
        try {
            String base = '/services/data/' + NGA_API_VER + '/nextgen-authoring';

            // 1. Locate the deployed authoring bundle by its API name.
            HttpResponse bundlesRes = doGet(base + '/bundles', sessionId);
            if (bundlesRes.getStatusCode() < 200 || bundlesRes.getStatusCode() >= 300) {
                return fail('Failed to list authoring bundles (HTTP ' + bundlesRes.getStatusCode() + '): ' + bundlesRes.getBody().abbreviate(300));
            }
            Map<String, Object> bundlesBody = parseJson(bundlesRes);
            List<Object> bundles = bundlesBody.get('bundles') instanceof List<Object>
                ? (List<Object>) bundlesBody.get('bundles')
                : new List<Object>();

            String projectId = null;
            String versionId = null;
            for (Object b : bundles) {
                Map<String, Object> bundle = (Map<String, Object>) b;
                if (agentName.equals(String.valueOf(bundle.get('apiName')))) {
                    projectId = String.valueOf(bundle.get('id'));
                    versionId = bundle.get('latestBundleVersionId') != null
                        ? String.valueOf(bundle.get('latestBundleVersionId'))
                        : projectId;
                    break;
                }
            }
            if (String.isBlank(versionId) || 'null'.equals(versionId)) {
                return fail('Authoring bundle not found for "' + agentName + '" (searched ' + bundles.size() + ').');
            }

            // 2. A bundle must be DRAFT to receive a new definition; draft a new
            //    version if the latest one is already published.
            HttpResponse detailRes = doGet(base + '/bundle-versions/' + EncodingUtil.urlEncode(versionId, 'UTF-8'), sessionId);
            if (detailRes.getStatusCode() >= 200 && detailRes.getStatusCode() < 300) {
                String versionStatus = String.valueOf(parseJson(detailRes).get('versionStatus')).toUpperCase();
                if (!'DRAFT'.equals(versionStatus) && !'NULL'.equals(versionStatus)) {
                    HttpResponse draftRes = doPostNoBody(base + '/bundle-versions/' + EncodingUtil.urlEncode(versionId, 'UTF-8') + '/draft', sessionId);
                    if (draftRes.getStatusCode() >= 200 && draftRes.getStatusCode() < 300) {
                        Object draftId = parseJson(draftRes).get('draftBundleVersionId');
                        if (draftId != null) {
                            versionId = String.valueOf(draftId);
                        }
                    }
                }
            }

            // 3. Save the agent definition onto the (draft) version. This PATCH
            //    does not compile — publish does.
            Map<String, Object> saveBody = new Map<String, Object>{
                'apiName' => agentName,
                'label'   => agentName,
                'assets'  => new List<Object>{
                    new Map<String, Object>{
                        'resourceName'            => 'definition.agent',
                        'resourceType'            => 'agentDefinition',
                        'resourceAuthoringFormat' => 'afscript',
                        'resourceContent'         => agentYaml
                    }
                }
            };
            HttpResponse saveRes = doPatch(base + '/bundle-versions/' + EncodingUtil.urlEncode(versionId, 'UTF-8'), JSON.serialize(saveBody), sessionId);
            if (saveRes.getStatusCode() < 200 || saveRes.getStatusCode() >= 300) {
                return fail('Failed to save agent definition (HTTP ' + saveRes.getStatusCode() + '): ' + saveRes.getBody().abbreviate(300));
            }

            // 4. Publish — compiles the script and generates Bot/BotVersion +
            //    supporting records. A compile failure surfaces as an HTTP error
            //    or a populated errors[] (v67.0+).
            HttpResponse pubRes = doPostNoBody(base + '/bundle-versions/' + EncodingUtil.urlEncode(versionId, 'UTF-8') + '/publish', sessionId);
            if (pubRes.getStatusCode() < 200 || pubRes.getStatusCode() >= 300) {
                return fail('Publish failed (HTTP ' + pubRes.getStatusCode() + '): ' + pubRes.getBody().abbreviate(500));
            }
            Map<String, Object> pub = parseJson(pubRes);

            // errors[] is populated at v67.0+; surface real compile errors.
            if (pub.get('errors') instanceof List<Object>) {
                List<String> errMsgs = new List<String>();
                for (Object e : (List<Object>) pub.get('errors')) {
                    Map<String, Object> em = (Map<String, Object>) e;
                    Object severity = em.get('severity');
                    if (severity == null || 'Error'.equals(String.valueOf(severity))) {
                        errMsgs.add(formatCompileError(em));
                    }
                }
                if (!errMsgs.isEmpty()) {
                    return fail('Agent script compilation errors: ' + String.join(errMsgs, '; '));
                }
            }

            if (pub.get('publishedBotId') == null && pub.get('publishedBotVersionId') == null) {
                return fail('Publish returned no published bot — the agent script may have failed to compile.');
            }

            return ok(new Map<String, Object>{
                'projectId'             => projectId,
                'versionId'             => versionId,
                'publishedBotId'        => pub.get('publishedBotId'),
                'publishedBotVersionId' => pub.get('publishedBotVersionId')
            });
        } catch (Exception e) {
            return fail('Compile & publish error: ' + e.getMessage());
        }
    }

    // Formats a single Next Gen Authoring publish error (an errors[] entry,
    // v67.0+) as "description (line L:C)".
    private static String formatCompileError(Map<String, Object> e) {
        if (e == null) return 'unknown error';
        String loc = e.get('lineStart') != null
            ? ' (line ' + e.get('lineStart') + (e.get('colStart') != null ? ':' + e.get('colStart') : '') + ')'
            : '';
        Object detail = e.get('description') != null ? e.get('description') : e.get('errorType');
        return (detail != null ? String.valueOf(detail) : 'error') + loc;
    }

    /**
     * Combine three blobs (multipart prefix + binary zip + multipart suffix).
     * Uses hex encoding trick since Apex has no Blob.concat().
     */
    private static Blob combineBlobs(Blob prefix, Blob middle, Blob suffix) {
        String hex = EncodingUtil.convertToHex(prefix)
                   + EncodingUtil.convertToHex(middle)
                   + EncodingUtil.convertToHex(suffix);
        return EncodingUtil.convertFromHex(hex);
    }

    // ── Auto-provisioning: Messaging + Embedded Service + Web Connector ──────

    /**
     * Provisions a complete Embedded Messaging + Embedded Service Deployment stack
     * for a freshly-created agent, using only Tooling API calls.
     *
     * Steps:
     *   1. create_routing_config   — QueueRoutingConfig via Tooling API
     *   2. create_queue            — Queue (Group) + QueueSobject via REST
     *   3. create_messaging_ch     — MessagingChannel (EmbeddedMessaging) via Tooling API
     *   4. activate_messaging_ch   — PATCH IsActive=true on MessagingChannel
     *   5. create_esc              — EmbeddedServiceConfig via Tooling API
     *   6. create_branding         — EmbeddedServiceBranding via Tooling API
     *   7. link_channel            — EmbeddedServiceMessagingChannel via Tooling API
     *   8. enable_esc              — PATCH isEnabled=true on EmbeddedServiceConfig
     *   9. fetch_snippet_data      — Derive orgId, siteUrl, scrt2URL
     *
     * Returns the deployment info object (same shape as getDeployments) plus snippet values.
     */
    /**
     * Creates a headless Experience Cloud site for an Embedded Service Deployment
     * via the Connect API (POST /connect/communities) with the esw-template-frame template.
     * This is the same mechanism the Setup UI uses internally.
     * Returns the community ID for polling, or the Picasso site name if immediately available.
     */
    @AuraEnabled
    public static Map<String, Object> createEswSite(String deploymentName, String sessionId) {
        if (String.isBlank(deploymentName)) return fail('deploymentName is required.');
        try {
            // deploymentName already contains unique suffix (e.g., 'AW_1234567890_ESC')
            // No need to add another timestamp - use deploymentName directly for shorter names
            String siteName = 'ESW_' + deploymentName;
            String urlPrefix = siteName.replaceAll('[^a-zA-Z0-9]', '');

            String body = JSON.serialize(new Map<String, Object>{
                'name'           => siteName,
                'templateName'   => 'Build Your Own (LWR)',
                'urlPathPrefix'  => urlPrefix,
                'templateParams' => new Map<String, Object>{
                    'AuthenticationType' => 'AUTHENTICATED_WITH_PUBLIC_ACCESS_ENABLED'
                }
            });

            HttpResponse res = doPost('/services/data/' + API_VER + '/connect/communities', body, sessionId);
            Integer sc = res.getStatusCode();

            if (sc >= 200 && sc < 300) {
                Map<String, Object> resBody = parseJson(res);
                return ok(new Map<String, Object>{
                    'communityId' => resBody.get('id'),
                    'siteName'    => siteName,
                    'jobId'       => resBody.get('jobId')
                });
            }
            return fail('Failed to create ESW site (HTTP ' + sc + '): ' + res.getBody().abbreviate(300));
        } catch (Exception e) {
            return fail('Failed to create ESW site: ' + e.getMessage());
        }
    }

    /**
     * Polls for the Picasso site name after community creation.
     * Queries Site records matching the ESW name pattern and returns
     * the ChatterNetworkPicasso site name once found.
     */
    @AuraEnabled
    public static Map<String, Object> getEswPicassoSiteName(String siteName, String sessionId) {
        if (String.isBlank(siteName)) return fail('siteName is required.');
        try {
            // The Picasso site name is typically the Network name + '1' suffix
            // Query by matching pattern
            String soql = 'SELECT Id, Name, SiteType, Status FROM Site WHERE Name LIKE \''
                + String.escapeSingleQuotes(siteName) + '%\' AND SiteType = \'ChatterNetworkPicasso\' LIMIT 1';
            HttpResponse res = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(soql, 'UTF-8'), sessionId);

            if (res.getStatusCode() == 200) {
                List<Object> recs = (List<Object>) parseJson(res).get('records');
                if (recs != null && !recs.isEmpty()) {
                    Map<String, Object> rec = (Map<String, Object>) recs[0];
                    return ok(new Map<String, Object>{
                        'picassoSiteName' => String.valueOf(rec.get('Name')),
                        'siteId'          => String.valueOf(rec.get('Id')),
                        'status'          => String.valueOf(rec.get('Status'))
                    });
                }
            }
            return fail('Picasso site not found yet.');
        } catch (Exception e) {
            return fail('Failed to query Picasso site: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String, Object> provisionMessagingChannel(String baseLabel, String queueDevName, String agentDeveloperName, String sessionId) {
        if (String.isBlank(baseLabel) || String.isBlank(queueDevName)) {
            return fail('baseLabel and queueDevName are required.');
        }

        Integer suffix = Math.mod(Math.abs(Crypto.getRandomInteger()), 9000) + 1000;
        String safeName = 'AW_' + suffix;

        List<Map<String, Object>> steps = new List<Map<String, Object>>{
            new Map<String, Object>{ 'name' => 'create_messaging_ch',    'status' => 'pending' },
            new Map<String, Object>{ 'name' => 'activate_messaging_ch',  'status' => 'pending' }
        };

        String messagingChannelId;
        String messagingChannelDevName = safeName + '_MsgCh';

        // ── Step 1: Create Messaging Channel ─────────────────────────────────
        steps[0].put('status', 'running');
        try {
            // Query queue ID
            String qSoql = 'SELECT Id FROM Group WHERE DeveloperName = \'' +
                String.escapeSingleQuotes(queueDevName) + '\' AND Type = \'Queue\'';
            HttpResponse qRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(qSoql, 'UTF-8'), sessionId);
            String queueId = null;
            if (qRes.getStatusCode() == 200) {
                List<Object> qRecs = (List<Object>) parseJson(qRes).get('records');
                if (qRecs != null && !qRecs.isEmpty()) {
                    queueId = String.valueOf(((Map<String,Object>) qRecs[0]).get('Id'));
                }
            }

            // Query agent BotDefinition ID if provided
            String botId = null;
            if (!String.isBlank(agentDeveloperName) && agentDeveloperName != 'SKIPPED') {
                String botSoql = 'SELECT Id FROM BotDefinition WHERE DeveloperName = \'' +
                    String.escapeSingleQuotes(agentDeveloperName) + '\'';
                HttpResponse botRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(botSoql, 'UTF-8'), sessionId);
                if (botRes.getStatusCode() == 200) {
                    List<Object> botRecs = (List<Object>) parseJson(botRes).get('records');
                    if (botRecs != null && !botRecs.isEmpty()) {
                        botId = String.valueOf(((Map<String,Object>) botRecs[0]).get('Id'));
                    }
                }
            }

            Map<String, Object> mcFields = new Map<String, Object>{
                'DeveloperName'       => messagingChannelDevName,
                'MasterLabel'         => baseLabel + ' Messaging Channel',
                'MessageType'         => 'EmbeddedMessaging',
                'MessagingPlatformKey'=> messagingChannelDevName,
                'FallbackQueueId'     => queueId,
                'SessionHandlerId'    => !String.isBlank(botId) ? botId : queueId,
                'IsActive'            => false
            };
            String mcBody = JSON.serialize(mcFields);
            HttpResponse mcRes = doPost('/services/data/' + API_VER + '/sobjects/MessagingChannel', mcBody, sessionId);
            Integer mcSc = mcRes.getStatusCode();
            if (mcSc >= 200 && mcSc < 300) {
                messagingChannelId = String.valueOf(parseJson(mcRes).get('id'));
            } else {
                return failStep(steps, 0, 'HTTP ' + mcSc + ': ' + mcRes.getBody().abbreviate(300));
            }
            steps[0].put('status', 'completed');
        } catch (Exception e) {
            return failStep(steps, 0, e.getMessage());
        }

        // ── Step 2: Activate Messaging Channel ───────────────────────────────
        steps[1].put('status', 'running');
        try {
            HttpResponse actRes = doPatch(
                '/services/data/' + API_VER + '/sobjects/MessagingChannel/' + messagingChannelId,
                JSON.serialize(new Map<String, Object>{ 'IsActive' => true }),
                sessionId
            );
            Integer actSc = actRes.getStatusCode();
            if (actSc != 204 && (actSc < 200 || actSc >= 300)) {
                return failStep(steps, 1, 'HTTP ' + actSc + ': ' + actRes.getBody().abbreviate(300));
            }
            steps[1].put('status', 'completed');
        } catch (Exception e) {
            return failStep(steps, 1, e.getMessage());
        }

        return ok(new Map<String, Object>{
            'steps'                    => steps,
            'messagingChannelId'       => messagingChannelId,
            'messagingChannelDevName'  => messagingChannelDevName
        });
    }

    @AuraEnabled
    public static Map<String, Object> fetchSnippetData(String escDevName, String sessionId) {
        if (String.isBlank(escDevName)) return fail('escDevName is required.');
        try {
            String orgId = UserInfo.getOrganizationId().substring(0, 15);
            String siteUrl = null;
            String scrt2URL = null;
            String escId = null;

            HttpResponse orgRes = doGet(
                '/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode('SELECT Id FROM Organization', 'UTF-8'),
                sessionId
            );
            if (orgRes.getStatusCode() == 200) {
                List<Object> orgRecs = (List<Object>) parseJson(orgRes).get('records');
                if (orgRecs != null && !orgRecs.isEmpty()) {
                    orgId = String.valueOf(((Map<String,Object>) orgRecs[0]).get('Id')).substring(0, 15);
                }
            }

            String escSoql = 'SELECT Id, DeveloperName, SiteId, NamespacePrefix FROM EmbeddedServiceConfig WHERE DeveloperName = \'' +
                String.escapeSingleQuotes(escDevName) + '\' AND IsDeleted = false';
            HttpResponse escQRes = doGet('/services/data/' + API_VER + '/tooling/query?q=' + EncodingUtil.urlEncode(escSoql, 'UTF-8'), sessionId);
            if (escQRes.getStatusCode() == 200) {
                List<Object> escRecs = (List<Object>) parseJson(escQRes).get('records');
                if (escRecs != null && !escRecs.isEmpty()) {
                    Map<String, Object> rec = (Map<String, Object>) escRecs[0];
                    escId = String.valueOf(rec.get('Id'));
                    String siteId = String.valueOf(rec.get('SiteId'));
                    if (!String.isBlank(siteId) && siteId != 'null') {
                        String siteSoql = 'SELECT SecureURL FROM Site WHERE Id = \'' + siteId + '\'';
                        HttpResponse siteRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(siteSoql, 'UTF-8'), sessionId);
                        if (siteRes.getStatusCode() == 200) {
                            List<Object> siteRecs = (List<Object>) parseJson(siteRes).get('records');
                            if (siteRecs != null && !siteRecs.isEmpty()) {
                                siteUrl = String.valueOf(((Map<String,Object>) siteRecs[0]).get('SecureURL'));
                            }
                        }
                    }
                }
            }

            scrt2URL = baseUrl().replace('.my.salesforce.com', '.my.salesforce-scrt.com');

            return ok(new Map<String, Object>{
                'id'            => escId,
                'developerName' => escDevName,
                'label'         => escDevName,
                'siteUrl'       => siteUrl,
                'scrt2URL'      => scrt2URL,
                'orgId'         => orgId,
                'fullName'      => escDevName
            });
        } catch (Exception e) {
            return fail('Failed to fetch snippet data: ' + e.getMessage());
        }
    }

    /**
     * Creates a new Web Connector via the Data Cloud Connect API
     * (POST /ssot/connections), then configures its sitemap parameter.
     * Returns failure if creation fails — caller decides what to do.
     */
    @AuraEnabled
    public static Map<String, Object> createWebConnector(String sessionId) {
        try {
            String sitemapContent = 'SalesforceInteractions.init().then(() => { SalesforceInteractions.initSitemap({}) })';

            Integer suffix = Math.mod(Math.abs(Crypto.getRandomInteger()), 9000) + 1000;
            String newLabel = 'Adaptive Web Connector ' + suffix;

            String createBody = JSON.serialize(new Map<String, Object>{
                'connectorType'    => 'StreamingApp',
                'label'            => newLabel,
                'streamingAppType' => 'WebApp'
            });
            HttpResponse createRes = doPost(
                '/services/data/' + API_VER + '/ssot/connections',
                createBody,
                sessionId
            );
            Integer createSc = createRes.getStatusCode();

            if (createSc < 200 || createSc >= 300) {
                return fail('Failed to create web connector (HTTP ' + createSc + '): ' + createRes.getBody().abbreviate(300));
            }

            Map<String, Object> createResult = parseJson(createRes);
            String recordId      = String.valueOf(createResult.get('id'));
            String devName       = createResult.containsKey('developerName') ? String.valueOf(createResult.get('developerName')) : null;
            String label         = createResult.containsKey('label') ? String.valueOf(createResult.get('label')) : newLabel;
            String appIdentifier = createResult.containsKey('appIdentifier') ? String.valueOf(createResult.get('appIdentifier')) : null;

            // Re-query via Tooling API to get the StreamingAppDataConnector record
            // (the /ssot/connections response uses a different ID space)
            String soql = 'SELECT Id, DeveloperName, MasterLabel FROM StreamingAppDataConnector ORDER BY CreatedDate DESC LIMIT 1';
            HttpResponse qRes = doGet(
                '/services/data/' + API_VER + '/tooling/query/?q=' + EncodingUtil.urlEncode(soql, 'UTF-8'),
                sessionId
            );
            if (qRes.getStatusCode() == 200) {
                List<Object> recs = (List<Object>) parseJson(qRes).get('records');
                if (recs != null && !recs.isEmpty()) {
                    Map<String, Object> rec = (Map<String, Object>) recs[0];
                    recordId = String.valueOf(rec.get('Id'));
                    devName  = String.valueOf(rec.get('DeveloperName'));
                    label    = String.valueOf(rec.get('MasterLabel'));
                }
            }

            // Fetch detail for AppIdentifier
            HttpResponse detailRes = doGet(
                '/services/data/' + API_VER + '/tooling/sobjects/StreamingAppDataConnector/' + recordId,
                sessionId
            );
            if (detailRes.getStatusCode() >= 200 && detailRes.getStatusCode() < 300) {
                Map<String, Object> detail = parseJson(detailRes);
                if (String.isBlank(appIdentifier)) {
                    appIdentifier = detail.containsKey('AppIdentifier') && detail.get('AppIdentifier') != null
                        ? String.valueOf(detail.get('AppIdentifier')) : recordId;
                }
            }

            // Add sitemap using the same proven method that awSitemapPicker uses
            updateSitemap(recordId, sitemapContent, sessionId);

            return ok(new Map<String, Object>{
                'id'         => appIdentifier != null ? appIdentifier : recordId,
                'recordId'   => recordId,
                'name'       => devName,
                'label'      => label,
                'hasSitemap' => true
            });
        } catch (Exception e) {
            return fail('Failed to create web connector: ' + e.getMessage());
        }
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private static final String APEX_ACCESS_PS_NAME = 'Adaptive_Web_Agent_Apex_Access';
    private static final String[] AGENT_APEX_CLASSES = new String[]{
        'GetPersonalizationPoints', 'GetDynamicContextValues'
    };

    private static String ensureApexAccessPermissionSet(String sessionId) {
        String psSoql = 'SELECT Id FROM PermissionSet WHERE Name = \'' + APEX_ACCESS_PS_NAME + '\' LIMIT 1';
        HttpResponse psRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(psSoql, 'UTF-8'), sessionId);
        String psId = null;

        if (psRes.getStatusCode() == 200) {
            List<Object> recs = (List<Object>) parseJson(psRes).get('records');
            if (recs != null && !recs.isEmpty()) {
                psId = String.valueOf(((Map<String, Object>) recs[0]).get('Id'));
            }
        }

        if (psId == null) {
            String createBody = JSON.serialize(new Map<String, Object>{
                'Name'        => APEX_ACCESS_PS_NAME,
                'Label'       => 'Adaptive Web Agent Apex Access',
                'Description' => 'Grants Apex class execute access for Adaptive Web agent actions'
            });
            HttpResponse createRes = doPost('/services/data/' + API_VER + '/sobjects/PermissionSet', createBody, sessionId);
            if (createRes.getStatusCode() >= 200 && createRes.getStatusCode() < 300) {
                psId = String.valueOf(parseJson(createRes).get('id'));
            } else {
                return null;
            }
        }

        String classSoql = 'SELECT Id, Name FROM ApexClass WHERE Name IN (' +
            '\'' + String.join(AGENT_APEX_CLASSES, '\',\'') + '\')';
        HttpResponse classRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(classSoql, 'UTF-8'), sessionId);
        if (classRes.getStatusCode() != 200) return psId;

        List<Object> classRecs = (List<Object>) parseJson(classRes).get('records');
        if (classRecs == null || classRecs.isEmpty()) return psId;

        String existingSoql = 'SELECT SetupEntityId FROM SetupEntityAccess WHERE ParentId = \'' + psId + '\' AND SetupEntityType = \'ApexClass\'';
        HttpResponse existingRes = doGet('/services/data/' + API_VER + '/query?q=' + EncodingUtil.urlEncode(existingSoql, 'UTF-8'), sessionId);
        Set<String> alreadyLinked = new Set<String>();
        if (existingRes.getStatusCode() == 200) {
            List<Object> existingRecs = (List<Object>) parseJson(existingRes).get('records');
            if (existingRecs != null) {
                for (Object rec : existingRecs) {
                    alreadyLinked.add(String.valueOf(((Map<String, Object>) rec).get('SetupEntityId')));
                }
            }
        }

        for (Object rec : classRecs) {
            String classId = String.valueOf(((Map<String, Object>) rec).get('Id'));
            if (alreadyLinked.contains(classId)) continue;
            String seaBody = JSON.serialize(new Map<String, Object>{
                'ParentId'      => psId,
                'SetupEntityId' => classId
            });
            doPost('/services/data/' + API_VER + '/sobjects/SetupEntityAccess', seaBody, sessionId);
        }

        return psId;
    }

    private static void grantApexAccessToProfile(String profileId, String sessionId) {
        // Find the profile's underlying (owned) PermissionSet
        String profilePsSoql = 'SELECT Id FROM PermissionSet WHERE ProfileId = \'' +
            String.escapeSingleQuotes(profileId) + '\' AND IsOwnedByProfile = true LIMIT 1';
        HttpResponse profilePsRes = doGet('/services/data/' + API_VER + '/query?q=' +
            EncodingUtil.urlEncode(profilePsSoql, 'UTF-8'), sessionId);
        if (profilePsRes.getStatusCode() != 200) return;

        List<Object> profilePsRecs = (List<Object>) parseJson(profilePsRes).get('records');
        if (profilePsRecs == null || profilePsRecs.isEmpty()) return;
        String profilePsId = String.valueOf(((Map<String, Object>) profilePsRecs[0]).get('Id'));

        // Query the Apex classes
        String classSoql = 'SELECT Id FROM ApexClass WHERE Name IN (' +
            '\'' + String.join(AGENT_APEX_CLASSES, '\',\'') + '\')';
        HttpResponse classRes = doGet('/services/data/' + API_VER + '/query?q=' +
            EncodingUtil.urlEncode(classSoql, 'UTF-8'), sessionId);
        if (classRes.getStatusCode() != 200) return;

        List<Object> classRecs = (List<Object>) parseJson(classRes).get('records');
        if (classRecs == null || classRecs.isEmpty()) return;

        // Check what's already linked
        String existingSoql = 'SELECT SetupEntityId FROM SetupEntityAccess WHERE ParentId = \'' +
            profilePsId + '\' AND SetupEntityType = \'ApexClass\'';
        HttpResponse existingRes = doGet('/services/data/' + API_VER + '/query?q=' +
            EncodingUtil.urlEncode(existingSoql, 'UTF-8'), sessionId);
        Set<String> alreadyLinked = new Set<String>();
        if (existingRes.getStatusCode() == 200) {
            List<Object> existingRecs = (List<Object>) parseJson(existingRes).get('records');
            if (existingRecs != null) {
                for (Object rec : existingRecs) {
                    alreadyLinked.add(String.valueOf(((Map<String, Object>) rec).get('SetupEntityId')));
                }
            }
        }

        // Create SetupEntityAccess for each class not already linked
        for (Object rec : classRecs) {
            String classId = String.valueOf(((Map<String, Object>) rec).get('Id'));
            if (alreadyLinked.contains(classId)) continue;
            String seaBody = JSON.serialize(new Map<String, Object>{
                'ParentId'      => profilePsId,
                'SetupEntityId' => classId
            });
            doPost('/services/data/' + API_VER + '/sobjects/SetupEntityAccess', seaBody, sessionId);
        }
    }

    private static Map<String, Object> failStep(
        List<Map<String, Object>> steps,
        Integer stepIndex,
        String errorMessage
    ) {
        steps[stepIndex].put('status', 'failed');
        steps[stepIndex].put('error', errorMessage);
        return new Map<String, Object>{
            'success' => false,
            'message' => 'Failed at step "' + steps[stepIndex].get('name') + '": ' + errorMessage,
            'data'    => new Map<String, Object>{ 'steps' => steps }
        };
    }
}
