# Extending capabilities

## Lifecycle

```
NEW CAPABILITY CREATED / INSTALLED
  → Sovi validates it
  → registered
  → discovery exposes it
  → frontend detects it
  → generic UI available immediately
  → user can use it
  → specialized UI may be created later
```

## Add a capability without custom UI

1. Have the adapter return it from `discover()` with `inputSchema` and `ui.renderer: "generic"`.
2. It appears in Capabilities and can be executed.
3. Intent routing may later map phrases onto its `id`.

The System sandbox button **Discover a new capability** demonstrates this at runtime.

## Add an enhanced / native module

1. Keep the capability in the registry.
2. Set `ui.renderer` to `enhanced` or `native`.
3. Add a view only if a generic form is not enough (chat, voice, image workspace, coding).
4. Gate navigation with `ui.nav` + flags derived from availability.

## Do not

- Add a top-level nav item for every new tool
- Hard-code provider buttons
- Require a frontend release before a new tool can be invoked at all

## Frontend recursive evolution (future)

Sovi may later generate specialized components for frequently used generic capabilities. Keep renderers registry-driven so that is possible without a rewrite.
