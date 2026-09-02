# Adaptive Web Agent Component - Controller

This directory contains the controller that manages conversation state and acts as an intermediary between the [React app](../app/) and the Salesforce Messaging API. The controller exposes a public API on `window.AdaptiveWebsite` and communicates with the [React app](../app/) through custom DOM events.

## Overview

The controller is a TypeScript library that:
- Manages conversation state and lifecycle
- Handles authentication (JWT tokens)
- Establishes and maintains Server-Sent Events (SSE) connections
- Provides a public API for the app to interact with conversations
- Dispatches custom DOM events to notify the app of conversation updates

## Architecture

### Communication Pattern

The controller communicates with the app through:

1. **Public API (`window.AdaptiveWebsite`)**: Methods and utilities exposed on the window object
2. **Custom DOM Events**: Events dispatched on the `window` object that the app listens to

The controller does not directly render UI; it only manages state and dispatches events.

### Key Files

- **`index.ts`**: Entry point that exposes the API on `window.AdaptiveWebsite`
- **`src/conversation.ts`**: Main `ConversationController` class that manages conversation state
- **`src/messagingService.ts`**: HTTP client for Messaging API endpoints
- **`src/eventSourceService.ts`**: Manages Server-Sent Events (SSE) connections
- **`src/conversationEntryUtil.ts`**: Utility functions for parsing and validating conversation entries
- **`src/webstorageUtils.ts`**: Manages browser storage (localStorage/sessionStorage)
- **`src/dataProvider.ts`**: Provides access to stored data (JWT, conversation ID, etc.)

## Public API (`window.AdaptiveWebsite`)

The controller exposes the following API on the `window` object:

### Methods

#### `initialize({ organizationId, deploymentDeveloperName, messagingUrl })`
Initializes the controller with organization and deployment configuration. This must be called before any other operations.

**Parameters:**
- `organizationId`: Salesforce organization ID (starts with "00D")
- `deploymentDeveloperName`: Developer name of the Embedded Service Deployment
- `messagingUrl`: Base URL for the Messaging API (e.g., "https://your-instance.salesforce-scrt.com")

**Example:**
```typescript
window.AdaptiveWebsite.initialize({
  organizationId: "00D1234567890ABC",
  deploymentDeveloperName: "MyDeployment",
  messagingUrl: "https://my-instance.salesforce-scrt.com"
});
```

**Behavior:**
- Initializes web storage with the provided configuration
- Dispatches `ON_EMBEDDED_MESSAGING_CONVERSATION_READY` event

#### `initializeConversation(preChatData?)`
Initializes a conversation. If a JWT exists in storage, it resumes the existing conversation; otherwise, it creates a new one.

**Parameters:**
- `preChatData` (optional): Object containing routing attributes to pass to the conversation

**Returns:** `Promise<void>`

**Example:**
```typescript
await window.AdaptiveWebsite.initializeConversation({
  Individual_Id: "user-123",
  Email: "user@example.com"
});
```

**Behavior:**
- If JWT exists: Fetches continuity JWT, lists conversations, loads conversation entries
- If no JWT: Gets unauthenticated access token, creates new conversation
- Subscribes to EventSource (SSE) for real-time updates
- Dispatches `ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED` or `ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED`

#### `sendTextMessage(value: string)`
Sends a text message to the active conversation.

**Parameters:**
- `value`: The message text to send

**Returns:** `Promise<void>`

**Example:**
```typescript
await window.AdaptiveWebsite.sendTextMessage("Hello, I need help");
```

**Behavior:**
- Generates a unique message ID
- Automatically determines `inReplyToMessageId` by finding the last non-end-user message
- Uses stored pre-chat data as routing attributes
- Sends message via Messaging API

#### `startNewConversation(preChatData?)`
Ends the current conversation and starts a new one.

**Parameters:**
- `preChatData` (optional): Object containing routing attributes

**Returns:** `Promise<void>`

**Behavior:**
- Calls `endConversation()` to close the current conversation
- Clears parsed server-sent events
- Creates a new conversation

#### `endConversation()`
Ends the current conversation and cleans up resources.

**Returns:** `Promise<void>`

**Behavior:**
- Closes the conversation via Messaging API
- Calls `cleanupConversation()` to clean up resources

#### `cleanupConversation()`
Cleans up conversation resources.

**Returns:** `Promise<void>`

**Behavior:**
- Closes EventSource connection
- Clears web storage
- Clears in-memory data
- Updates conversation status to CLOSED
- Dispatches `ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED`

