import { LightningElement, track } from 'lwc';
import runPreflightChecks from '@salesforce/apex/AdaptiveWebPreflightCheck.runPreflightChecks';

export default class AwPreflightCheck extends LightningElement {
    @track checking = false;
    @track checksComplete = false;
    @track checks = [];
    @track allPassed = false;
    @track errorMessage = null;

    get hasChecks() {
        return this.checks && this.checks.length > 0;
    }

    get canProceed() {
        return this.checksComplete && this.allPassed;
    }

    get checkButtonLabel() {
        return this.checking ? 'Checking...' : 'Run Pre-Flight Checks';
    }

    get checksDisplay() {
        if (!this.checks) return [];
        return this.checks.map(c => ({
            ...c,
            iconName: c.passed ? 'utility:success' : 'utility:error',
            iconVariant: c.passed ? 'success' : 'error',
            statusClass: c.passed ? 'check-passed' : 'check-failed',
            severityBadge: c.severity === 'critical' ? 'Critical' : c.severity === 'warning' ? 'Warning' : 'Info',
            severityClass: c.severity === 'critical' ? 'severity-critical' : c.severity === 'warning' ? 'severity-warning' : 'severity-info',
        }));
    }

    get criticalFailed() {
        return this.checks.filter(c => c.severity === 'critical' && !c.passed).length;
    }

    get warningFailed() {
        return this.checks.filter(c => c.severity === 'warning' && !c.passed).length;
    }

    get summaryMessage() {
        if (!this.checksComplete) return '';
        if (this.allPassed) {
            return 'All prerequisites validated successfully! You can proceed with the wizard.';
        }
        const critical = this.criticalFailed;
        const warnings = this.warningFailed;
        let msg = '';
        if (critical > 0) {
            msg += `${critical} critical prerequisite${critical > 1 ? 's' : ''} missing. `;
        }
        if (warnings > 0) {
            msg += `${warnings} warning${warnings > 1 ? 's' : ''} found. `;
        }
        return msg + 'Please complete the required setup steps before proceeding.';
    }

    connectedCallback() {
        // Auto-run checks on load
        this.handleRunChecks();
    }

    async handleRunChecks() {
        this.checking = true;
        this.checksComplete = false;
        this.errorMessage = null;
        this.checks = [];

        try {
            const result = await runPreflightChecks();
            this.checks = result.checks || [];
            this.allPassed = result.success;
            this.checksComplete = true;
        } catch (error) {
            this.errorMessage = error.body?.message || error.message || 'Failed to run pre-flight checks';
            this.checksComplete = false;
        } finally {
            this.checking = false;
        }
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    handleNext() {
        if (this.canProceed) {
            this.dispatchEvent(new CustomEvent('next'));
        }
    }
}
