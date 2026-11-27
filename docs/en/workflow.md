# Working from the spec

Use the spec in Git to record the behaviour the client and team expect. In the first loop, clarify one part with a brief, a spec and a prototype. In the second loop, build, test and review it. When the agreement changes, update the spec first. The team can build one part while a different question remains open.

## Which skill do you need now?

| Where are you? | Start with | What moves to the next step? |
| --- | --- | --- |
| The client has an idea. The outcome is still unclear. | [interview-me](skills/interview-me.md) | A confirmed user need and the decisions still open. |
| The goal is clear. The team needs to agree on the feature’s behaviour. | [spec-driven-development](skills/spec-driven-development.md) | A spec in Git with agreed behaviour and a testable acceptance example. |
| The behaviour is agreed. You want to review the screens and interactions. | [design-spec](skills/design-spec.md), then [prototype-shell](skills/prototype-shell.md) | A screen sketch and a clickable situation the client can try. |
| One part of the spec is clear enough to build. | [planning-and-task-breakdown](skills/planning-and-task-breakdown.md), then [incremental-implementation](skills/incremental-implementation.md) | Small tasks and a first working change. |
| You want evidence that the implementation meets the agreement. | [test-driven-development](skills/test-driven-development.md) and [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) | A behaviour test and a user action checked in the browser. |
| The change works. The team needs to decide whether it is ready to ship. | [code-review-and-quality](skills/code-review-and-quality.md), then [shipping-and-launch](skills/shipping-and-launch.md) | Resolved review findings and an informed release decision. |

**The tutorial example.** A children’s bike shop wants its customers to compare front lights, bike bags and bike locks. A parent and her child choose two distinct models in one category and decide which one to order. For a light for the early ride to school, they compare price, brightness and run time. For a bag, they want to know how much it holds and where it fits on the bike.

## Brief

Start with a decision a user needs to make. Give [interview-me](skills/interview-me.md) the initial client request and have it ask one question at a time. Record confirmed answers and open questions in the [briefing template](guides/briefing.md). If a team already has a brief, focus on the decisions it still needs.

For the bike retailer, “compare products” means helping a cyclist find out whether the more expensive light lasts longer at full brightness. Move on when the retailer can explain what decision the visitor should be able to make.

## Specify

Give [spec-driven-development](skills/spec-driven-development.md) the confirmed brief. Ask for the intended behaviour, boundaries, open questions and an acceptance example. On an **existing** site, start with [context-engineering](skills/context-engineering.md) to locate the relevant components, spec and tests. Then record what the feature adds to the current journey.

A testable agreement is: “When the visitor chooses the Route 800 in the comparison, the basket contains one Route 800 at €69.” The spec is usable when someone who missed the discussion can work out what to test from that sentence.

## Review the prototype

Use [design-spec](skills/design-spec.md) when you know what a screen should do. Give it the spec and relevant states and ask for phone and desktop wireframes. [Open the design spec for the comparison screen](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=design). Find the ‘Runtime on the highest setting’ row and the value for the Route 800 in the phone wireframe. Can you also tell from the screen that the three hours refer to the highest setting?

Then use [prototype-shell](skills/prototype-shell.md) to make the screens and sample data interactive. Ask the client to complete one task and watch where they hesitate.

Does the client need an explanation to refer to after the review? Give [functional-analysis](skills/functional-analysis.md) the agreed spec and a tested link to the exact situation. [Try the product comparison in the shell](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light).

## Build

Give [planning-and-task-breakdown](skills/planning-and-task-breakdown.md) the agreed spec and ask for tasks with a visible result. Use [incremental-implementation](skills/incremental-implementation.md) to build and demonstrate one task at a time.

A first task can end with the comparison of Stad 400 and Route 800. Use bike bags in the next demo to see whether the rows change with the category. Then connect the selection to the existing basket.

## Test

Give [test-driven-development](skills/test-driven-development.md) the acceptance example before implementing the task. Let the test demonstrate the missing behaviour, then run it again after the change. Use [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) when the screen is working. Repeat the action at phone width and check what the user can see.

Try two purchases, starting each with an empty basket. Choose the Route 800 from a light comparison and check for one light at €69 on confirmation. Then compare Frame 2 with Stuur 5. The handlebar bag should be identifiable by its 5 L capacity and mounting position, and appear as one Stuur 5 at €49 on confirmation.

## Ship

Give [code-review-and-quality](skills/code-review-and-quality.md) the change, the agreed spec and the test results. Ask the reviewer to link findings to their impact on the user. Once the findings are resolved, use [shipping-and-launch](skills/shipping-and-launch.md) to check which version was tested, how the team will monitor rollout and how it can roll back if needed.

**Did the agreement change during review?** Return to [spec-driven-development](skills/spec-driven-development.md). Update the acceptance example first, then the affected prototype, implementation and tests. Follow the workflow yourself with [a new project starting from the brief](guides/new-project.md) or [a new feature in an existing shop](guides/existing-project.md).
