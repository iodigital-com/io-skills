# iO Skills — project goals and workflow

[Nederlands](../nl/project-intent.md) · English

iO Skills is iO’s shared skills library. If you already practise spec-driven development, you can go straight from the homepage to the catalog. Find a familiar skill by name or discover one that fits the task at hand. Each skill page explains what it produces and how to install it in your project with `npx skills add`.

If you are trying the approach for the first time, you can start from the same homepage and follow a tutorial for a new or existing project. The iO library builds on [Addy Osmani’s agent skills](https://skills.addy.ie/).

## Start with a client brief

On a new project, the client brief describes who the team is building for, what that person wants to achieve, and how the client will recognise a successful outcome. The brief provides the starting point for a draft spec. On an existing project, the team can use the current application and earlier analysis in Confluence to recover decisions already made. The team keeps the current spec in Git, alongside the code or in a second repository. With two repositories, the team coordinates its Git workflow so it can tell which version of the spec goes with each implementation.

## Test the spec with a prototype

In the first loop, the team refines the spec until a feature is clear enough to build. The design spec uses simple text wireframes to show how each screen is laid out and where elements sit in relation to one another. The prototyping skill turns these into a detailed, clickable prototype. The client can bring up every agreed screen state, from an empty screen to an error and recovery. Where the experience differs by persona, the client can walk through each perspective.

For example, ask `design-spec` to “Sketch how a cyclist compares the Stad 400 and the Route 800 on a phone and a wide screen. Show the price, light output and run time on the highest setting for each light. Show which button adds the chosen light to the basket.” The skill produces a Markdown document with wireframes and checks the team can review together.

The prototype uses the project’s design system. If the project has none, the skill builds one from the components its screens need. The team uses the same frontend technology for the prototype and the final product where practical. For a React Native app, for example, it can build a web prototype in React.

Use the optional `functional-analysis` skill to write or update a functional analysis (FA) in the client's language. For example, ask “Explain to the retailer how a cyclist compares the run times of two lights and chooses the Route 800. Put the link to the comparison beside that step.” When the view is available, the link opens the prototype at phone width with both models already selected. If the view is missing, the FA describes the agreed experience and identifies what the client can already try.

## Build, test and revise through release

The two loops overlap. While the team specifies one feature, it can already build, test and ship another. If feedback from a demo or a discovery during development changes an agreed detail, the team **updates the spec first**. It then revises the affected implementation, prototype and functional explanation. The team and the client agree on which decisions the team can make independently.

## Share skills and documentation

A colleague contributes a skill through a pull request with an example that can be shared across clients. Before the skill joins the library, someone from another team tries it using those instructions. All project content omits client names.

All website content is available in Dutch and English, from navigation and messages to tutorials, examples and skill descriptions. French and Swedish are possible future additions.
