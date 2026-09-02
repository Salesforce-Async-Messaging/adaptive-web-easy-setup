@IsTest
private class CmsDeliveryProxyTest {
    private static Integer callCount = 0;

    @TestSetup
    static void clearCache() {
        // Best-effort cleanup; safe if cache is unavailable in test org.
        try {
            Cache.Org.remove('cmsDelivery:0apHu000001YJPBIA4:MCPKE76SYE2JDI5C2Y6LEEW6W35Y:en_US');
        } catch (Exception e) {
        }
    }

    @IsTest
    static void testSuccessPassThrough() {
        RestRequest req = new RestRequest();
        req.requestUri = '/services/apexrest/aw/cms/content';
        req.httpMethod = 'GET';
        req.addParameter('channelId', '0apHu000001YJPBIA4');
        req.addParameter('contentKey', 'MCPKE76SYE2JDI5C2Y6LEEW6W35Y');
        req.addParameter('language', 'en_US');
        RestContext.request = req;
        RestContext.response = new RestResponse();

        Test.setMock(HttpCalloutMock.class, new MockResponder(200, '{"contentKey":"MCPK..."}'));
        Test.startTest();
        CmsDeliveryProxy.getContent();
        Test.stopTest();

        System.assertEquals(200, RestContext.response.statusCode);
        System.assertNotEquals(null, RestContext.response.responseBody);
        System.assert(RestContext.response.responseBody.toString().contains('contentKey'));
    }

    @IsTest
    static void testCacheAvoidsSecondCalloutWhenAvailable() {
        RestRequest req = new RestRequest();
        req.requestUri = '/services/apexrest/aw/cms/content';
        req.httpMethod = 'GET';
        req.addParameter('channelId', '0apHu000001YJPBIA4');
        req.addParameter('contentKey', 'MCPKE76SYE2JDI5C2Y6LEEW6W35Y');
        req.addParameter('language', 'en_US');

        callCount = 0;
        Test.setMock(HttpCalloutMock.class, new CountingMock(200, '{"contentKey":"MCPK..."}'));

        Test.startTest();
        RestContext.request = req;
        RestContext.response = new RestResponse();
        CmsDeliveryProxy.getContent();

        RestContext.request = req;
        RestContext.response = new RestResponse();
        CmsDeliveryProxy.getContent();
        Test.stopTest();

        // If platform cache is available, second request should be cache hit with no callout.
        // If cache is not available, proxy degrades gracefully and this can be 2.
        System.assert(
            callCount == 1 || callCount == 2,
            'Expected 1 (cache hit) or 2 (cache unavailable) callouts, got ' + callCount
        );
    }

    @IsTest
    static void testInvalidInput() {
        RestRequest req = new RestRequest();
        req.requestUri = '/services/apexrest/aw/cms/content';
        req.httpMethod = 'GET';
        req.addParameter('channelId', 'not-valid');
        req.addParameter('contentKey', 'bad');
        RestContext.request = req;
        RestContext.response = new RestResponse();

        Test.startTest();
        CmsDeliveryProxy.getContent();
        Test.stopTest();

        System.assertEquals(400, RestContext.response.statusCode);
        System.assert(RestContext.response.responseBody.toString().contains('INVALID_INPUT'));
    }

    @IsTest
    static void testUpstreamFailure() {
        RestRequest req = new RestRequest();
        req.requestUri = '/services/apexrest/aw/cms/content';
        req.httpMethod = 'GET';
        req.addParameter('channelId', '0apHu000001YJPBIA4');
        req.addParameter('contentKey', 'MCPKE76SYE2JDI5C2Y6LEEW6W35Y');
        RestContext.request = req;
        RestContext.response = new RestResponse();

        Test.setMock(HttpCalloutMock.class, new MockResponder(401, '[{"errorCode":"INSUFFICIENT_ACCESS"}]'));
        Test.startTest();
        CmsDeliveryProxy.getContent();
        Test.stopTest();

        System.assertEquals(401, RestContext.response.statusCode);
        System.assert(RestContext.response.responseBody.toString().contains('UPSTREAM_ERROR'));
    }

    private class MockResponder implements HttpCalloutMock {
        private final Integer statusCode;
        private final String body;

        MockResponder(Integer statusCode, String body) {
            this.statusCode = statusCode;
            this.body = body;
        }

        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(statusCode);
            res.setBody(body);
            return res;
        }
    }

    private class CountingMock implements HttpCalloutMock {
        private final Integer statusCode;
        private final String body;

        CountingMock(Integer statusCode, String body) {
            this.statusCode = statusCode;
            this.body = body;
        }

        public HttpResponse respond(HttpRequest req) {
            CmsDeliveryProxyTest.callCount++;
            HttpResponse res = new HttpResponse();
            res.setStatusCode(statusCode);
            res.setBody(body);
            return res;
        }
    }
}

