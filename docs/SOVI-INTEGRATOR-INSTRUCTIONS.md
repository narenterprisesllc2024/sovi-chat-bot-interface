# Sovi integrator instructions

You are connecting this frontend to an **existing** Sovi system.

## Do not

- Rebuild systems that already exist.
- Replace stable working backend architecture merely because this mock looks different.
- Assume this documentation perfectly reflects the running system.
- Recreate memory, workflows, databases, file storage, media generation, model routing, monitoring, automation, or knowledge retrieval if Sovi already has them.
- Recreate authentication if Sovi already has a session. This cockpit currently ships a URL gate (Google / X / email) so a public link cannot spend gateway usage. Map the real session and retire the gate.
- Expose capabilities that have not been connected and validated.
- Put provider API keys in frontend code.

## Do

1. Inspect this frontend repository.
2. Inspect the actual running Sovi system.
3. Discover what already exists.
4. Reuse existing architecture whenever practical.
5. Prefer thin adapters over backend rewrites.
6. Preserve existing working functionality.
7. Integrate incrementally.
8. Test everything.
9. Only expose capabilities that actually work.

## Required workflow

### Phase 1 — Frontend audit

Read:

- `README.md`
- `sovi.manifest.json`
- `docs/SOVI-ARCHITECTURE.md`
- `src/lib/sovi/adapter.ts` (the contract)
- `src/lib/sovi/types.ts`
- `src/lib/sovi/catalog.ts`
- `src/lib/sovi/events.ts`
- `src/lib/sovi/adapters/mock.ts` and `hybrid.ts`
- `src/lib/sovi/store.ts`

Understand the integration contract before changing code.

### Phase 2 — Real Sovi system audit

Inspect the running environment: repos, directories, services, containers, ports, APIs, WebSockets, databases, queues, model gateways, providers, agents, tools, workflows, memory, knowledge, media, files, auth, automation, monitoring, deployment, existing frontends.

Verify the running system. Do not rely only on old docs.

### Phase 3 — Capability inventory

Classify each capability: `AVAILABLE` | `PARTIAL` | `UNAVAILABLE` | `BROKEN` | `UNKNOWN` | `DUPLICATE` | `DEPRECATED`.

Do not assume that because the mock UI supports something, Sovi currently does. Do not assume the frontend knows every capability Sovi already has.

### Phase 4 — Gap analysis

Compare frontend expectations vs actual Sovi capabilities. Identify direct matches, adapters needed, frontend extensions, duplicates, missing pieces, and mock-only features.

### Phase 5 — Capability mapping

Produce a map:

| Frontend capability | Existing Sovi service | Integration method | Adapter required? | Status | Validation |
| --- | --- | --- | --- | --- | --- |
| Chat streaming | Orchestration service | WebSocket / SSE adapter | Yes | AVAILABLE | PASSED |
| Image generation | Media service | REST adapter | Yes | AVAILABLE | PASSED |
| Video generation | (none verified) | — | N/A | UNAVAILABLE | NOT EXPOSED |

### Integration plan (before changing the real system)

Identify what will be reused, which adapters, which frontend modules, which backend changes are genuinely required, risks, dependencies, rollback, and tests. Prefer minimal changes to stable systems.

### Adapter implementation

Replace mock services **one capability class at a time**:

conversation → files → memory → tools → agents → media → workflows → advanced

After each: **build, test, verify, document, then continue.**

### Capability registration

Only capabilities that have been successfully connected and validated should be marked `available`. The registry is the authority for what the UI exposes.

### UI activation

```
CAPABILITY REGISTRY → DISCOVERY → UI → GENERIC / ENHANCED / NATIVE → USER
```

### End-to-end validation

User request → frontend → Sovi router → model/agent/tool/workflow → streaming events → result → artifact → UI → completion → logging.

Validate failures and cancellations too.

### Post-integration documentation

Update docs to describe the system **as it actually exists**: services connected, adapters, endpoints, event sources, auth, env vars, activated/unavailable capabilities, limitations, deprecated pieces, future opportunities.
