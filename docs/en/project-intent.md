# iO Skills — project goals and workflow

[Nederlands](../nl/project-intent.md) · English

iO Skills is iO’s shared skills library. If you already practise spec-driven development, you can go straight from the homepage to the catalog. Find a familiar skill by name or discover one that fits the task at hand. Each skill page explains what it produces and how to install it in your project with `npx skills add`.

If you are trying the approach for the first time, you can start from the same homepage and follow a tutorial for a new or existing project.

## Start with a client brief

On a new project, the client brief describes who the team is building for, what that person wants to achieve, and how the client will recognise a successful outcome. The brief provides the starting point for a draft spec. On an existing project, the team can use the current application and earlier analysis in Confluence to recover decisions already made. The team keeps the current spec in Git, alongside the code or in a second repository. With two repositories, the team coordinates its Git workflow so it can tell which version of the spec goes with each implementation.

## Test the spec with a prototype

In a prototype review, the client and the project team assess how a feature works in practice. Ask the client to complete a task. Does the result match what you agreed in the spec? Where does the client hesitate, and what does the team need to clarify?

Tell [design-spec](skills/design-spec.md) what the user wants to do. For a product comparison, try the following prompt.

> Sketch a screen for comparing two products. For each attribute, make it clear which value belongs to which product so the differences are easy to spot. Show the layout on phone and desktop.

To discuss an interaction, you can use [prototype-shell](skills/prototype-shell.md) to share a scenario with the relevant spec alongside it. This is an optional review environment from iO Skills. Once the expected behaviour is clear, you can also build and test directly from the spec.

Use the project’s design system for the prototype. If it has none, define the components and styles the chosen screens need. For example, you can discuss the layout of a React Native app using a React web prototype. Want to see whether the client can find the new feature in the existing navigation? Prototype it inside the app and ask the client to start from the home screen they already know.

Use the optional [functional-analysis](skills/functional-analysis.md) skill to explain to the client how a feature works. For the comparison screen, try this prompt.

> Explain how a user selects two items to compare. Which attributes does the screen show side by side? What changes when the user replaces one item? At that last step, include a link that opens the prototype with the new selection.

## Build, test and revise through release

The two loops overlap. While the team specifies one feature, it can already build, test and ship another. If feedback from a demo or a discovery during development changes an agreed detail, the team **updates the spec first**. It then revises the affected implementation, prototype and functional explanation. The team and the client agree on which decisions the team can make independently.

## Share skills and documentation

The first 26 skills were based on [Addy Osmani’s agent skills](https://skills.addy.ie/). iO maintains the versions you install from this library and uses them to develop this project.

A colleague contributes a skill through a pull request with an example that can be shared across clients. Before the skill joins the library, someone from another team tries it using those instructions. All project content omits client names.

All website content is available in Dutch and English, from navigation and messages to tutorials, examples and skill descriptions. French and Swedish are possible future additions.
