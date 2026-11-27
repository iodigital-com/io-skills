---
name: prototype-shell
description: Sets up or adapts a working prototype review shell for a project. Use when a team wants to review interactive screens by feature, share a specific persona, state and example record, or connect a React, Vue, server-rendered or static frontend and its FA to a common review interface.
---

# Prototype Shell

## Overview

Start from the bundled [review shell](assets/starter/index.html). It runs directly on a static web server and includes an interactive equipment-request prototype. The shell owns the review controls and share links. The project owns its screens, permissions, example data, design system and persistence.

## When to Use

Use this when a team wants a clickable prototype or wants to connect existing screens to a review shell. For a low-fidelity description of a layout, the output is a design spec. For client-facing explanatory prose, the output is a functional analysis.

## Process

1. **Select a slice of the spec.** Identify the feature, its scenarios, distinct screens, valid personas and states, and representative records. Include specified exceptions and recovery paths. Use the design spec's identifiers where available. Keep sample data client-neutral. If behaviour changes during prototyping, update the agreed spec before changing the experience.
2. **Use the project's stack.** Inspect its routes, component library and styles. Reuse existing components and design tokens. If it has no design system, establish the small set of components, colours, spacing and type styles the chosen screens require. For a native project agree on a practical browser equivalent, such as a React preview for a React Native app.
3. **Set up a project copy.** Locate the directory containing this installed `SKILL.md`. Run `node <skill-dir>/scripts/create.mjs ./prototype-review` from the target project. For an existing setup, update the project's copy in place. Serve the copy with the project's static server or `python3 -m http.server 4319 --bind 127.0.0.1 --directory ./prototype-review`. Open the printed port in a browser.
4. **Register real situations.** Edit `project.js` in the copy. Give each feature a recognisable scenario name and its starting situation. Register a direct preview URL for every supported screen, persona, state and example record. Use one stable record ID across screens. Set preview formats, branding and the available FA passages. See the [adaptation guide](references/adapting.md) for the contract and framework examples.
5. **Connect actions inside the preview.** An action that reaches a shareable situation should tell the shell where it landed. Keep typing, scroll and other transient UI interactions within the preview. After Save, share a situation the project can actually reopen. Use an FA link to demonstrate one exception as well as the main path.

## Output

A runnable, project-owned prototype with its project's components and data, a feature overview, and a fresh-session link to a real situation. Record which combinations have been tried and identify any spec states still awaiting a prototype.

## Common Rationalizations

| Shortcut | Cross-check |
| --- | --- |
| “The role switch works because I see the correct name in the toolbar.” | Read the preview itself. Compare the same returned record as two people and verify which actions each can take. |
| “The FA link works after I walked through the demo.” | Open it in a clean session. Confirm the record, responsive layout and scenario-specific explanation. |

## Verification

- [ ] A colleague can start at the overview, enter a scenario and freely reach another shareable screen.
- [ ] The quick picker retains a supported combination. An unsupported switch shows the destination's configured starting situation.
- [ ] Persona and state controls expose implemented combinations. A format switch preserves the situation and any ongoing interaction.
- [ ] The FA stays at the same passage during navigation. Opening the current explanation uses the scenario passage, then the screen default.
- [ ] A copied link restores the screen, record, persona, state, format and active scenario in a fresh session. Test two records with the same status and two scenarios with different FA passages on one screen.
