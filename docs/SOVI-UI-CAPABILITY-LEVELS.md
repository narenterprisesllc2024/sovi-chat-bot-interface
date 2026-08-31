# UI capability levels

Not every new capability should wait on custom frontend work.

## Level 1 — Generic

Driven by metadata + JSON Schema.

- Name, description, category, status
- Generated inputs
- Execute, progress, output, errors

Implementation: `src/components/sovi/generic-capability.tsx`

## Level 2 — Enhanced

Reusable specialized interfaces for common classes:

- Research (answer + sources + activity)
- Agents (task, status, subtasks)
- Workflows
- Files / documents
- Image / audio / video jobs
- Automations
- Memory hooks

## Level 3 — Native

Purpose-built:

- Conversation
- Voice mode (horizon waveform, not an orb)
- Image create/edit
- Coding / artifact workspace
- System operations

## Mapping

`capability.ui.renderer` selects the level. Unknown defaults to generic.

Conversation remains the center. Specialized workspaces appear **in context** of the active task and artifact, then recede.
