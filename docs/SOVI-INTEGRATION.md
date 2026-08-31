# Sovi integration

## Contract

Implement `SoviAdapter` in `src/lib/sovi/adapter.ts`.

Required methods:

- `discover()`
- `getSystemStatus()`
- `streamConversation()`
- `generateImage()` / `editImage()` / `generateVideo()` / `generateAudio()`
- `speak()`
- `runCapability()` / `runAgent()` / `runWorkflow()`
- `cancelJob()`
- `listArtifacts()` / `listMemories()` / `listProjects()`
- `uploadFile()`

The UI calls these through `src/lib/sovi/store.ts` only.

## How to swap adapters

1. Create `src/lib/sovi/adapters/real.ts` implementing `SoviAdapter`.
2. Map real endpoints inside that file (and server routes if secrets are involved).
3. Select it from `store.ts` init (today: hybrid unless “Force mock”).
4. Keep mock for local demonstration.

Do not call providers from React.

## Current hybrid gateway

Server routes (secrets stay here):

- `POST /api/sovi/chat` — SSE chat
- `POST /api/sovi/image` — image generate/edit
- `POST /api/sovi/tts` — speech
- `GET /api/sovi/status` — whether the gateway is live

Replace these with proxies to the real Sovi orchestration service when it exists.

## Event flow

`adapter.streamConversation` emits normalized events via `onEvent`. The store subscribes through `emitSoviEvent` / `applyEvent`. See `docs/SOVI-EVENT-PROTOCOL.md`.

## Authentication

Assume Sovi is the trusted gateway. When real auth exists, attach session credentials on the adapter’s server side, not in the browser as provider keys.

## Versioning

`sovi.manifest.json` records frontend, schema, event protocol, and adapter versions. Check compatibility before assuming shapes match.
