# Sovi design system — Living Futurism

Sovi should feel like technology from a hopeful future that has become ordinary: calm computational precision + warmth + craftsmanship. Quietly extraordinary.

## Not this

- Neon cyberpunk / Matrix / endless black glass dashboards
- Purple AI gradients, glowing orbs, robot mascots
- Literal LCARS / Star Trek cosplay
- Literal solarpunk leaves
- Enterprise sterile, crypto, gamer chrome
- A mashup of ChatGPT + Claude + Figma visible at once

## Yes this

- ChatGPT-like **simplicity as the baseline**
- Claude-like artifacts as working objects
- Perplexity-like sources, revealed progressively
- Open WebUI / LibreChat architectural lessons, hidden behind “talk to Sovi”
- Cursor/Figma contextual tools around the thing being worked on
- Subtle optimistic sci-fi: immediate, status-clear, voice-capable

## Color

Semantic tokens in `src/styles.css` and `design/tokens.json`.

- Dark: midnight graphite-navy `#0C1017`, horizon cyan `#4DB8D0`
- Light: warm paper `#F4F0E8`, deeper horizon `#18748A`
- Solar amber for warning + create context only
- Research / code / voice / physical accents are **orientation**, not a recolor of the whole app

## Type

Manrope (UI) + IBM Plex Mono (code). Hierarchy over borders. Comfortable conversation body (~15px / 1.65).

## Shape & depth

Moderately rounded, concentric radii, hairline borders / soft elevation. Workspace areas feel grounded, not floating bubbles.

## Motion

State, not decoration: streaming caret, listening horizon, thinking pulse, panel open/close. Respect `prefers-reduced-motion`.

## Presence

Horizon line + rising point (`SoviMark`). Voice mode turns the horizon into a waveform. No default avatar.

## Voice

Simplify the chrome. Emphasize Sovi state, transcript, mic, interruptibility.

## Responsive

- Mobile: conversation/voice, bottom composer, drawers, 44px targets, safe-area
- Tablet: conversation + optional workspace
- Desktop: left conversations, center chat, optional right artifact/activity

## Density

Conversation low; research medium; coding medium-high; system high; mobile reduced.

## Component lab

`/dev/design-system` — internal, not in product nav.

## Dos and don’ts

Do: talk-first home, progressive disclosure, capability-aware nav, real empty/loading/error states.  
Don’t: one more button per capability, provider wall, emoji chrome, ad-hoc hex in JSX.
