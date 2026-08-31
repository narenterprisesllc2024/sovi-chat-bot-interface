# Capability contract

Version: `1.0.0` (`sovi.manifest.json` → `capabilityContractVersion`)

A capability is a discoverable unit of what Sovi can currently do. The schema is intentionally loose so future classes still fit.

## Fields

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Stable id, e.g. `media.image.generate` |
| `name` | string | Human label |
| `description` | string | One or two sentences |
| `category` | string | See catalog categories; unknown is valid |
| `type` | string | `native.*` / `enhanced.*` / `generic.*` |
| `enabled` | boolean | Operator switch |
| `available` | boolean | Installed and reachable |
| `status` | enum | `available` `unavailable` `disabled` `degraded` `unknown` `discovering` `error` |
| `health` | enum | `healthy` `degraded` `down` `unknown` |
| `provider` / `model` / `agent` | string | Optional provenance |
| `supportedInputs` / `supportedOutputs` | string[] | `text`, `image`, `file`, … |
| `streaming` `voice` `files` `media` | boolean | Feature hints |
| `inputSchema` / `outputSchema` / `configurationSchema` | JSON Schema | Drives generic UI |
| `ui` | object | `icon`, `accent`, `renderer`, `nav`, `workspace`, `order` |
| `dependencies` | string[] | Other capability ids |
| `metadata` | object | Escape hatch |

A capability that is not installed is **not** an application error. Hide or disable gracefully.

## Flags

`src/lib/sovi/flags.ts` derives `FeatureFlags` from usable capabilities. Override only in the System sandbox.

## UI levels

- `ui.renderer = "generic"` → schema form (`GenericCapability`)
- `"enhanced"` → class-level views (research, agents, media)
- `"native"` → purpose-built (chat, voice, image, coding)

Unknown capabilities should default to generic.
