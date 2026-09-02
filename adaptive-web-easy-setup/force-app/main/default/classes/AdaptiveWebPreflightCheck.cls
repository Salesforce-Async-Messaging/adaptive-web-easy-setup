public with sharing class AdaptiveWebPreflightCheck {

    public class PreflightResult {
        @AuraEnabled public Boolean success { get; set; }
        @AuraEnabled public String message { get; set; }
        @AuraEnabled public List<CheckResult> checks { get; set; }

        public PreflightResult() {
            this.checks = new List<CheckResult>();
        }
    }

    public class CheckResult {
        @AuraEnabled public String name { get; set; }
        @AuraEnabled public String label { get; set; }
        @AuraEnabled public Boolean passed { get; set; }
        @AuraEnabled public String message { get; set; }
        @AuraEnabled public String setupPath { get; set; }
        @AuraEnabled public String severity { get; set; } // 'critical', 'warning', 'info'

        public CheckResult(String name, String label, Boolean passed, String message, String setupPath, String severity) {
            this.name = name;
            this.label = label;
            this.passed = passed;
            this.message = message;
            this.setupPath = setupPath;
            this.severity = severity;
        }
    }

    @AuraEnabled(cacheable=false)
    public static PreflightResult runPreflightChecks() {
        PreflightResult result = new PreflightResult();

        try {
            // Check 1: Agentforce Enabled (BotDefinition object exists)
            result.checks.add(checkAgentforceEnabled());

            // Check 2: Data Cloud Enabled (PersonalizationPoint object exists)
            result.checks.add(checkDataCloudEnabled());

            // Check 3: Personalization Enabled (can query PersonalizationPoint)
            result.checks.add(checkPersonalizationEnabled());

            // Check 4: Einstein Agent User Profile
            result.checks.add(checkEinsteinAgentProfile());

            // Check 5: Required Permission Sets
            result.checks.add(checkRequiredPermissionSets());

            // Check 6: My Domain Deployed
            result.checks.add(checkMyDomainDeployed());

            // Check 7: Experience Cloud (Community objects accessible)
            result.checks.add(checkExperienceCloudEnabled());

            // Check 8: Embedded Service (MessagingChannel accessible)
            result.checks.add(checkEmbeddedServiceEnabled());

            // Determine overall success
            Boolean allCriticalPassed = true;
            for (CheckResult check : result.checks) {
                if (check.severity == 'critical' && !check.passed) {
                    allCriticalPassed = false;
                    break;
                }
            }

            result.success = allCriticalPassed;
            result.message = allCriticalPassed
                ? 'All prerequisites validated. Ready to proceed!'
                : 'Some critical prerequisites are missing. Please complete the required setup steps.';

        } catch (Exception e) {
            result.success = false;
            result.message = 'Pre-flight check failed: ' + e.getMessage();
        }

        return result;
    }

    private static CheckResult checkAgentforceEnabled() {
        try {
            // Try to describe BotDefinition object
            Schema.DescribeSObjectResult botDescribe = Schema.getGlobalDescribe().get('BotDefinition').getDescribe();
            if (botDescribe != null) {
                return new CheckResult(
                    'agentforce',
                    'Agentforce Enabled',
                    true,
                    'Agentforce is enabled in this org.',
                    null,
                    'critical'
                );
            }
        } catch (Exception e) {
            // Object doesn't exist - feature not enabled
        }

        return new CheckResult(
            'agentforce',
            'Agentforce Enabled',
            false,
            'Agentforce must be enabled before deploying the wizard.',
            'Setup → Feature Settings → Service → Agentforce Agents → Enable',
            'critical'
        );
    }

    private static CheckResult checkDataCloudEnabled() {
        try {
            // Try to describe StreamingDataConnector object
            Schema.DescribeSObjectResult dcDescribe = Schema.getGlobalDescribe().get('StreamingDataConnector').getDescribe();
            if (dcDescribe != null) {
                return new CheckResult(
                    'datacloud',
                    'Data Cloud Enabled',
                    true,
                    'Data Cloud is enabled in this org.',
                    null,
                    'critical'
                );
            }
        } catch (Exception e) {
            // Object doesn't exist
        }

        return new CheckResult(
            'datacloud',
            'Data Cloud Enabled',
            false,
            'Data Cloud must be enabled for Web Connector functionality.',
            'Setup → Feature Settings → Data Cloud → Enable',
            'critical'
        );
    }

    private static CheckResult checkPersonalizationEnabled() {
        try {
            // Try to query PersonalizationPoint
            List<SObject> ppList = Database.query('SELECT Id FROM PersonalizationPoint LIMIT 1');
            return new CheckResult(
                'personalization',
                'Personalization Enabled',
                true,
                'Personalization (C360A) is enabled in this org.',
                null,
                'critical'
            );
        } catch (QueryException e) {
            return new CheckResult(
                'personalization',
                'Personalization Enabled',
                false,
                'Personalization must be enabled for transformer and PEC creation.',
                'Setup → Feature Settings → Personalization → Enable',
                'critical'
            );
        } catch (Exception e) {
            return new CheckResult(
                'personalization',
                'Personalization Enabled',
                false,
                'Unable to verify Personalization status: ' + e.getMessage(),
                'Setup → Feature Settings → Personalization',
                'critical'
            );
        }
    }

    private static CheckResult checkEinsteinAgentProfile() {
        try {
            List<Profile> profiles = [
                SELECT Id, Name
                FROM Profile
                WHERE Name = 'Einstein Agent User'
                LIMIT 1
            ];

            if (!profiles.isEmpty()) {
                return new CheckResult(
                    'einstein_profile',
                    'Einstein Agent User Profile',
                    true,
                    'Einstein Agent User profile is available.',
                    null,
                    'critical'
                );
            }
        } catch (Exception e) {
            // Query failed
        }

        return new CheckResult(
            'einstein_profile',
            'Einstein Agent User Profile',
            false,
            'Einstein Agent User profile not found. Provision Einstein Agent licenses.',
            'Setup → Company Information → User Licenses → Provision DigitalAgent',
            'critical'
        );
    }

    private static CheckResult checkRequiredPermissionSets() {
        try {
            List<PermissionSet> permSets = [
                SELECT Id, Name
                FROM PermissionSet
                WHERE Name IN (
                    'AgentforceServiceAgentSecureBase',
                    'AgentforceServiceAgentUserPsg',
                    'CopilotSalesforceUser',
                    'CopilotSalesforceUserPSG'
                )
                LIMIT 10
            ];

            if (!permSets.isEmpty()) {
                String foundNames = '';
                for (PermissionSet ps : permSets) {
                    foundNames += ps.Name + ', ';
                }
                foundNames = foundNames.removeEnd(', ');

                return new CheckResult(
                    'permission_sets',
                    'Required Permission Sets',
                    true,
                    'Found permission sets: ' + foundNames,
                    null,
                    'critical'
                );
            }
        } catch (Exception e) {
            // Query failed
        }

        return new CheckResult(
            'permission_sets',
            'Required Permission Sets',
            false,
            'Required Agentforce permission sets not found. These are auto-provisioned when Agentforce is enabled.',
            'Setup → Feature Settings → Service → Agentforce Agents',
            'critical'
        );
    }

    private static CheckResult checkMyDomainDeployed() {
        try {
            String orgUrl = URL.getOrgDomainUrl().toExternalForm();

            // Check if URL contains a custom domain (my.salesforce.com pattern)
            if (orgUrl.contains('.my.salesforce.com') ||
                orgUrl.contains('.lightning.force.com') ||
                orgUrl.contains('.my.site.com')) {
                return new CheckResult(
                    'mydomain',
                    'My Domain Deployed',
                    true,
                    'My Domain is deployed: ' + orgUrl,
                    null,
                    'critical'
                );
            }
        } catch (Exception e) {
            // Unable to determine
        }

        return new CheckResult(
            'mydomain',
            'My Domain Deployed',
            false,
            'My Domain must be deployed for Lightning components and agent runtime.',
            'Setup → Company Settings → My Domain → Deploy to Users',
            'critical'
        );
    }

    private static CheckResult checkExperienceCloudEnabled() {
        try {
            // Try to describe Network object (Communities/Experience Cloud)
            Schema.DescribeSObjectResult networkDescribe = Schema.getGlobalDescribe().get('Network').getDescribe();
            if (networkDescribe != null && networkDescribe.isAccessible()) {
                return new CheckResult(
                    'experience_cloud',
                    'Experience Cloud Enabled',
                    true,
                    'Experience Cloud is accessible.',
                    null,
                    'warning'
                );
            }
        } catch (Exception e) {
            // Not accessible
        }

        return new CheckResult(
            'experience_cloud',
            'Experience Cloud Enabled',
            false,
            'Experience Cloud may be required for ESW site creation. Verify license availability.',
            'Setup → Feature Settings → Experience Cloud',
            'warning'
        );
    }

    private static CheckResult checkEmbeddedServiceEnabled() {
        try {
            // Try to describe EmbeddedServiceConfig object
            Schema.DescribeSObjectResult escDescribe = Schema.getGlobalDescribe().get('EmbeddedServiceConfig').getDescribe();
            if (escDescribe != null && escDescribe.isAccessible()) {
                return new CheckResult(
                    'embedded_service',
                    'Embedded Service Enabled',
                    true,
                    'Embedded Service (Messaging) is accessible.',
                    null,
                    'critical'
                );
            }
        } catch (Exception e) {
            // Not accessible
        }

        return new CheckResult(
            'embedded_service',
            'Embedded Service Enabled',
            false,
            'Embedded Service must be enabled for Messaging Channel creation.',
            'Setup → Feature Settings → Service → Embedded Service Deployments',
            'critical'
        );
    }
}