#### `sessionExists()`
Checks if a messaging session exists (JWT is stored).

**Returns:** `boolean`

**Example:**
```typescript
if (window.AdaptiveWebsite.sessionExists()) {
  // Resume existing conversation
  await window.AdaptiveWebsite.initializeConversation();
}
```

#### `minimize()`
Minimizes the conversation UI.

**Behavior:**
- Dispatches `ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED` event

#### `maximize()`
Maximizes the conversation UI.

**Behavior:**
- Dispatches `ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED` event

### Events Object (`window.AdaptiveWebsite.Events`)

Contains constants for all event type names:

```typescript
window.AdaptiveWebsite.Events = {
  ON_EMBEDDED_MESSAGE_SENT: "onEmbeddedMessageSent",
  ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED: "onEmbeddedMessagingConversationParticipantChanged",
  ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED: "onEmbeddedMessagingTypingIndicatorStarted",
  ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED: "onEmbeddedMessagingTypingIndicatorStopped",
  ON_EMBEDDED_MESSAGE_READ: "onEmbeddedMessageRead",
  ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED: "onEmbeddedMessagingConversationRouted",
  ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED: "onEmbeddedMessagingContentReceived",
  ON_EMBEDDED_MESSAGING_CONVERSATION_READY: "onEmbeddedMessagingConversationReady",
  ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED: "onEmbeddedMessagingConversationOpened",
  ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED: "onEmbeddedMessagingConversationStarted",
  ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED: "onEmbeddedMessagingConversationClosed",
  ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED: "onEmbeddedMessagingWindowMinimized",
  ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED: "onEmbeddedMessagingWindowMaximized",
  ON_EMBEDDED_MESSAGING_DELIVERED: "onEmbeddedMessagingDelivered",
  ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES: "onEmbeddedMessagingListConversationEntries"
}
```

### Utility Functions (`window.AdaptiveWebsite.util`)

#### `isConversationEntryStaticContentMessage(conversationEntry)`
Type guard that checks if a conversation entry is a static content message.

**Parameters:**
- `conversationEntry`: A `ConversationEntry` object

**Returns:** `boolean` (type predicate: `conversationEntry is ConversationEntryWithStaticContentMessage`)

**Example:**
```typescript
if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry)) {
  // entry is now typed as ConversationEntryWithStaticContentMessage
  const text = entry.entryPayload.abstractMessage.staticContent.text;
}
```

#### `isMessageFromEndUser(conversationEntry)`
Checks if a message was sent by the end user.

**Parameters:**
- `conversationEntry`: A `ConversationEntry` object

**Returns:** `boolean`

**Example:**
```typescript
const isFromUser = window.AdaptiveWebsite.util.isMessageFromEndUser(entry);
```

#### `isTextMessage(conversationEntry)`
Checks if a conversation entry is a text message (static content message with Text format type).

**Parameters:**
- `conversationEntry`: A `ConversationEntry` object

**Returns:** `boolean`

**Example:**
```typescript
const textMessages = entries.filter(window.AdaptiveWebsite.util.isTextMessage);
```

#### `parseEntryPayload(data)`
Parses the entry payload from server-sent event data into a fully typed `ConversationEntry` object.

**Parameters:**
- `data`: The conversation entry data from a server-sent event (has stringified `entryPayload`)

**Returns:** `ConversationEntry`

**Example:**
```typescript
const entry = window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry);
// entry.entryPayload is now a parsed object, not a string
```

## Public Events

The controller dispatches the following custom DOM events on the `window` object:

### `ON_EMBEDDED_MESSAGE_SENT`
Dispatched when a message is sent or received in the conversation.

**Event Detail Type:** `ParsedServerSentEventData`

```typescript
{
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: ConversationEntry; // Note: entryPayload is stringified JSON
}
```

**When Dispatched:**
- When a `CONVERSATION_MESSAGE` server-sent event is received
- After parsing and validating the message

**Note:** The `conversationEntry.entryPayload` in the event detail is a stringified JSON. Use `window.AdaptiveWebsite.util.parseEntryPayload()` to parse it.

### `ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES`
Dispatched when conversation entries are loaded (typically when resuming an existing conversation).

**Event Detail Type:**
```typescript
{
  entries: ConversationEntry[];
}
```

**When Dispatched:**
- After successfully calling `listConversationEntries` API
- When resuming an existing conversation

### `ON_EMBEDDED_MESSAGING_CONVERSATION_READY`
Dispatched when the controller is initialized and ready to handle conversations.

