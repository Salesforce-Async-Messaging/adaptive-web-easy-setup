# Adaptive Web Agent Component - App

This directory contains the React application that provides the user interface for the Adaptive Web Agent component. The app communicates with the controller through custom DOM events and uses the public `window.AdaptiveWebsite` API to interact with the conversation system.

## Overview

The app is a React application that renders a chat interface and content zone. It listens to events dispatched by the controller and updates the UI accordingly. The app does not directly interact with the messaging API; instead, it uses the controller as an intermediary.

## Architecture

### Communication Pattern

The app communicates with the controller through:

1. **Custom DOM Events**: The controller dispatches custom events on the `window` object. The app listens to these events to update its state and UI.

2. **Public API (`window.AdaptiveWebsite`)**: The app calls methods on `window.AdaptiveWebsite` to send messages, initialize conversations, and control the UI.

### Key Components

- **`App.tsx`**: Main application component that manages conversation state and coordinates between components
- **`ChatBot.tsx`**: Renders the chat interface with message history and input
- **`ContentZone.tsx`**: Displays curated content (product recommendations, comparisons, etc.) based on agent responses
- **`Header.tsx`**: Header component with minimize/maximize controls
- **`SearchBar.tsx`**: Search bar component for initial user input

## Public API Usage

The app uses the following public API from `window.AdaptiveWebsite`:

### Methods

#### `initialize({ organizationId, deploymentDeveloperName, messagingUrl })`
Initializes the controller with organization and deployment configuration. This must be called before any other operations.

#### `initializeConversation(preChatData?)`
Initializes a conversation (new or existing). If a session exists, it resumes the existing conversation; otherwise, it creates a new one.

**Parameters:**
- `preChatData` (optional): Object containing routing attributes (e.g., `{ Individual_Id: "anonymous-id" }`)

**Example:**
```typescript
window.AdaptiveWebsite.initializeConversation({ Individual_Id: "user-123" });
```

#### `sendTextMessage(value: string)`
Sends a text message to the conversation.

**Parameters:**
- `value`: The message text to send

**Example:**
```typescript
window.AdaptiveWebsite.sendTextMessage("I am looking for a new pair of boots");
```

#### `minimize()`
Minimizes the conversation UI. Dispatches `ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED` event.

#### `maximize()`
Maximizes the conversation UI. Dispatches `ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED` event.

#### `sessionExists()`
Returns `true` if a messaging session exists (JWT is stored), `false` otherwise.

#### `startNewConversation(preChatData?)`
Ends the current conversation and starts a new one.

**Parameters:**
- `preChatData` (optional): Object containing routing attributes

#### `endConversation()`
Ends the current conversation and cleans up resources.

#### `cleanupConversation()`
Cleans up conversation resources (closes EventSource, clears storage).

### Utility Functions (`window.AdaptiveWebsite.util`)

#### `isConversationEntryStaticContentMessage(conversationEntry)`
Type guard that checks if a conversation entry is a static content message.

**Returns:** `boolean` (type predicate)

#### `isMessageFromEndUser(conversationEntry)`
Checks if a message was sent by the end user.

**Returns:** `boolean`

#### `isTextMessage(conversationEntry)`
Checks if a conversation entry is a text message.

**Returns:** `boolean`

#### `parseEntryPayload(data)`
Parses the entry payload from server-sent event data into a `ConversationEntry` object.

**Parameters:**
- `data`: The conversation entry data from a server-sent event

**Returns:** `ConversationEntry`

## Public Events

The app listens to the following custom DOM events dispatched by the controller:

### `ON_EMBEDDED_MESSAGE_SENT`
Dispatched when a message is sent or received in the conversation.

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry; // Stringified JSON that needs parsing
}
```

**Usage in App:**
```typescript
window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, (event) => {
  const entry = window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry);
  // Update UI with new message
});
```

### `ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES`
Dispatched when conversation entries are loaded (e.g., when resuming an existing conversation).

**Event Detail:**
```typescript
{
  entries: ConversationEntry[];
}
```

**Usage in App:**
```typescript
window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, (event) => {
  const messages = event.detail.entries.filter(
    window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage
  );
  // Display conversation history
});
```

### `ON_EMBEDDED_MESSAGING_CONVERSATION_READY`
Dispatched when the controller is initialized and ready to handle conversations.

**Event Detail:** `{}` (empty object)

**Usage in App:**
```typescript
window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, () => {
  // Controller is ready, can now initialize conversation if session exists
  if (window.AdaptiveWebsite.sessionExists()) {
    window.AdaptiveWebsite.initializeConversation(preChatData);
  }
});
```

### `ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED`
Dispatched when a conversation is opened (existing conversation resumed or new conversation started).

**Event Detail:**
```typescript
{
  conversationId: string;
}
```

### `ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED`
Dispatched when a new conversation is started.

**Event Detail:**
```typescript
{
  conversationId: string;
}
```

### `ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED`
Dispatched when a conversation is closed.

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry;
}
```

### `ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED`
Dispatched when the conversation window is minimized.

**Event Detail:** `{}` (empty object)

