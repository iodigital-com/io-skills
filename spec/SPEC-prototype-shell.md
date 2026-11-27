# Prototype review shell — V1

**Status** · Approved for V1 implementation, 27 November 2026  
**Related documents** · [iO Skills product spec](product.md) · [Design spec skill](../skills/design-spec/SKILL.md) · [Functional analysis skill](../skills/functional-analysis/SKILL.md)

## Purpose

A client and a project team can open the same prototype, try a feature from different perspectives and share the exact situation they are discussing. During a review, someone should be able to ask “What does the reviewer see for this returned request on a phone?” and answer it while keeping their place in the functional analysis (FA).

V1 pairs a working base shell with a skill that helps teams adapt it to their frontend and design system. The review experience below is the contract for both.

## Entering a review

The overview and the interactive preview are available to both clients and team members. A *persona* is the person portrayed inside the prototype, such as an applicant or reviewer. The same reviewer can try either perspective.

| Entry point | Expected experience |
| --- | --- |
| General project link | Open the overview, grouped by functionality. Each feature lists its scenarios with labels that describe a recognisable situation, such as **Improve a returned request**. |
| Scenario in the overview | Open its configured starting screen, persona, state and example data. From there the reviewer uses the prototype freely. Guided steps are a possible later extension. |
| Quick screen picker | Open the chosen screen with the current persona, state and example record if that combination exists there. Otherwise open the destination's configured starting situation. Show the resulting selection in both cases and keep the FA at its current reading position. The overview and picker remain reachable during review. |
| FA or shared situation link | Open the referenced situation directly, including in a fresh browser session. A reviewer can then use the same controls as someone who started on the overview. |

## Changing one part of the situation

The project defines which combinations of screen, persona, state and example record it has implemented. Record identity matters: two requests can have the same status and different reasons for being returned. The shell must be able to identify the example being reviewed, either directly or through a scenario that uniquely identifies it.

| When a reviewer changes… | What the shell preserves |
| --- | --- |
| **Persona** | Keep the screen, state, example record and preview format. Offer only personas implemented for that situation. |
| **State** | Keep the screen, persona, example record and format. Offer only states implemented for that combination. For a screen without an individual record, use its configured example dataset. |
| **Preview format** | Change the space available to the prototype. Preserve the active screen, persona, state, example data and FA reading position. |

Every project defines its preview formats. Mobile, tablet and desktop are useful starting presets for a website. One phone preset is sufficient for an app built for one target. The project supplies their dimensions and labels.

## Reading the FA alongside the prototype

The document pane and the preview can be navigated independently. Following a situation link in the open FA changes the preview and leaves the reader at the same passage. Changing screen, persona, state or format also keeps that passage open.

When the reader selects **Open explanation for this screen**, open the FA passage for the active scenario on that screen. If there is no active scenario or it has no passage for that screen, open the screen's configured default explanation. Either destination takes one action. If neither exists, keep the current FA and its reading position. A project can use the overview, preview and sharing without supplying an FA.

The feature spec remains the source for agreed behaviour. A team can make it available alongside the FA when appropriate for that review audience.

## Sharing a situation and giving feedback

**Copy link to this situation** produces a shareable link for the *current* reviewable situation, including after someone has clicked beyond a scenario's starting screen. Opening it in a fresh session with project access restores the screen, persona, state, example record and selected format. The link also carries the active scenario when one is selected. **Open explanation for this screen** then takes the recipient to the same FA passage as the sender, even when multiple scenarios share the same screen and record. A link shared without an active scenario keeps that context and uses the screen's default explanation when available.

Unsaved text belongs to the current editing session. After **Save**, the project determines which data the recipient can reopen for the shared record and state. A prototype with fixed examples shows the configured values for the resulting state. A project that persists the edit and can retrieve it in a fresh session shows the saved value. The shell can rely on the project's existing storage and example data.

A published web link must work in the intended browser. An FA displayed inside the shell may use a project-supported internal link convention that resolves to the same situation. If a referenced view no longer exists, explain that it is unavailable and offer a way back to the overview. Silently showing another record or persona would give the reader the wrong evidence.