**Event Detail Type:** `{}` (empty object)

**When Dispatched:**
- Immediately after `initialize()` is called

### `ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED`
Dispatched when a conversation is opened (existing conversation resumed or new conversation started).

**Event Detail Type:**
```typescript
{
  conversationId: string;
}
```

**When Dispatched:**
- When conversation status changes to `OPENED_CONVERSATION`
- After resuming an existing conversation
- After creating a new conversation

### `ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED`
Dispatched when a new conversation is started.

**Event Detail Type:**
```typescript
{
  conversationId: string;
}
```

**When Dispatched:**
- After successfully creating a new conversation via `createConversation` API

### `ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED`
Dispatched when a conversation is closed.

**Event Detail Type:** `ParsedServerSentEventData`

**When Dispatched:**
- When a `CONVERSATION_CLOSE_CONVERSATION` server-sent event is received
- When `cleanupConversation()` is called
- When conversation status changes to `CLOSED_CONVERSATION`

### `ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED`
Dispatched when the conversation window should be minimized.

**Event Detail Type:** `{}` (empty object)

**When Dispatched:**
- When `minimize()` is called

### `ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED`
Dispatched when the conversation window should be maximized.

**Event Detail Type:** `{}` (empty object)

**When Dispatched:**
- When `maximize()` is called

### `ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED`
Dispatched when the agent starts typing.

**Event Detail Type:** `ParsedServerSentEventData`

**When Dispatched:**
- When a `CONVERSATION_TYPING_STARTED_INDICATOR` server-sent event is received
- Only if the sender is not the end user
- Only for the current conversation

### `ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED`
Dispatched when the agent stops typing.

**Event Detail Type:** `ParsedServerSentEventData`

**When Dispatched:**
- When a `CONVERSATION_TYPING_STOPPED_INDICATOR` server-sent event is received
- Only for the current conversation

### `ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED`
Dispatched when curated content is received from the agent (e.g., product recommendations, comparisons).

**Event Detail Type:**
```typescript
{
  content: StaticContentMessageTextPayload;
}
```

**StaticContentMessageTextPayload:**
```typescript
{
  text: string;
  curation?: Record<string, unknown>; // Product data, etc.
  template?: string; // Template name: "Recs", "Comparison", "ProductDetails"
  options?: Array<{ name: string }>; // Quick reply options
}
```

**When Dispatched:**
- When a static content message is received with valid JSON in the `text` field
- The JSON is parsed and validated before dispatching

### `ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED`
Dispatched when a conversation is routed to an agent or queue.

**Event Detail Type:** `ParsedServerSentEventData`

**When Dispatched:**
- When a `CONVERSATION_ROUTING_RESULT` server-sent event is received
- For initial routing: dispatched if `failureType` is `NO_ERROR`, `SUBMISSION_ERROR`, `ROUTING_ERROR`, or `UNKNOWN_ERROR`
- For transfer routing: dispatched only if `failureType` is `NO_ERROR`

### `ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED`
Dispatched when a participant joins or leaves the conversation.

**Event Detail Type:** `ParsedServerSentEventData`

**When Dispatched:**
- When a `CONVERSATION_PARTICIPANT_CHANGED` server-sent event is received

### `ON_EMBEDDED_MESSAGE_READ`
Dispatched when a message is read (read acknowledgement).

**Event Detail Type:** `ParsedServerSentEventData`

**When Dispatched:**
- When a `CONVERSATION_READ_ACKNOWLEDGEMENT` server-sent event is received
- Only if `relatedRecords` array exists and has length > 0
- Only for the current conversation

### `ON_EMBEDDED_MESSAGING_DELIVERED`
Dispatched when a message is delivered (delivery acknowledgement).

**Event Detail Type:** `ParsedServerSentEventData`

**When Dispatched:**
- When a `CONVERSATION_DELIVERY_ACKNOWLEDGEMENT` server-sent event is received
- Only if `relatedRecords` array exists and has length > 0
- Only for the current conversation

## Important Code Points

### Conversation Lifecycle

The controller manages conversation state through the following statuses:

- `NOT_STARTED_CONVERSATION`: Initial state, no conversation active
- `OPENED_CONVERSATION`: Conversation is active (new or resumed)
- `CLOSED_CONVERSATION`: Conversation has been closed

### Server-Sent Events (SSE)

The controller establishes an EventSource connection to receive real-time updates:

- **Endpoint:** `{messagingUrl}/eventrouter/v1/sse?_ts={timestamp}`
- **Authentication:** Uses JWT from storage in `Authorization: Bearer {jwt}` header
- **Event Types Handled:**
  - `CONVERSATION_MESSAGE`
  - `CONVERSATION_ROUTING_RESULT`
  - `CONVERSATION_PARTICIPANT_CHANGED`
  - `CONVERSATION_TYPING_STARTED_INDICATOR`
  - `CONVERSATION_TYPING_STOPPED_INDICATOR`
  - `CONVERSATION_DELIVERY_ACKNOWLEDGEMENT`
  - `CONVERSATION_READ_ACKNOWLEDGEMENT`
  - `CONVERSATION_CLOSE_CONVERSATION`

### Web Storage

The controller uses browser storage (sessionStorage by default, localStorage disabled) to persist:

- JWT (access token)
- Conversation ID
- Last Event ID (for SSE resumption)
- Organization ID
- Deployment Developer Name
- Messaging URL
- Deployment Configuration

**Storage Key Format:** `ADAPTIVE_WEBSITE_{organizationId}_{deploymentDeveloperName}`

### Pre-Chat Data

Pre-chat data (routing attributes) can be passed when initializing or starting conversations. This data is:

- Stored in memory during the conversation
- Used as routing attributes when sending messages
- Passed to the `createConversation` API

**Example:**
```typescript
await window.AdaptiveWebsite.initializeConversation({
  Individual_Id: "user-123",
  Email: "user@example.com",
  Custom_Field__c: "value"
});
```

### Message Threading

When sending a text message, the controller automatically determines the `inReplyToMessageId` by:

1. Iterating through parsed server-sent events in reverse order
2. Finding the last message that is NOT from the end user
3. Using that message's identifier as the reply target

This maintains message threading in the conversation.

### Error Handling

The controller uses custom error types:

- `ConversationConfigurationError`: Configuration or state errors
- `ValidationError`: Data validation errors
- `HttpError`: HTTP request errors

Errors are logged and may trigger cleanup operations (e.g., closing EventSource, clearing storage).

## Data Structures

### ConversationEntry

```typescript
interface ConversationEntry {
  conversationId: string;
  entryType: EntryType; // "Message" | "ParticipantChanged" | "RoutingResult"
  entryPayload: EntryPayload; // Varies by entryType
  transcriptedTimestamp: number;
  sender: {
    role: ParticipantRole; // "EndUser" | "Agent" | "Chatbot" | "System" | "Router" | "Supervisor"
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

### ParsedServerSentEventData

```typescript
interface ParsedServerSentEventData {
  channelPlatformKey: string;
  channelType: string;
  channelAddressIdentifier: string;
  conversationId: string;
  conversationEntry: Omit<ConversationEntry, 'entryPayload'> & { 
    entryPayload: string; // Stringified JSON
  };
}
```

## API Endpoints Used

The controller makes HTTP requests to the following Messaging API endpoints:

- `POST {messagingUrl}/v1/access-tokens/unauthenticated` - Get unauthenticated access token
- `POST {messagingUrl}/v1/access-tokens/continuity` - Get continuity access token
- `POST {messagingUrl}/v1/conversations` - Create new conversation
- `GET {messagingUrl}/v1/conversations` - List conversations
- `GET {messagingUrl}/v1/conversations/{conversationId}/entries` - List conversation entries
- `POST {messagingUrl}/v1/conversations/{conversationId}/messages` - Send text message
- `POST {messagingUrl}/v1/conversations/{conversationId}/messages/choices` - Send choices response
- `DELETE {messagingUrl}/v1/conversations/{conversationId}` - Close conversation
- `GET {messagingUrl}/eventrouter/v1/sse` - Server-Sent Events stream

All requests include the JWT in the `Authorization: Bearer {jwt}` header (except unauthenticated access token request).

## Building and Running

### Prerequisites

Install dependencies:

```sh
npm install
```

### Building

Build the controller library:

```sh
npm run build
```

This will:
- Compile TypeScript
- Bundle the controller using Vite/Rollup
- Output files to `dist/`:
  - `adaptive-web-controller.js` - The bundled controller library
  - `index.d.ts` - TypeScript type definitions
  - Additional type definition files in `dist/src/`

The controller can also be packaged as an npm package (`.tgz` file) for use as a dependency by the app.

### Creating SDK Output

To create the combined SDK output file (which includes both app and controller), run from the repository root:

```sh
node scripts/create-sdk-output.js
```

This will build both the app and controller, then combine them into `dist/sdk-output.js` at the repository root.

