# Backend discovery

The frontend **must not guess** the real Sovi architecture.

When integrating, inspect the running environment:

- Repositories and directories
- Services and containers
- Ports, HTTP APIs, WebSockets
- Databases and queues
- Model gateways and providers
- Agents, tools, workflows
- Memory and knowledge systems
- Media generation
- File storage
- Authentication
- Automation and monitoring
- Deployment topology
- Any existing frontend/backend interfaces

Conceptual endpoints such as `GET /capabilities` are **examples only**. Map whatever actually exists onto `SoviAdapter.discover()`.

If Sovi already exposes a capability catalog, adapt it into `DiscoverySnapshot`. If it does not, build a thin aggregator — do not invent a second source of truth that fights production.

Write the resulting map into an integration plan before changing stable systems. See `docs/SOVI-INTEGRATOR-INSTRUCTIONS.md`.
