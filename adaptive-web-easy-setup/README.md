# Adaptive Web Setup Wizard

A Salesforce DX project that deploys a guided **Adaptive Web Setup Wizard** into a Salesforce org. The wizard creates an Agentforce Service Agent and wires it into Personalization (Web Connector → Embedded Service Deployment → Transformer → Personalization Experience Config) so an Adaptive Web experience can run on a customer site end-to-end.

## What it does

The wizard is a single Lightning app (`Adaptive Web Setup`) that walks the user through three stages:

1. **Create Agent** — generates and publishes an Agentforce Service Agent (Bot, GenAiPlannerBundle, GenAiPrompt, AiAuthoringBundle), provisions a shared bot user, assigns the required permission sets, and compiles + publishes the agent script.
2. **Configure** — auto-creates the supporting infrastructure: a Web Connector with sitemap, routing config + queue, a Messaging Channel (EmbeddedMessaging), an Experience Cloud site, and an Embedded Service Deployment. Existing-infrastructure paths let users pick an existing sitemap or deployment instead.
3. **Go Live** — creates the Personalization Transformer and Personalization Experience Config in Data Cloud and reports the snippet values needed to embed Adaptive Web on a page.

All of this is driven from one Apex class (`AdaptiveWebService`) using REST callouts against the org's own Tooling, Connect, and Metadata APIs.

## Prerequisites

### Required Software
- **Salesforce CLI** (`sf`) installed and authenticated to your target org
- **Node.js 18+** (only required for the bulk multi-org deploy script)

### Required Org Configuration

Your Salesforce org must have the following features enabled **before** deployment.

> **Two ways features get enabled — this matters.**
> Some features are toggled directly in **Setup**. Others (notably **Data Cloud** and **Personalization**) are **provisioned by license**, so there is *no* Setup switch for them — if the license isn't on the org, the Setup toggle simply won't appear.
> - **Production orgs:** licenses are provisioned by your account/provisioning process. If Data Cloud or Personalization is missing, it's a licensing request, not a Setup change.
> - **Test / local / internal orgs:** enable the license yourself via **Blacktab UI → Org → License Editor → Data Cloud / Personalization**, then the related Setup pages become available.

#### 1. Einstein and Agentforce
- **Setup → Einstein Setup → Enable Einstein**
- **Setup → Agentforce → Enable Agentforce**
- Required for: Bot, AiAuthoringBundle, GenAiPlannerBundle metadata types

#### 2. Data Cloud
- **License-based** (not a Setup toggle). Confirm the Data Cloud license is on the org; on test/local orgs enable it via **Blacktab → Org → License Editor → Data Cloud**.
- Required for: Personalization Transformer, data streams, and DMOs

#### 3. Personalization
- **License-based** (not a Setup toggle). Confirm the Personalization license is on the org; on test/local orgs enable it via **Blacktab → Org → License Editor → Personalization**.
- Required for: `GetPersonalizationPoints` Apex class and Personalization Experience Configs

#### 4. Service Cloud (Messaging/Chat)
- **Setup → Service Setup → Enable Chat** or **Messaging**
- Required for: Embedded Service Deployment, messaging channels

#### 5. Experience Cloud (optional but recommended)
- **Setup → Digital Experiences → Enable Digital Experiences**
- Required if you want the wizard to auto-create Experience Cloud sites

#### 6. My Domain
- **Setup → My Domain** - Must be deployed and active
- Required for: CSP Trusted Sites, Remote Site Settings, and agent publishing

