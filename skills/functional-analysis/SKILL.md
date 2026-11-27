---
name: functional-analysis
description: Writes or updates an optional client-facing functional analysis (FA) from a feature spec. Use when preparing a client walkthrough, explaining what someone sees and can do, linking scenarios to prototype states, or keeping an existing FA in sync with user-visible changes.
---

# Functional Analysis

## Overview

Use the feature spec to explain a feature in the client's own terms. A reader should be able to recognise their situation, follow the experience and give informed feedback without having to read the technical spec. Write in the language agreed for that audience, including headings and link labels. Preserve the actual labels people see on screen.

## When to Use

- A team wants a client-readable companion to a draft or approved feature spec.
- A feature has an existing FA and the team needs to reflect a change or prepare a client review.

The FA is optional. The feature spec owns behaviour and scope. A design spec can clarify the screen layout, and a prototype can demonstrate a situation. If these sources disagree, describe the discrepancy for the team and keep the agreed behaviour identifiable.

## Process

1. **Start from the spec.** Read the relevant feature spec, its review status, any existing FA and, for a revision, the changed requirements. If you cannot identify the source, ask for it. Identify the problem, intended readers, user-visible capabilities, affected personas, main flows, exceptions, recovery and explicit scope boundaries. Carry unresolved decisions forward as questions.
2. **Write from the reader’s perspective.** Use present tense, everyday words and concrete screen labels. Describe what triggers the interaction, what each person sees or can do and how they know what happened. For example, “If the submission fails, your entries stay on screen and you can try again.” Include this promise only when the spec supports it. Leave code, architecture, internal ticket details and test procedures out of the narrative.
3. **Place prototype links where they help.** At the start of a scenario, link to its entry view. Beside a capability, exception or role-specific passage, link to the exact screen, relevant persona and state. Resolve each target against the project's actual prototype, route inventory or supplied share links. Use the link format that works in the reader's viewer. A shared web URL may be right for a standalone document. An embedded viewer may require a custom scheme such as `prototype:`. Copy only targets the project supports.
4. **Verify the destination.** Open the link in the intended viewer from a clean session when available. Check what it actually shows, including the role, state and any selected item. A successful page load alone proves little. If the destination is documented but you cannot run the viewer, flag the link as awaiting verification. If only a general landing page exists, or a route shows a different view, omit the misleading link and briefly identify which preview is missing. The rest of the FA can still be written.
5. **Reconcile changes.** Compare the FA with the spec in both directions. Every user-visible capability should be covered and every promise should trace back to the spec. For an update, revise only the affected passages, scope statements and links. A purely technical change with the same experience calls for no FA edit. If client feedback changes behaviour, establish the change in the spec first according to the team's decision process, then revise the FA. An editorial clarification can be made directly in the FA.

## Output

Use the [FA template](references/fa-template.md) as the starting point. Keep the project's established location and update an existing FA in place. A useful default is `FA.md` next to the feature spec. Link back to the actual source and, when maintaining both files is in scope, add a reciprocal link once. Use a ticket, glossary or change history when the project needs one.

New documents start as drafts. A source spec's approval does not approve the FA. Reflect actual review decisions and flag substantive revisions for review under the project's own agreements. In the handoff, identify open product decisions and missing or unverified prototype views.

## Example

Suppose the spec lets an applicant edit a returned request, and its design spec places the reason above the edit button. If the embedded viewer has been checked and supports this exact target, the client-facing passage can read as follows.

```markdown
When your request comes back, you see the reason above **Edit request**.
[View the returned request as the applicant](prototype:request-detail?role=applicant&state=returned&record=104)
```

Use the project's verified target when adapting the example. If the reviewer sees the same reason but cannot edit the request, describe that perspective separately.

## Common Rationalizations

| Shortcut | Better action |
| --- | --- |
| “The reviewer can find the right state from the homepage.” | Try the exact link as a fresh reader. If the state cannot be opened directly, mark the preview gap beside the scenario. |
| “This permission is visible in the demo, so I can describe it as agreed.” | Check the spec. Raise the difference with the team before promising that permission. |
| “The implementation detail explains why this matters.” | Describe the observable consequence in terms the client uses. |

## Red Flags

- Two personas have different actions, yet the FA gives both the same instructions or links both to the same default view.
- An unavailable prototype, an unanswered question or a draft decision reads like a confirmed capability.

## Verification

- [ ] A reader can explain who uses the feature, what they can do, how exceptions play out and where the agreed scope ends.
- [ ] Each user-visible requirement appears in the FA and each claim can be traced to the current spec.
- [ ] Scenario links use the intended viewer's format and the described screen, persona and state. Missing or unverified views are identified.
- [ ] The document follows the audience's language and the recorded review status. The handoff names any remaining decisions.