For V1, reviewers send the link through their project's existing feedback channel. Teams using Vercel Comments can continue using it for inline feedback. Comment storage, threads, approvals and a hosting-provider integration are outside the base shell's scope.

## What a project adapts

| Shared across projects | Supplied by each project |
| --- | --- |
| A recognisable arrangement for the overview, quick screen picker, persona and state controls, preview formats, document pane and share action. | Project name, logo and colours. Teams can later customise the layout in their own copy. |
| A way to register functionalities, scenarios and their addressable situations, and to restore a selected situation. | Feature and screen labels, persona/state combinations, example records, scenario-specific FA passages, default screen explanations and available formats. |
| A working example and an adaptation skill. The skill guides a team through connecting one real scenario, its FA link and a fresh-session check. | Screens rendered using the project's components and design system. If a project starts without one, the skill helps establish the components its first screens require. React, Vue and server-rendered Twig are all valid contexts. A native app team may choose a web prototype. |

The spec leaves the rendering mechanism, router, URL syntax, hosting and repository packaging to the technical design.

## Acceptance walkthrough for joint review

Run the walkthrough in one working example prototype. Use a feature called **Review a request** with two returned requests that have different reasons. Request 104 supports the applicant and reviewer personas in the returned state. Only the applicant has a draft state. Configure phone and desktop formats. Give the request detail screen a default explanation and a distinct FA passage for the **Improve a returned request** scenario.

| Try this | What the reviewer must observe |
| --- | --- |
| Open the project overview and select **Improve a returned request**. | The preview opens request 104 as the applicant, with its return reason visible. The reviewer can freely use the screen. |
| As the applicant, switch request 104 to draft and back to returned. | Each change preserves the request and applicant persona. The available controls match the chosen state. |
| Switch to the reviewer persona. | The same request and reason remain visible. Available actions reflect the reviewer, and the applicant-only draft state is absent from the choices. |
| Switch to the phone format and copy the situation link. Open it in a fresh session. | Request 104 opens as the reviewer, returned, in the phone format. The second returned request makes an accidental fallback to a default record detectable. |
| Read halfway through the FA, follow a situation link, then use the quick picker to visit a different screen. | The preview changes twice. The same FA passage stays visible. One action opens the other screen's explanation when one is configured. |
| Open the explanation on the request detail screen during **Improve a returned request**. Repeat on the same screen without a matching scenario passage. | The first click opens the passage about improving a returned request, even though the screen also has a default. In the second case, the click opens the screen's default explanation. |
| Share the same request detail, persona, state, record and format from two scenarios with distinct FA passages. Open each link in a fresh session and select **Open explanation for this screen**. | Both links show the same request. Each opens the FA passage for the scenario from which its link was shared. |
| From request 104 as a reviewer in the returned state, use the picker to open a screen that supports that combination. Then pick a screen with a different configured starting situation and no support for that combination. | The first screen still shows request 104 as returned for the reviewer. The second opens in its configured starting situation and shows which selection is active. |
| In an editable applicant view, replace the text, leave the edit unsaved and copy the situation link. Open it in a fresh session. | The recipient lands on the same screen, record, persona, state and format. The field shows the value the project provides for that record before the unsaved edit. |
| Change a field, select **Save** and share the resulting view. Open the link in a fresh session. | The recipient sees the configured example value if the prototype uses fixed examples, or the saved value if the project can retrieve it for that record. |
| Follow an in-prototype action to another configured situation and share it. | In a fresh session, the recipient lands at the point the reviewer reached rather than replaying the original scenario. |
| Open a feature with no FA, then follow a link to a removed situation. | The feature remains usable without documentation. The stale link gives a clear unavailable result and a route back to the overview. |

### Shared-link checks for React and Vue

In addition to the example walkthrough, run one focused check on a React screen and one on a Vue screen. For each, select a non-default situation, copy its link and open it in a fresh browser session with project access. Verify the actual screen content, persona, state, example record, selected preview format and active scenario against the original. One working example prototype and these two checks are sufficient for V1 acceptance.