### API Version Requirements
- This package requires **API version 67.0** or higher (release **262 / Summer '26** or later). The Agent-DSL metadata it deploys (`agentDSLEnabled`, `AiAuthoringBundle`, `GenAiPlannerBundle`) is available from v64–v65, so v67.0 comfortably clears it.
- The `sfdx-project.json` and `package.xml` are configured for v67.0, which deploys cleanly to both 262 (v67) and 264 (v68) orgs.

### Verification Checklist

Before deploying, verify these features are enabled in your org.

> **Note:** There is no single reliable CLI command that lists all of these — `sf org display --json` does **not** return a `features` array, and license-provisioned features (Data Cloud, Personalization) don't surface there at all. Verify them in Setup (and, for the license-based ones, via Blacktab → License Editor as described above).

Manual checklist:
- [ ] Einstein enabled — Setup → Einstein Setup
- [ ] Agentforce enabled — Setup → Agentforce
- [ ] Data Cloud license present — Setup → Data Cloud (or Blacktab → License Editor)
- [ ] Personalization license present — Setup → Personalization (or Blacktab → License Editor)
- [ ] Service Cloud (Messaging/Chat) enabled — Setup → Service Setup
- [ ] My Domain deployed — Setup → My Domain
- [ ] Experience Cloud enabled (if using Experience sites) — Setup → Digital Experiences

You can confirm the org's API version and basic org info (useful for the v67.0 requirement below) with:

```bash
sf org display -o <your-org-alias>
```

## Repository layout

```
force-app/main/default/   Salesforce metadata (deployable)
  applications/           "Adaptive Web Setup" custom app
  tabs/                   Custom tab that hosts the wizard
  lwc/                    awWizard, awAutoSetup, awAgentCreator, awSitemapPicker,
                          awDeploymentPicker, awAgentPicker, awDeployProgress,
                          awDone, zipBuilder
  aura/                   awAgentPublisherApp — used by the Aura-via-Apex bridge
  classes/                AdaptiveWebService (+ tests), GetPersonalizationPoints,
                          GetDynamicContextValues
  pages/                  GetSessionId.page — VF page that postMessages a
                          REST-capable session ID to the LWC parent
  permissionsets/         Adaptive_Web_Setup_User
  remoteSiteSettings/     Adaptive_Web_Setup_Server (must match My Domain URL)
  cspTrustedSites/        Org_Self (must match My Domain URL)
  objects/                JwtBearerConfig__mdt custom metadata type
scripts/                  Node tooling (multi-org bulk deploy, bot-user cleanup)
sfdx-project.json         sourceApiVersion = 67.0
```

`.forceignore` keeps `scripts/`, `node_modules/`, and root JS/JSON files out of the deploy — only `force-app/**` and `sfdx-project.json` ship to the org.

## Deploy to a single org

### ⚡ Quick Start (Recommended)

**Use the automated script** - no manual XML editing required!

```bash
# 1. Clone and navigate to the project
git clone git@git.soma.salesforce.com:d360-personalization/adaptive-web-agent-component.git
cd adaptive-web-agent-component/adaptive-web-easy-setup
git checkout feature/production-hardening

# 2. Authenticate to your org
sf org login web --alias myorg

# 3. 🔧 Auto-configure org URLs (replaces manual XML editing!)
./scripts/configure-org-urls.sh myorg

# 4. Deploy the package
sf project deploy start --manifest package.xml -o myorg

# 5. Assign permission set
sf org assign permset -n Adaptive_Web_Setup_User -o myorg

# 6. Open the wizard
sf org open -o myorg
# Navigate to: App Launcher → Adaptive Web Setup
```

**What the auto-config script does:**
- ✅ Detects your org's My Domain URL via `sf org display`
- ✅ Updates `remoteSiteSettings/Adaptive_Web_Setup_Server.remoteSite-meta.xml`
- ✅ Updates `cspTrustedSites/Org_Self.cspTrustedSite-meta.xml`
- ✅ Creates timestamped backups before modification
- ✅ Cross-platform (works on macOS and Linux)

**Script location:** `scripts/configure-org-urls.sh`

**Time saved:** ~5 minutes of manual XML editing eliminated!

---

### 📝 Manual Deployment (Alternative)

> **💡 Tip:** The automated script above is recommended. Manual deployment requires editing XML files and is more error-prone. Only use this if the script doesn't work in your environment.

If you must configure manually:

#### 1. Update org-specific URLs

Get your My Domain URL:
```bash
sf org display -o myorg --json | jq -r '.result.instanceUrl'
```

Example output: `https://placeholder.my.salesforce.com`

Update these two files with your org's URL (no trailing slash):

- `force-app/main/default/remoteSiteSettings/Adaptive_Web_Setup_Server.remoteSite-meta.xml`
  ```xml
  <url>https://placeholder.my.salesforce.com</url>
  ```

- `force-app/main/default/cspTrustedSites/Org_Self.cspTrustedSite-meta.xml`
  ```xml
  <endpointUrl>https://placeholder.my.salesforce.com</endpointUrl>
  ```

#### 2. Authenticate to your org

```bash
# Login and create an alias for your org
sf org login web --alias myorg

# Verify the alias was created
sf alias list

# View org details (including instanceUrl for step 1)
sf org display -o myorg
```

**What is an org alias?**
An alias is a short name (like `myorg`, `dev`, `staging`) that references your Salesforce org. It saves you from typing the full username every time.

**Common aliases:**
- `dev` - Development sandbox
- `uat` - Testing sandbox  
- `prod` - Production org
- `myorg` - Generic alias (used in examples)

**Check existing aliases:**
```bash
sf org list
```

**Set default org (optional):**
```bash
sf config set target-org=myorg
# Now you can omit `-o myorg` from commands
```

#### 3. Deploy

**Recommended:** Deploy using `package.xml` to avoid test artifacts:
```bash
sf project deploy start --manifest package.xml -o myorg
```

**Alternative:** Deploy entire force-app directory:
```bash
sf project deploy start --source-dir force-app -o myorg
```

#### 4. Assign the permission set

**Via CLI (Recommended):**
```bash
# Assign to yourself (current authenticated user)
sf org assign permset -n Adaptive_Web_Setup_User -o myorg

# Assign to a specific user
sf org assign permset -n Adaptive_Web_Setup_User -o myorg --on-behalf-of user@example.com

# Verify assignment
sf data query -o myorg -q "SELECT Id, Assignee.Username FROM PermissionSetAssignment WHERE PermissionSet.Name = 'Adaptive_Web_Setup_User'"
```

**Via Setup (Manual alternative):**
1. **Setup → Users → Users** → click the user → **Permission Set Assignments → Edit**
2. Add **Adaptive Web Setup User** → Save

**Note:** System Administrators automatically have access and don't need the permission set.

#### 5. Open the wizard

In the App Launcher, search for **Adaptive Web Setup** and click through the wizard.

## Run Apex tests

```bash
# All tests in the org with coverage
sf apex run test -o <alias> --code-coverage --result-format human --wait 10

# A single test class
sf apex run test -o <alias> --class-names AdaptiveWebServiceTest --result-format human --wait 10
```

## Bulk deployment to many orgs (demo prep)

`scripts/deploy-to-orgs.js` authenticates each user via SOAP login (no browser), patches the Remote Site Setting with the org's My Domain URL, deploys via the `sf` CLI, then restores the file — repeating for every row in a CSV.

**Prerequisites:**

- SOAP API login enabled on each org (Org Mgmt Suite "Enable SOAP login API" automation handles this for orgfarm pc-rnd orgs).
- Node.js 18+ installed.
- Run `npm install` once to install `jsforce`.

**CSV format** (single `username` column):

```
username
demo1@orgfarm-abc.test2.pc-rnd.salesforce.com
demo2@orgfarm-def.test2.pc-rnd.salesforce.com
```

**Run:**

```bash
SF_DEMO_PASSWORD='your-shared-password' \
  node scripts/deploy-to-orgs.js path/to/usernames.csv
```

By default it logs in via `https://test.salesforce.com` — set `SF_LOGIN_URL` to override (e.g. `https://login.salesforce.com` for prod orgs). If MFA is enforced, append the user's security token to the password.

The script prints per-org status (`✓ Deployed` or `✗ Failed`) and a final summary. The remote site XML is restored after every deploy, so the working tree stays clean.


## Troubleshooting Common Deployment Issues

### Issue: "URL not whitelisted" or "CSP Violation"

**Error:**
```
Lightning Component Error: CSP Violation - refused to connect to https://...
Or: Remote Site Settings not configured
```

**Solution:**
Run the auto-config script to update URLs for your org:

```bash
./scripts/configure-org-urls.sh your-org-alias
```

This automatically updates both:
- Remote Site Settings (`remoteSiteSettings/Adaptive_Web_Setup_Server.remoteSite-meta.xml`)
- CSP Trusted Sites (`cspTrustedSites/Org_Self.cspTrustedSite-meta.xml`)

Then redeploy:
```bash
sf project deploy start --manifest package.xml -o your-org-alias
```

**Manual alternative:** See "Manual Deployment" section below for editing XML files directly.

---

### Issue: "Not available for deploy for this organization" (Bot, AiAuthoringBundle, GenAiPlannerBundle)

**Error:**
```
Bot                AdaptiveWeb_Fixed   Not available for deploy for this organization
AiAuthoringBundle  ...                 Not available for deploy for this organization
GenAiPlannerBundle ...                 Not available for deploy for this organization
```

**Solution:**
1. Enable Einstein: **Setup → Einstein Setup → Enable Einstein**
2. Enable Agentforce: **Setup → Agentforce → Enable Agentforce**
3. If still failing, verify API version is 67.0 or higher (see next issue)

---

### Issue: "Not available for deploy for this API version"

**Error:**
```
AiAuthoringBundle  ...  Not available for deploy for this API version
```

**Solution:**
Agent-DSL metadata requires API v67.0+ (release 262 or later). Update both:
- `sfdx-project.json`: `"sourceApiVersion": "67.0"`
- `package.xml`: `<version>67.0</version>`

*(This is already set correctly on this branch. Note: the manifest version must be **at or below** the target org's API version — a v68 manifest is rejected by a v67/262 org with "Invalid version specified", which is why the package targets v67.0.)*

---

### Issue: "Invalid type: PersonalizationPoint"

**Error:**
```
ApexClass  GetPersonalizationPoints  Invalid type: PersonalizationPoint
```

**Solution:**
Enable Personalization in your org:
1. **Setup → Personalization → Enable Personalization**
2. If Data Cloud isn't enabled, enable it first (Personalization requires Data Cloud)

---

### Issue: "DeveloperName already in use by a Bot Definition"

**Error:**
```
AiAuthoringBundle  AdaptiveWeb_Fixed  DeveloperName already in use by a Bot Definition
```

**Solution:**
A previous partial deployment left a bot artifact in your org. Clean it up:
1. **Setup → Bots → AdaptiveWeb_Fixed → Delete**
2. Or: **Setup → Agentforce → Agents → AdaptiveWeb_Fixed → Delete**
3. Redeploy

---

### Issue: CSP Trusted Site - Invalid URL

**Error:**
```
CspTrustedSite  Org_Self  Invalid URL
```

**Solution:**
The CSP Trusted Site needs your org's specific My Domain URL:
1. Get your My Domain URL: **Setup → My Domain → Current My Domain URL** (e.g., `https://yourorg.my.salesforce.com`)
2. Edit `force-app/main/default/cspTrustedSites/Org_Self.cspTrustedSite-meta.xml`
3. Replace `<endpointUrl>https://placeholder.my.salesforce.com</endpointUrl>` with your org's URL (no trailing slash)
4. Also update `force-app/main/default/remoteSiteSettings/Adaptive_Web_Setup_Server.remoteSite-meta.xml` with the same URL

---

### Issue: Permission set not found during bot user creation

**Error:**
```
Bot user created but permission set assignment failed: 
AgentforceServiceAgentSecureBase (not found in org); 
AgentforceServiceAgentUserPsg (not found in org)
```

**Root Cause:**
Different Salesforce orgs may have different permission set naming conventions:
- **Newer orgs:** `AgentforceServiceAgentSecureBase`, `AgentforceServiceAgentUserPsg`
- **Older orgs:** `CopilotSalesforceUser`, `CopilotSalesforceUserPSG`

**Solution:**
The wizard now automatically tries both naming conventions with fallback logic. This issue should be resolved automatically in the latest code.

**Manual Verification:**
If you still encounter this error, verify the required permission sets exist:
```bash
sf data query -o <your-org> -q "SELECT Name, Label FROM PermissionSet WHERE Name LIKE '%Agentforce%' OR Name LIKE '%Copilot%'"
```

Required permission sets (one naming convention or the other):
- Base: `AgentforceServiceAgentSecureBase` OR `CopilotSalesforceUser`
- User: `AgentforceServiceAgentUserPsg` OR `CopilotSalesforceUserPSG`

---

### Issue: Missing Knowledge__kav errors (main branch only)

**Error:**
```
ApexClass  AnswerQuestionsWithKnowledge  Invalid type: Knowledge__kav
ApexClass  GetKnowledgeCitations          Invalid type: Knowledge__kav
```

**Solution:**
Use the `feature/production-hardening` branch instead of `main`. The Knowledge classes were removed because they're not needed for the personalization flow.

```bash
git checkout feature/production-hardening
```

---

## Quick Deployment Checklist

Before running `sf project deploy start`:

1. ✅ **Org Prerequisites Enabled**
   - Einstein
   - Agentforce
   - Data Cloud
   - Personalization
   - Service Cloud (Messaging)
   - My Domain deployed
   - Experience Cloud (optional, recommended)

2. ✅ **Files Configured**
   - Run `./scripts/configure-org-urls.sh <org-alias>` to auto-configure
   - OR manually update:
     - `Org_Self.cspTrustedSite-meta.xml` - Updated with your My Domain URL
     - `Adaptive_Web_Setup_Server.remoteSite-meta.xml` - Updated with your My Domain URL

3. ✅ **API Version**
   - Package configured for v67.0 (deploys to 262 / v67 and 264 / v68 orgs)

4. ✅ **Clean Org State**
   - No previous bot artifacts with conflicting names

5. ✅ **Deployment Method**
   - Recommended: `--manifest package.xml` (excludes test artifacts)
   - Alternative: `--source-dir force-app` (includes all files)

---

## What's New in Production-Hardening Branch

### Automated Features
- ✅ **Auto-configuration script** - Automatically detects and sets org URLs
- ✅ **Pre-flight checks** - Wizard validates all prerequisites before starting
- ✅ **Base Name input** - Customize artifact names instead of using timestamps
- ✅ **Deployment summary** - Comprehensive summary screen with all created artifacts
- ✅ **Removed test artifacts** - Static bot files no longer deployed

### Improved Error Handling
- ✅ **Permission set fallback** - Supports both Agentforce* and Copilot* naming
- ✅ **Agent type fix** - Reverted to `EinsteinServiceAgent` (`AgentforceServiceAgent` is an invalid enum value and fails validation)
- ✅ **Better error messages** - Clear Setup paths for missing prerequisites

### Documentation
- ✅ **Complete troubleshooting guide** - Common errors and solutions
- ✅ **Prerequisites checklist** - Verify org readiness before deployment
- ✅ **Quick start guide** - Get deployed in 5 commands

---

## Testing the Wizard

After deployment, the wizard will:

1. **Pre-Flight Checks** - Automatically validate all 8 prerequisites
2. **Agent Creation** - Create agent with custom base name
3. **Infrastructure Setup** - Create Web Connector, Queue, Messaging Channel, ESC
4. **Personalization Setup** - Create Transformer and PEC
5. **Deployment Summary** - Show all artifacts with Setup links and CDN snippet

### Expected Timeline
- Pre-deployment (IT Admin): 30-60 minutes
- Deployment: 5 minutes
- Wizard execution: 10-15 minutes
- Post-deployment configuration: 30-60 minutes
- **Total: 75-140 minutes** for complete setup

---

## Verifying Your Deployment (How Do I Know It Worked?)

Once the wizard finishes, it gives you a CDN script snippet on the summary screen. Before you drop that into a real website, confirm the widget can actually connect.

### ⚠️ Known issue: you may need to manually publish the deployment

The wizard reports **"✅ Deployment Published"** and this is *usually* accurate, but it's a known issue that the underlying Messaging for In-App and Web (MIAW) deployment sometimes doesn't finish its own publish step, even though the wizard's API call succeeds. If your widget loads but never responds — check the browser console for an error like:

```
{"message":"The Messaging for In-App and Web deployment isn't published.","errorCode":"SETUP_ERROR"}
```

**Fix:** In Setup, go to **Messaging → [your deployment] → Publish**. Run the publish manually, wait about a minute, and retest. This is a one-time fix per deployment — once published, it stays published. This is a platform-side issue with MIAW, not something the wizard can detect or fix from the outside, so treat manual publish as an expected step for now, not a sign something went wrong.

### Quick local test: `test-app/index.html`

The fastest way to see the widget actually render — no website required — is the test harness at [`../test-app/index.html`](../test-app/index.html) (repo root, one level up from this folder). It's a minimal HTML page that loads the local adaptive web bootstrap (lwc_sdk_output.js) bundle and initializes the widget directly.

To use it after your wizard run:

1. Get the three values from the wizard's **Install Code Snippet**: in the wizard go to **Adaptive Web → Go Live**, open the **Embedded Service Deployment** link, then **Code Snippet → Install Code Snippet**. It shows a JSON object like:

   ```json
   {
     "OrganizationId": "00Dfi800005J4DK",
     "DeveloperName": "AW_1783952022669_ESC",
     "Url": "https://orgfarm-a41bdab53d.test1.my.pc-rnd.salesforce-scrt.com"
   }
   ```

2. Open `test-app/index.html` and update the three hardcoded values in the `window.AdaptiveWebsite.initialize(...)` call to match that snippet:
   - `organizationId` ← `OrganizationId` — the 15-char Org Id, used exactly as shown (the snippet already gives the 15-char form; do **not** pad it to 18)
   - `messagingUrl` ← `Url` — the `.my.salesforce-scrt.com` messaging URL
   - `deploymentDeveloperName` ← `DeveloperName` — the Embedded Service Deployment developer name (the `*_ESC` artifact)
3. Open the file in a browser (e.g. `open test-app/index.html` on macOS, or serve it with any static file server — some browsers block `file://` script loads).
4. If everything is configured correctly, the chat widget should render and respond to messages. If it loads but hangs, see the manual-publish note above.

---

## Post-Deployment Configuration

After the wizard completes:

1. **Copy CDN snippet** - Add to your website's HTML
2. **Load product data** - Import product catalog into Data Cloud (ssot__GoodsProduct__dlm)
3. **Test agent** - Use Messaging Preview to test conversations
4. **Configure topics** - Customize agent topics and actions in Agent Studio
5. **Monitor sessions** - Set up monitoring in Einstein Agent Analytics
