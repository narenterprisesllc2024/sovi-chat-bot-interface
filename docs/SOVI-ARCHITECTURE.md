# Sovi architecture

## Mental model

```
USER
  → SOVI UI (this repository)
    → SoviAdapter (only boundary)
      → orchestration / routing
        → best model + agent + tool + workflow + service
      → events + artifacts
    → USER
```

The human talks to **Sovi**. Providers are infrastructure.

## Layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| UI | `src/components/sovi/*`, `src/routes` | Conversation, workspaces, system |
| State | `src/lib/sovi/store.ts` | Conversations, capabilities, jobs, theme |
| Events | `src/lib/sovi/events.ts` | Normalized stream; no WebSockets in components |
| Adapter | `src/lib/sovi/adapter.ts` | The contract. UI must not skip this. |
| Mock / hybrid | `src/lib/sovi/adapters/` | Demo + optional xAI gateway |
| Gateway routes | `src/routes/api/sovi/*` | Server-only; hold secrets |
| Design tokens | `src/styles.css`, `design/tokens.json` | Living Futurism |

## Ownership

This frontend **does not own**:

- Memory (hook only)
- Authentication secrets / provider keys
- Authoritative file storage
- Model routing internals
- Agent runtimes
- Media generation backends
- Monitoring systems

If those exist in Sovi, **integrate them**. Do not create a competing implementation.

## Recursive expansion

New capability installed → Sovi validates → registry → discovery → generic UI immediately → specialized UI later if usage warrants it.

The frontend is a living representation of Sovi’s current capability surface, not a fixed product list.

## Simple vs power

- Simple: talk to Sovi.
- Power: routing control, activity traces, System view, capability sandbox.

Both live in the same app. Complexity is progressive, not dumped on the home screen.

## Stack note

The original prompt asked for Next.js. This workspace is **TanStack Start**. Keep it unless there is a compelling integration reason to change. The adapter contract is framework-agnostic.
