# Manual Setup & UI Customization

> **Most people don't need this doc.** If you're setting up Adaptive Web in a Salesforce org, use the guided wizard instead — see [`adaptive-web-easy-setup/`](../adaptive-web-easy-setup/README.md). It automates everything on this page.
>
> This doc is for developers **customizing the UI** (forking the React or LWC app) or wiring Adaptive Web into a sitemap by hand instead of through the wizard.

## When you'd use this

- You're changing the chat UI, content templates, or event handling in `/app` or `/lwc-app`, and need to rebuild the SDK output yourself.
- You're integrating Adaptive Web into a Web Personalization Manager (WPM) sitemap manually, outside the wizard's automated flow.

If neither applies, stop here and go run the wizard.

## Building the SDK output

The wizard ships a prebuilt LWC SDK bundle, so out-of-the-box customers never run these build scripts. You only need this section if you've modified `/app`, `/lwc-app`, or `/controller` and need to regenerate the bundle.

### Setup

**For the React app:**

The controller must be built first, as the React app depends on it as a local tarball.

```sh
# 1. Install and build the controller first
cd controller
npm install
npm run build
npm pack

# 2. Then install React app dependencies
cd ../app
npm install
```

> **Note:** If you encounter integrity/checksum errors when installing the app (e.g., after rebuilding the controller), delete `app/node_modules` and `app/package-lock.json`, then run `npm install` again.

**For the LWC app:**

The LWC app is standalone and doesn't require the controller tarball.

```sh
# 1. Build the controller
cd controller
npm install
npm run build

# 2. Install LWC app dependencies
cd ../lwc-app
npm install
```

### Build commands

Each package has its own build process. See the individual READMEs for details:
- [app/README.md](../app/README.md#building-and-running) — React app build instructions
- [lwc-app/README.md](../lwc-app/README.md) — LWC app build instructions
- [controller/README.md](../controller/README.md#building-and-running) — Controller build instructions

```bash
# Build React SDK output (controller + React app)
node scripts/create-sdk-output.js

# Build LWC SDK output (controller + LWC app)
node scripts/create-lwc-output.js
```

### Creating SDK output

Two output scripts are available depending on which UI implementation you want to use:

| Script | UI Framework | Output File | Description |
|--------|--------------|-------------|-------------|
| `scripts/create-sdk-output.js` | React | `dist/sdk-output.js` | React-based UI |
| `scripts/create-lwc-output.js` | LWC | `dist/lwc-sdk-output.js` | Lightning Web Components UI (the default/supported path — this is what the wizard deploys) |

**React SDK output** — `scripts/create-sdk-output.js` combines the React app and controller:
1. Builds the controller (runs `npm run build` in the `controller` directory)
2. Packs the controller (runs `npm pack` in the `controller` directory to create a tarball)
3. Updates the app's controller dependency (runs `npm update adaptive-web-controller` in the `app` directory)
4. Builds the app (runs `npm run build` in the `app` directory)
5. Combines both outputs into `dist/sdk-output.js`

```bash
node scripts/create-sdk-output.js
```

**LWC SDK output** — `scripts/create-lwc-output.js` combines the LWC app and controller:
1. Builds the controller (runs `npm run build` in the `controller` directory)
2. Installs LWC app dependencies if needed
3. Builds the LWC app (runs `npm run build` in the `lwc-app` directory)
4. Combines both outputs into `dist/lwc-sdk-output.js`

```bash
node scripts/create-lwc-output.js
```

### Output format

Both scripts generate a file containing two functions:

```javascript
function addControllerToPage() {
  // Contents of build file (controller/adaptive-web-controller.js)
  // [entire minified controller code here]
}

function addAppToPage() {
  // Contents of build file (app or lwc-app output)
  // [entire minified UI app code here]
}
```

**Note:** The scripts automatically build all required packages. Ensure the relevant directories have their dependencies installed before running:
- For React: `app` and `controller` directories
- For LWC: `lwc-app` and `controller` directories

Add the contents of the output file to the end of your sitemap.

## Wiring into a sitemap by hand

The wizard does the three steps below for you automatically. Only follow them if you're integrating outside the wizard (e.g., a hand-maintained sitemap that a WPM expert manages directly).

### 1. Add the transformer to the sitemap

Add a transformer that stores attributes in session storage and calls the functions from the SDK output above. Example:

```javascript
          {
            name: "SearchComponent",
            transformerType: "AgentScript",
            transformerCategory: "Agent",
            substitutionDefinitions: {
              OrganizationId: {
                defaultValue: '[attributes].[orgId]'
              },
              DeploymentDevName: {
                defaultValue: '[attributes].[deploymentDevName]'
              },
              MessagingURL: {
                defaultValue: '[attributes].[messagingURL]'
              },
              PecName: {
                defaultValue: '[attributes].[pecName]'
              }
            },
            transformerTypeDetails: {
              script: `
                if (window.sessionStorage.getItem("SEARCH_COMPONENT_WEB_STORAGE_{{subVar 'OrganizationId'}}") == null) {
                  window.sessionStorage.setItem("SEARCH_COMPONENT_WEB_STORAGE_{{subVar 'OrganizationId'}}", JSON.stringify({
                      ORGANIZATION_ID: "{{subVar 'OrganizationId'}}",
                      MESSAGING_URL: "{{subVar 'MessagingURL'}}",
                      DEPLOYMENT_DEVELOPER_NAME: "{{subVar 'DeploymentDevName'}}",
                      PEC_NAME: "{{subVar 'PecName'}}"
                  }))
              }
              window.addControllerToPage()
              window.addAppToPage()
              `
            },
            isEnabled: true
          }
```

### 2. Add a Personalization Point

Create a personalization point in the org using the `NGSC_Template` response template.

### 3. Add the PEC to the sitemap

Create a Personalization Experience Config (PEC) in the sitemap similar to the one below:

```javascript
          {
            name: "SearchComponent",
            dataProvider: {
              "type": "PersonalizationPoint",
              "referenceType": "ApiName",
              "value": "NG_Search_Component"
            },
            sourceMatchers: [
              {
                type: "PageType",
                value: "default"
              }
            ],
            transformationConfig: {
              when: "Immediately",
              transformations: [
                {
                  transformerName: "SearchComponent",
                }
              ]
            },
            lastModifiedDate: 1727893596990
          }
```
