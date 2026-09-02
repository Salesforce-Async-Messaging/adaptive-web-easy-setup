/**
 * CmsDeliveryProxy
 *
 * Public Apex REST proxy for CMS Delivery API lookups.
 *
 * Endpoint:
 *   /services/apexrest/aw/cms/content?channelId=<0ap...>&contentKey=<MC...>&language=en_US&cacheSeconds=120
 *
 * IMPORTANT SETUP:
 * 1) Create a Named Credential called CMS_Delivery_NC that points to the target site base URL
 *    (for example: https://storm-d759b260ae0825.my.site.com/awclwc)
 * 2) Configure External Credential / principal with a user that can access Connect CMS Delivery API.
 * 3) Allow this Apex class in your guest/auth profile or permission set as needed.
 */
@RestResource(urlMapping='/aw/cms/content')
global with sharing class CmsDeliveryProxy {
    private static final String API_VERSION = 'v63.0';
    private static final Integer TIMEOUT_MS = 120000;
    private static final String NAMED_CREDENTIAL = 'CMS_Delivery_NC';
    private static final Integer CACHE_TTL_SECONDS = 120;
    private static final Integer CACHE_TTL_MIN_SECONDS = 10;
    private static final Integer CACHE_TTL_MAX_SECONDS = 3600;
    private static final String CACHE_PREFIX = 'cmsDelivery:';

    @HttpGet
    global static void getContent() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        res.addHeader('Content-Type', 'application/json');

        String channelId = req.params.get('channelId');
        String contentKey = req.params.get('contentKey');
        String language = req.params.get('language');
        Integer cacheTtlSeconds = resolveCacheTtl(req.params.get('cacheSeconds'));

        if (!isValidChannelId(channelId) || !isSafeContentKey(contentKey)) {
            writeError(400, 'INVALID_INPUT', 'channelId or contentKey is invalid.');
            return;
        }
        if (!String.isBlank(language) && !isValidLanguage(language)) {
            writeError(400, 'INVALID_LANGUAGE', 'language must look like en_US.');
            return;
        }

        try {
            String cacheKey = buildCacheKey(channelId, contentKey, language);
            String cachedBody = getCached(cacheKey);
            if (!String.isBlank(cachedBody)) {
                res.statusCode = 200;
                res.addHeader('X-Proxy-Cache', 'HIT');
                res.responseBody = Blob.valueOf(cachedBody);
                return;
            }

            HttpRequest outbound = new HttpRequest();
            outbound.setMethod('GET');
            outbound.setTimeout(TIMEOUT_MS);
            outbound.setHeader('Accept', 'application/json');
            outbound.setEndpoint(buildEndpoint(channelId, contentKey, language));

            HttpResponse upstream = (new Http()).send(outbound);
            Integer statusCode = upstream.getStatusCode();
            String body = upstream.getBody();

            // Pass through successful payloads.
            if (statusCode >= 200 && statusCode < 300) {
                putCached(cacheKey, body, cacheTtlSeconds);
                res.statusCode = 200;
                res.addHeader('X-Proxy-Cache', 'MISS');
                res.responseBody = Blob.valueOf(body);
                return;
            }

            // Standardize upstream failure messages.
            writeError(
                statusCode,
                'UPSTREAM_ERROR',
                'CMS delivery upstream returned HTTP ' + statusCode + '.',
                body
            );
        } catch (Exception e) {
            writeError(500, 'PROXY_EXCEPTION', e.getMessage());
        }
    }

    private static String buildEndpoint(String channelId, String contentKey, String language) {
        String path = '/services/data/' + API_VERSION
            + '/connect/cms/delivery/channels/' + EncodingUtil.urlEncode(channelId, 'UTF-8')
            + '/contents/' + EncodingUtil.urlEncode(contentKey, 'UTF-8');

        if (!String.isBlank(language)) {
            path += '?language=' + EncodingUtil.urlEncode(language, 'UTF-8');
        }
        return 'callout:' + NAMED_CREDENTIAL + path;
    }

    private static String buildCacheKey(String channelId, String contentKey, String language) {
        String lang = String.isBlank(language) ? '' : language;
        return CACHE_PREFIX + channelId + ':' + contentKey + ':' + lang;
    }

    private static String getCached(String key) {
        try {
            Object value = Cache.Org.get(key);
            return value == null ? null : String.valueOf(value);
        } catch (Exception e) {
            // Platform Cache might not be provisioned in every org.
            return null;
        }
    }

    private static void putCached(String key, String value, Integer ttlSeconds) {
        if (String.isBlank(value)) {
            return;
        }
        try {
            Cache.Org.put(key, value, ttlSeconds);
        } catch (Exception e) {
            // Ignore cache write failures and continue as pass-through proxy.
        }
    }

    private static Integer resolveCacheTtl(String rawValue) {
        if (String.isBlank(rawValue)) {
            return CACHE_TTL_SECONDS;
        }
        try {
            Integer parsed = Integer.valueOf(rawValue.trim());
            if (parsed < CACHE_TTL_MIN_SECONDS) {
                return CACHE_TTL_MIN_SECONDS;
            }
            if (parsed > CACHE_TTL_MAX_SECONDS) {
                return CACHE_TTL_MAX_SECONDS;
            }
            return parsed;
        } catch (Exception e) {
            return CACHE_TTL_SECONDS;
        }
    }

    private static Boolean isValidChannelId(String value) {
        return !String.isBlank(value) && Pattern.matches('^0ap[a-zA-Z0-9]{12,15}$', value);
    }

    private static Boolean isSafeContentKey(String value) {
        // Content keys are generally uppercase A-Z / 0-9 and can include underscores/hyphens.
        return !String.isBlank(value) && Pattern.matches('^[a-zA-Z0-9_-]{10,200}$', value);
    }

    private static Boolean isValidLanguage(String value) {
        return Pattern.matches('^[a-z]{2}(_[A-Z]{2})?$', value);
    }

    private static void writeError(Integer statusCode, String code, String message) {
        writeError(statusCode, code, message, null);
    }

    private static void writeError(Integer statusCode, String code, String message, String upstreamBody) {
        RestResponse res = RestContext.response;
        res.statusCode = statusCode;

        Map<String, Object> payload = new Map<String, Object>{
            'success' => false,
            'errorCode' => code,
            'message' => message
        };
        if (!String.isBlank(upstreamBody)) {
            payload.put('upstreamBody', upstreamBody.left(2000));
        }
        res.responseBody = Blob.valueOf(JSON.serialize(payload));
    }
}

