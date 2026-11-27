# Working from the spec

In spec-driven development, the client and team record the behaviour they expect and an example they can use to check it. As soon as one decision is clear, the team can build and test it. A review, implementation, test or release can reveal a missing decision or a reason to reconsider one. Record the revised behaviour in the spec in Git first.

## Which skill do you need now?

| Where are you? | Start with | What moves to the next step? |
| --- | --- | --- |
| The client has an idea. The outcome is still unclear. | [interview-me](skills/interview-me.md) | A confirmed user need and the decisions still open. |
| The goal is clear. The team needs to agree on the feature’s behaviour. | [spec-driven-development](skills/spec-driven-development.md) | A spec in Git with agreed behaviour and a testable acceptance example. |
| You want to see whether someone can complete the agreed task. | [design-spec](skills/design-spec.md) for a sketch, [prototype-shell](skills/prototype-shell.md) if you want the iO review environment | A sketch or a clickable scenario to discuss together. |
| One part of the spec is clear enough to build. | [planning-and-task-breakdown](skills/planning-and-task-breakdown.md), then [incremental-implementation](skills/incremental-implementation.md) | Small tasks and a first working change. |
| You want evidence that the implementation meets the agreement. | [test-driven-development](skills/test-driven-development.md) and [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) | A behaviour test and a user action checked in the browser. |
| The change works. The team needs to decide whether it is ready to ship. | [code-review-and-quality](skills/code-review-and-quality.md), then [shipping-and-launch](skills/shipping-and-launch.md) | Resolved review findings and an informed release decision. |

## Brief

Ask the client what someone is trying to do today, where they get stuck and what they should be able to do after the change. Use [interview-me](skills/interview-me.md) to explore one real situation. Use the [briefing template](guides/briefing.md) to record who you are building for, what outcome matters and which decisions are still open.

## Specify

Give [spec-driven-development](skills/spec-driven-development.md) the confirmed brief. Describe the intended behaviour, what falls outside the change and one example the client can use to see whether the feature works. On an existing project, use [context-engineering](skills/context-engineering.md) to find the relevant code, decisions and tests.

Suppose someone wants to finish a form later. A testable agreement would be “If I save a draft and reopen it tomorrow, my answers are still there.” The client can confirm whether that meets their need, and the team knows what to test.

## Review the prototype

Ask the client to complete a task in the prototype. The project team observes whether the feature works as agreed. After saving a draft, for example, can the client find it again and continue filling it in without help? Discuss any questions that come up and record new decisions in the spec.

Choose a format that answers the question. A sketch made with [design-spec](skills/design-spec.md) may be enough to review a screen layout. To try the same scenario together with the spec at hand, iO Skills offers [prototype-shell](skills/prototype-shell.md) as an optional review environment. A custom prototype can be a better fit when you want to try an interaction inside your own app. If the behaviour is clear, you can go straight to building and testing.

Would the client like a description to refer back to? Give [functional-analysis](skills/functional-analysis.md) the agreed spec and a tested link to the situation you reviewed together.

## Build

Give [planning-and-task-breakdown](skills/planning-and-task-breakdown.md) the agreed spec and ask for tasks with a visible result. Use [incremental-implementation](skills/incremental-implementation.md) to build and demonstrate one task at a time.

For the form, the first task might let someone save and reopen a draft. Let the client try those actions before extending the feature to cover editing a saved draft.

## Test

Give [test-driven-development](skills/test-driven-development.md) the acceptance example before implementing the task. Let the test demonstrate the missing behaviour, then run it again after the change. Use [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) when the screen is working. Repeat the action at phone width and check what the user can see.

For the form, check what the user sees after reopening the draft. Are all their answers still there? Agree on what they should see if saving fails, and test that separately.

## Ship

Give [code-review-and-quality](skills/code-review-and-quality.md) the change, the agreed spec and the test results. Ask the reviewer to link findings to their impact on the user. Once the findings are resolved, use [shipping-and-launch](skills/shipping-and-launch.md) to check which version was tested, how the team will monitor rollout and how it can roll back if needed.

**Back to the spec.** Suppose a test reveals that two open tabs can overwrite each other’s changes to a draft. Discuss with the client what should happen in that situation. If you agree to warn the user, use [spec-driven-development](skills/spec-driven-development.md) to update the spec and its acceptance example. Then adjust the implementation and test again with two tabs.

## Worked example

The tutorials follow one feature from the first question through release. Choose [a new project](guides/new-project.md) or [a change to an existing project](guides/existing-project.md). In the bike shop demo, you can compare the [design spec](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=design) with the [working prototype](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light).
