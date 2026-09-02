# Adaptive Web Agent - LWC Version

This is a Lightning Web Components (LWC) version of the Adaptive Web Agent UI, converted from the React-based `app/` implementation.

## Overview

This app uses the open-source [Lightning Web Components](https://lwc.dev/) framework, which allows LWC to run outside of the Salesforce platform. It maintains the same event-driven architecture as the React version and is fully compatible with the controller.

## Structure

```
lwc-app/
├── src/
│   ├── index.js                    # Entry point - creates and mounts the LWC app
│   └── modules/
│       └── c/                      # Custom component namespace
│           ├── app/                # Main app component
│           ├── chatBot/            # Chat interface
│           ├── contentZone/        # Content display area
│           ├── header/             # Header with controls
│           ├── searchBar/          # Initial search interface
│           ├── placeholder/        # Loading placeholder
│           ├── productCard/        # Product card (shared)
│           ├── productStars/       # Star rating (shared)
│           ├── recsTemplate/       # Recommendations template
│           ├── comparisonTemplate/ # Comparison template
│           ├── productDetailsTemplate/ # Product details template
│           └── simpleTemplate/     # Simple text template
├── dist/
│   └── lwc-app.js                  # Built output (IIFE bundle)
├── package.json
├── rollup.config.js                # Rollup config for LWC compilation
└── README.md
```

## Component Mapping (React → LWC)

| React Component | LWC Component |
|-----------------|---------------|
| `App.tsx` | `c-app` |
| `ChatBot.tsx` | `c-chat-bot` |
| `ContentZone.tsx` | `c-content-zone` |
| `Header.tsx` | `c-header` |
| `SearchBar.tsx` | `c-search-bar` |
| `ProductCard.tsx` | `c-product-card` |
| `ProductStars.tsx` | `c-product-stars` |
| `Recs.tsx` | `c-recs-template` |
| `Comparison.tsx` | `c-comparison-template` |
| `ProductDetails.tsx` | `c-product-details-template` |
| `Simple.tsx` | `c-simple-template` |

## Key Differences from React

### State Management
- React: `useState()` hooks
- LWC: `@track` decorator for reactive properties

### Lifecycle
- React: `useEffect()` with cleanup function
- LWC: `connectedCallback()` and `disconnectedCallback()`

### Props
- React: Props passed directly to components
- LWC: `@api` decorator for public properties

### Events
- React: Callback props like `onInitialMessage`
- LWC: `CustomEvent` with `dispatchEvent()`

### Templates
- React: JSX inline with JavaScript
- LWC: Separate `.html` template files with directives (`lwc:if`, `for:each`, etc.)

### CSS
- React: CSS Modules with camelCase
- LWC: Standard CSS with kebab-case, scoped by default

## Installation

```bash
cd lwc-app
npm install
```

## Build

```bash
# Build just the LWC app
npm run build

# Or build the complete SDK output (controller + LWC app)
node ../scripts/create-lwc-output.js
```

### Build Outputs

| Command | Output | Description |
|---------|--------|-------------|
| `npm run build` | `lwc-app/dist/lwc-app.js` | LWC app bundle only (~450KB) |
| `node scripts/create-lwc-output.js` | `dist/lwc-sdk-output.js` | Controller + LWC app with wrapper functions |

## Watch Mode

For development, you can use watch mode to automatically rebuild on changes:

```bash
npm run watch
```

## Usage

### Option 1: Using SDK Output (Recommended for Production)

Run the SDK output script from the repository root:

```bash
node scripts/create-lwc-output.js
```

This creates `dist/lwc-sdk-output.js` which includes both the controller and LWC app. Add this to your sitemap and call the initialization functions:

```javascript
window.addControllerToPage();
window.addAppToPage();
window.AdaptiveWebsite.initialize({
  // configuration options
});
```

### Option 2: Using LWC App Directly

Include the built LWC app along with the controller:

```html
<script src="controller/dist/adaptive-web-controller.js"></script>
<script src="lwc-app/dist/lwc-app.js"></script>
```

The LWC app will automatically append itself to the document body when loaded.

## LWC Template Syntax Notes

When working with LWC templates, be aware of these key differences from React:

1. **No ternary operators in templates** - Use computed properties in JavaScript instead
2. **No comparison operators in templates** - Precompute boolean values like `isFull`, `isHalf`
3. **Event names must be lowercase alphanumeric** - Use `oninitialmessage` not `oninitial-message`
4. **Textarea binding** - Content goes inside tags, not as a `value` attribute

## Notes

- This is an experimental conversion to explore LWC capabilities outside Salesforce
- The controller (`adaptive-web-controller`) remains the same - only the UI layer was converted
- Some LWC features available on the Salesforce platform may not be available in the open-source version
- Built with LWC v8.28.2 and Rollup
