# Deployment

This app is built with TanStack Start / Vite and is intended to deploy through the workspace’s Vercel pipeline.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run typecheck
```

Do not bind secrets into `VITE_*` variables. `XAI_API_KEY` is server-only.

## Sign-in

The hosted cockpit is **not a public endpoint**. Unsigned visitors see `/login` and cannot call `/api/sovi/chat`, `/image`, `/tts`, or `/status`.

Supported methods (this app’s Better Auth):

- Google
- X
- Email + password

This gate exists so a leaked URL cannot spend the owner’s xAI quota.

When integrating the real self-hosted Sovi OS:

1. Discover how the existing system authenticates (session cookie, SSO, reverse proxy).
2. Map that session in the adapter / a server middleware.
3. Replace `RequireAuth` and `soviUnauthorized()` with the real check.
4. Do not keep two identity systems in production.

Conversations and the chosen mark are stored in `localStorage` keyed by the signed-in user id. They are not a second backend database.

## Health

- `GET /api/sovi/status` — gateway presence (**requires sign-in**)
- System view — adapter, services, capability health, identity

## PWA

Platform PWA injection is enabled. Manifest / apple-touch icon are wired in the document shell. Do not strip the branding injector.

## Environment

| Variable | Client? | Purpose |
| --- | --- | --- |
| `XAI_API_KEY` | no | Optional hybrid gateway for chat / image / TTS |

Never create a `.env` file in this workspace; the platform injects secrets.

## After real integration

Document actual endpoints, auth, and activated capabilities. Keep mock adapter for offline demonstration.