### `ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED`
Dispatched when the conversation window is maximized.

**Event Detail:** `{}` (empty object)

### `ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED`
Dispatched when the agent starts typing.

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry;
}
```

### `ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED`
Dispatched when the agent stops typing.

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry;
}
```

### `ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED`
Dispatched when curated content is received from the agent (e.g., product recommendations).

**Event Detail:**
```typescript
{
  content: StaticContentMessageTextPayload;
}
```

**StaticContentMessageTextPayload:**
```typescript
{
  text: string;
  curation?: Record<string, unknown>;
  template?: string; // e.g., "Recs", "Comparison", "ProductDetails"
  options?: Array<{ name: string }>;
}
```

**Usage in App:**
```typescript
window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, (event) => {
  const content = event.detail.content;
  if (content.template === 'Recs') {
    // Render product recommendations
  } else if (content.template === 'Comparison') {
    // Render product comparison
  } else if (content.template === 'ProductDetails') {
    // Render product details
  }
});
```

### `ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED`
Dispatched when a conversation is routed to an agent or queue.

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry;
}
```

### `ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED`
Dispatched when a participant joins or leaves the conversation.

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry;
}
```

### `ON_EMBEDDED_MESSAGE_READ`
Dispatched when a message is read (read acknowledgement).

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry;
}
```

### `ON_EMBEDDED_MESSAGING_DELIVERED`
Dispatched when a message is delivered (delivery acknowledgement).

**Event Detail:**
```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry;
}
```

## Important Code Points

### Event Registration

The app registers event listeners in `App.tsx` using `useEffect`:

```typescript
useEffect(() => {
  window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
  // ... other event listeners
  
  return () => {
    // Cleanup: remove all event listeners
    window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
    // ... cleanup other listeners
  };
}, []);
```

### Message Parsing

When receiving messages, the app parses the entry payload:

```typescript
const handleMessageReceived = (event) => {
  const entry = window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry);
  // entry is now a fully parsed ConversationEntry object
};
```

### Pre-Chat Data

The app can pass pre-chat data (routing attributes) when initializing conversations. This is typically used to pass user identification or other context:

```typescript
const getPreChatData = () => {
  const anonymousId = window.getSalesforceInteractions()?.getAnonymousId();
  const preChatData: Record<string, string> = {};
  if (anonymousId && typeof anonymousId === 'string') {
    preChatData['Individual_Id'] = anonymousId;
  }
  return preChatData;
};
```

### Content Zone Templates

The `ContentZone` component renders different templates based on the `template` property in the received content:

- **`Recs`**: Product recommendations
- **`Comparison`**: Product comparison
- **`ProductDetails`**: Product details

These templates receive a `StaticContentMessageTextPayload` object with `text`, `curation`, and `template` properties.

### Engagement Events

The app includes engagement event tracking (in `helpers/engagementEvents.ts`) that sends events to Salesforce Data Cloud. This is registered in `App.tsx`:

```typescript
registerEngagementEventListeners();
```

The engagement events track:
- Conversation started
- Conversation closed
- Conversation ready
- Message sent
- Conversation routed

## Data Structures

### ConversationEntry

```typescript
interface ConversationEntry {
  conversationId: string;
  entryType: EntryType; // "Message" | "ParticipantChanged" | "RoutingResult"
  entryPayload: EntryPayload; // Varies by entryType
  transcriptedTimestamp: number;
  sender: {
    role: ParticipantRole; // "EndUser" | "Agent" | "Chatbot" | "System"
    subject: string;
  };
  clientTimestamp: number;
  identifier: string;
  senderDisplayName: string;
  actorType: ParticipantRole;
  actorName: string;
  isSent?: boolean;
  isDelivered?: boolean;
  deliveryAcknowledgementTimestamp?: number;
  isRead?: boolean;
  readAcknowledgementTimestamp?: number;
  relatedRecords?: string[];
}
```

### StaticContentMessageTextPayload

```typescript
interface StaticContentMessageTextPayload {
  text: string;
  curation?: Record<string, unknown>; // Product data, etc.
  template?: string; // Template name for rendering
  options?: Array<{ name: string }>; // Quick reply options
}
```

## Building and Running

### Prerequisites

Install dependencies:

```sh
npm install
```

### Building

Build the app for production:

```sh
npm run build
```

This will:
- Compile TypeScript
- Bundle the React application using Vite
- Output a minified file to `dist/app.js`

### Development

Run the development server:

```sh
npm run dev
```

This starts a Vite development server with hot module replacement.

### Linting

Run ESLint to check for code issues:

```sh
npm run lint
```

This project is configured to use [ESLint](https://eslint.org/) with recommended defaults for TypeScript. If you are using IntelliJ you can [configure ESLint](https://www.jetbrains.com/help/idea/eslint.html#ws_js_eslint_manual_configuration) for your project.

### Creating SDK Output

To create the combined SDK output file (which includes both app and controller), run from the repository root:

```sh
node scripts/create-sdk-output.js
```

This will build both the app and controller, then combine them into `dist/sdk-output.js` at the repository root.

