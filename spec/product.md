# iO Skills — V1 product specification

**Status** · Draft for review. This is an internal build document. The [capability map](capability-map.md) proposes how to divide the work.

## Outcome and audience

iO Skills is the shared library where iO teams find and reuse skills across projects. The catalog and tutorials are both accessible from the homepage.

- **Browse skills.** An experienced practitioner starting a task can go straight to the catalog, find a familiar skill by name or discover one by the task it supports, and install it in the current project.
- **Follow a tutorial.** A colleague learning spec-driven development can start from a real project question, install the relevant skills, and use a worked example to turn that question into a reviewable change.

Colleagues can also contribute skills from their projects so that others can find and use them.

The client participates through the brief, the prototype and, when useful, a functional explanation. Each project agrees who can decide which changes. A technical adjustment within the team's remit can go straight into the spec before implementation.

## Release requirements

| Area | What V1 must let someone do |
| --- | --- |
| Start on a new project | Use a client briefing template to capture the intended users, problem, desired outcome and unresolved questions. Generate a draft spec that distinguishes agreed behaviour from points to clarify. |
| Start on an existing project | Take one upcoming change. Identify the relevant material in Confluence, compare it with current behaviour, and flag discrepancies for a decision. Establish the Git spec as the source for that change. Show how to locate the matching spec and implementation when they live in separate repositories. |
| Refine the spec | Iterate on a clearly identified part of the spec, use a design spec to describe screen layout, and use a clickable prototype to test the experience with the client. |
| Build through release | Move a sufficiently clear part into development while refinement continues elsewhere. A change discovered during build, test, review or shipping is first recorded in the spec. Update the affected prototype, FA, implementation and checks from that decision. |
| Find and reuse skills | Open the shared iO catalog directly from the homepage. Identify a skill by its name or the task it supports, see what it produces, and get the `npx skills add` command for that skill on its detail page. The catalog also provides the command for the iO collection, which builds on Addy's work. |
| Contribute skills | Submit a pull request with a client-neutral example. A colleague from another team tries the contribution using its accompanying instructions before inclusion. |
| Use either documentation language | Read the documentation site's navigation, controls, tutorials, catalog entries and examples in Dutch or English. A language switch takes the reader to the equivalent page. Both editions link to the same English bike shop, review shell, product spec and design spec. Inside the shell, the functional walkthrough and worked prompt explanations follow the documentation language. Skill identifiers, commands and code retain their executable spelling. |

The bilingual requirement covers **website content**. Internal build specifications are maintained in English. The language of an installed skill, a separate deliverable or material generated for a client can be chosen independently. French and Swedish are candidates for a later release.

## What each design deliverable answers

| Deliverable | Question it answers | Acceptance example |
| --- | --- | --- |
| Design spec | What appears on screen, in what order, and how do the elements relate? | Given a source spec, the `design-spec` skill produces a Markdown design spec with a text wireframe, explicit layout rules and the visible differences for each relevant state or persona. Use the [iO ASCII conventions](../skills/design-spec/references/wireframe-conventions.md) by default and respect the team's existing wireframe notation. The result can be reviewed before prototyping. |
| Prototype | What can a person actually see and do in each agreed situation? | All specified states can be opened on demand, including exceptions and recovery. When permissions or behaviour differ by persona, the reviewer can try each perspective. The skill reuses an existing design system or establishes one from the needed screens. It follows the delivery stack where practical, with room for a React web prototype for a React Native app. |
| Optional functional analysis (FA) | How does the experience work in the client's own terms? | The `functional-analysis` skill turns a draft or approved feature spec into a client document in the agreed language. From a fresh session in the intended viewer, a link beside an explanation opens the exact prototype screen, persona and state it describes. If that view is unavailable, the FA explains the agreed behaviour and identifies the preview gap. A spec change that affects users updates the relevant FA passages and links. |

## Release acceptance walkthroughs

1. **First use.** Starting on either language homepage, a colleague chooses the new-project tutorial, finds the briefing template and installs the documented iO skill in an empty project. Using the example brief, they produce a draft spec with an agreed outcome and an explicit open question. The installation command uses the real iO source and the skill appears in the target agent.
2. **Adoption during delivery.** The existing bike retailer sells front lights, bags and locks through product pages, a basket and checkout. A cyclist can compare any two distinct models in the same category, regardless of how many models the catalog contains. The review uses nine sample products across these categories. Start in the shop and choose a category. Compare price plus the two relevant attributes: brightness and highest-setting run time for lights, capacity and mounting position for bags, or type and length for locks. The existing-project tutorial traces the current purchase path before connecting the comparison to the existing basket.
3. **Feedback across both loops.** In the new-project tutorial, create a local trial of the comparison feature from its brief. The retailer asks to show the brightness setting beside each run time on mobile. Trace the decision through the spec, design, prototype, implementation check and optional FA. Check one Route 800 at €69 through to confirmation. In the existing-project tutorial compare Frame 2 and Stuur 5 in the bags category, order one Stuur 5 at €49 and verify the existing product-page purchase still works.
4. **Prototype fidelity.** From the example spec, list the agreed combinations of screen, state and relevant persona. Open each one and exercise its next action or recovery path. On every retail screen, open its design spec and compare its labelled wireframe with the running view. Open a design or FA link independently and confirm it restores the named combination and document.
5. **Language parity.** Repeat the path from homepage to tutorial to skill detail in Dutch and English. Switch language midway through a tutorial and on a skill page. From each edition open a prompt result in the demo, switch the explanation language and return to the matching prompt. The shop, shell controls and both specs use English throughout.
6. **Contribute across teams.** A contributor opens a pull request containing a skill, a generic example and its two website descriptions. A second team follows the instructions and reports the result before the skill enters the library. Check the project material for client names.
7. **Return to the library.** An experienced colleague needs the design-spec skill on another project. From the homepage, they open the catalog, locate the skill by name and install it using the command on its detail page. Repeat with a colleague who knows only the task (“describe a screen layout”). Verify that both can reach the same skill directly through the catalog in Dutch and English.

## Website implementation

- The first website runs locally with Next.js. Its static build supports a future Vercel deployment. The homepage follows the information order of Addy Osmani’s skills site. Its workflow shows when to use each skill. Both tutorials teach the method using an accessory comparison feature for a fictional children's bike shop. The Wobble Wheel storefront has its own visual identity. Each prompt links to its worked result in the English review shell. A reader can compare the design with the running screen, inspect a decision or test result, then return to the same prompt. Readers can also adapt the shell skill’s separate starter to their own project.
- A colleague with read access to the iO GitHub repository installs from the target project with `npx skills add iodigital-com/io-skills`. The installation guide and catalog use the same GitHub source for the collection and for individual skills.

## Initial library

Start with all 26 skills from the Addy revision recorded in the project lockfile. Keep the original skill names, instructions, scripts and references together in independently editable directories under `skills/`. Include the upstream license in each Addy-derived skill. The iO additions include `design-spec` and the optional `functional-analysis`. Verify that the CLI discovers the catalog and can install either the whole collection or one named skill from the iO source.
