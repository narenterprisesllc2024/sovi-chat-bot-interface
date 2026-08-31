# Event protocol

Version: `1.0.0`

All streaming and system activity is normalized before it reaches UI components.

## Envelope

```ts
{
  id: string
  type: SoviEventType
  ts: number
  conversationId?: string
  messageId?: string
  requestId?: string
  payload: Record<string, unknown>
}
```

## Types

| Type | Payload (typical) |
| --- | --- |
| `message.started` | `{}` |
| `message.delta` | `{ text }` |
| `message.completed` | `{ text?, cancelled? }` |
| `tool.started` | `{ activity }` |
| `tool.progress` | `{ activityId, progress, detail }` |
| `tool.completed` | `{ activityId, state }` |
| `agent.started` / `progress` / `completed` | same shape as tools |
| `workflow.started` / `progress` / `completed` | same |
| `artifact.created` | `{ artifact }` |
| `generation.started` / `progress` / `completed` | `{ job }` |
| `citation.added` | `{ citation }` |
| `memory.retrieved` | `{ title, content }` |
| `capability.registered` / `updated` / `removed` | `{ id }` or `{ capability }` |
| `system.status` | `{ usage? }` |
| `error` | `{ error }` |

## Rules

- Do not parse provider-specific SSE in React.
- The adapter translates backend events into this protocol.
- Components render `Message.activities`, `artifacts`, `jobs`, `citations` — they do not subscribe to transport.
- Activity is collapsible. Normal users can ignore the trace.

Hybrid chat currently maps xAI SSE `delta.content` → `message.delta` in `src/routes/api/sovi/chat.ts`.
