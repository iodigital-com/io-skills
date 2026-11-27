---
name: design-spec
description: Creates or revises a low-fidelity screen design spec from product requirements. Use when someone asks for a text wireframe, a responsive screen layout, or the visible differences between states and personas before prototyping.
---

# Design Spec

## Overview

Turn a feature spec into screen layouts that a designer, developer and client can discuss in a pull request. The deliverable is a Markdown document with simple text wireframes and enough written layout rules to reconstruct each view.

## When to Use

- A team has described what a feature does and needs to decide what people see on screen.
- A change to an existing feature affects the position, visibility or priority of content and actions.

For a request to build a clickable prototype or implement a UI, use the approved design spec as input to that work. This skill produces the preceding design document.

## Process

1. **Find the source.** Read the relevant feature spec or the requirements supplied in the conversation. On an existing project, compare the affected screen and any agreed design-system patterns. Cite the source section or identify the supplied brief. If a missing decision changes the layout materially, ask one focused question with a suggested answer and develop the parts already clear. Record smaller uncertainties as open questions.
2. **Sketch the default view.** Use the [wireframe conventions](references/wireframe-conventions.md) for the per-screen structure, captions and ASCII control symbols. Preserve an established project notation when one exists. Give each screen a stable identifier, use the project's component names and show real labels and meaningful sample content.
3. **Show how the layout adapts.** For the agreed screen sizes or orientations, state what moves, stacks, wraps or stays in view. Add a second sketch when the arrangement changes enough that prose could be misread. A single fixed-size display can use a single view. Annotate relationships such as “the error appears directly below its field” so the meaning survives reflow.
4. **Describe the variants.** Walk through the states in the source spec. For each one, say which region changes, what appears or disappears and where available actions sit. Consider loading, empty, failure, recovery and success where they apply. Split by persona only when visible content, hierarchy or actions differ. Use identifiable screen, state and persona names that the prototype and optional functional analysis (FA) can reference later. A short delta is enough when the surrounding layout stays the same.
5. **Iterate from the spec.** Distinguish sourced behaviour from proposed layout decisions. If feedback changes a permission, action or outcome, update the underlying feature spec first when authorised, or record the proposed change there for review. Then revise the affected wireframe and variants. Keep identifiers for views that still represent the same situation.

## Output

Use the project's spec location and requested language. Update an existing design spec in place. For a new one, a Markdown file beside the feature spec is a useful default. If the user asks for a sketch in chat, return it there.

For each screen, include its purpose and source, a labelled wireframe, layout and responsive rules, and the relevant state or persona differences. Finish with observable review checks and any open decisions. Keep implementation details, interactive prototypes and client-facing FA prose in their respective deliverables.

For an example of how much detail to include, see the [worked screen spec](references/worked-example.md).

## Common Rationalizations

| Shortcut | What to do instead |
| --- | --- |
| “The boxes show what happens on mobile.” | State where the secondary region and its actions move as the available width shrinks. |
| “A similar product has an Edit button here.” | Check whether editing is allowed for this state and persona. Surface a missing decision before drawing the control as agreed. |

## Red Flags

- A reviewer needs to infer the reading order or action placement from whitespace alone.
- A wireframe changes an agreed permission, or repeated copies of the same screen disagree about what a persona can see.

## Verification

- [ ] The reviewer can trace each screen and action to the source or identify it as a proposal.
- [ ] Each distinct layout has a labelled wireframe and explicit rules for the supported widths.
- [ ] Captions identify each view, frame edges align and each control symbol means the same thing throughout.
- [ ] Every agreed state and relevant persona can be located, including variants that share the default layout.
- [ ] A teammate can point to the affected region for each review check and identify what still needs a product decision.
