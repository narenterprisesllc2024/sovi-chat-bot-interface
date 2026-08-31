# Sovi Unified Interface

Sovi is a **personal AI operating system**. This repository is the human-facing cockpit — not a chatbot clone, not a provider dashboard, and not a replacement for the Sovi backend that already exists.

Talk to Sovi. Sovi decides how to handle the request. Models, agents, tools, workflows, and media systems sit underneath that abstraction.

**This entire folder is what you push to GitHub.** The README, `docs/`, `sovi.manifest.json`, and source all travel together so another coding agent can connect the cockpit to your real system.

## What this is

- A production-quality frontend for an evolving, self-hosted personal AI OS
- An **adapter-first** integration layer so another coding agent can map the real Sovi backend without rewriting the UI
- A **capability registry** so the interface discovers what Sovi can do and adapts
- Three UI levels: generic (schema-driven), enhanced (class-level), native (purpose-built)
- Conversation at the center, with progressive disclosure into artifacts, agents, research, media, and system operations
- **Sign-in** so a public URL cannot spend your gateway usage

## What this is not

- Not a marketing site or static mockup
- Not a recreation of Sovi’s memory, files, media, routing, or databases
- Not a giant grid of provider buttons
- Not Next.js — this workspace ships **TanStack Start** (React + Vite). The architecture is portable; do not rewrite the stack just to match an old prompt.

## Sign-in (the URL is not public)

Anyone with the link used to be able to talk to Sovi and spend the xAI gateway. That is no longer true.

- Google, X, or **email + password**
- All chat / image / speech API routes reject unsigned callers
- Conversations and identity are stored per signed-in user in the browser
- Sign out lives in the sidebar

When you later connect the **real** Sovi backend, replace this cockpit gate with your existing session — do not run two identity systems. See `docs/SOVI-DEPLOYMENT.md` and `docs/SOVI-INTEGRATOR-INSTRUCTIONS.md`.

## Identity

The mark is a **horizon + rising point**, not an orb. Change it in **System → Identity**:

- Dawn (default) — cyan horizon, amber point (vector chrome)
- Horizon — quiet single-color chrome
- Crest — rendered sculptural emblem
- Your mark — upload SVG, PNG, or JPEG

Built-in art lives in `public/brand/` and `public/favicon.svg`.

## Run

```bash
npm install
npm run dev
```

Open the app, sign in, talk to Sovi.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript |

Mock mode always works. If a server-side xAI key is present, the **hybrid adapter** uses it for chat, images, and speech through the Sovi gateway — still never from the browser.

## Mock vs hybrid vs real

| Adapter | When | What |
| --- | --- | --- |
| `mock` | No gateway, or System → Force mock | Full simulated OS: streaming, tools, agents, jobs, artifacts |
| `hybrid` | Default when a server key exists | Real chat/image/TTS via Sovi API routes; agents/workflows/memory still mocked until mapped |
| `real` | After integration | Thin adapters over existing Sovi services |

Switch in **System → Force mock adapter**.

The UI never calls OpenAI, Anthropic, xAI, or local models directly. It talks to `SoviAdapter` (`src/lib/sovi/adapter.ts`).

## Architecture (short)

```
USER → sign-in → SOVI UI → SoviAdapter → (mock | hybrid | real backend)
                                       → events → capability registry → UI
```

- Types: `src/lib/sovi/types.ts`
- Catalog (discovered capabilities): `src/lib/sovi/catalog.ts`
- Events: `src/lib/sovi/events.ts`
- Feature flags: derived from discovery in `src/lib/sovi/flags.ts`
- Store: `src/lib/sovi/store.ts`

Do **not** scatter fetch/WebSocket calls through components.

## Capability discovery

The adapter returns a snapshot of capabilities, providers, models, agents, tools, workflows, and flags.

- Available capabilities appear in nav, suggestions, and routing
- Unavailable/disabled capabilities do not show broken UI
- A capability with only a JSON schema gets the **generic renderer** immediately
- System sandbox can hide/show capabilities so you can watch the UI adapt

## Documentation index (this is the GitHub handoff)

| Doc | For |
| --- | --- |
| [docs/SOVI-ARCHITECTURE.md](docs/SOVI-ARCHITECTURE.md) | Layers, ownership, what not to rebuild |
| [docs/SOVI-INTEGRATION.md](docs/SOVI-INTEGRATION.md) | Adapter mapping |
| [docs/SOVI-CAPABILITY-CONTRACT.md](docs/SOVI-CAPABILITY-CONTRACT.md) | Registry schema |
| [docs/SOVI-EVENT-PROTOCOL.md](docs/SOVI-EVENT-PROTOCOL.md) | Streaming events |
| [docs/SOVI-BACKEND-DISCOVERY.md](docs/SOVI-BACKEND-DISCOVERY.md) | How to inspect the real system |
| [docs/SOVI-INTEGRATOR-INSTRUCTIONS.md](docs/SOVI-INTEGRATOR-INSTRUCTIONS.md) | **Read this first if you are an AI integrator** |
| [docs/SOVI-EXTENDING-CAPABILITIES.md](docs/SOVI-EXTENDING-CAPABILITIES.md) | Adding capabilities |
| [docs/SOVI-UI-CAPABILITY-LEVELS.md](docs/SOVI-UI-CAPABILITY-LEVELS.md) | Generic / enhanced / native |
| [docs/SOVI-DEPLOYMENT.md](docs/SOVI-DEPLOYMENT.md) | Deploy, auth, secrets |
| [docs/SOVI-DESIGN-SYSTEM.md](docs/SOVI-DESIGN-SYSTEM.md) | Visual language |
| [sovi.manifest.json](sovi.manifest.json) | Machine-readable contract |
| [design/tokens.json](design/tokens.json) | Machine-readable tokens |

Internal component lab: `/dev/design-system` (not in product nav; still signed-in).

## Instructions for AI coding agents

1. Read `sovi.manifest.json`, then `docs/SOVI-INTEGRATOR-INSTRUCTIONS.md`.
2. **Do not rebuild systems that already exist** in the running Sovi environment.
3. Prefer thin adapters over backend rewrites.
4. Only mark a capability `available` after it is connected and validated.
5. Integrate incrementally: conversation → files → memory → tools → agents → media → workflows.
6. If Sovi already has authentication, map it and retire this cockpit’s sign-in gate.

## Security boundary

Provider API keys never belong in the client. Sovi is the trusted gateway. This frontend assumes that. Sign-in is required before the gateway is used.

## Personality

Sovi should feel like a capable partner in exploration and creation — simple enough to talk to, powerful enough to run an OS, warm enough to feel personal.
