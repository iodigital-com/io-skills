# Start a new project

Turn a brief into a testable spec, try a feature with the client and build it in small steps. Each step names the skill, gives you a prompt and tells you what to check.

This tutorial uses a fictional online bike shop for families. The client wants cyclists to be able to compare any two models in a category and order one. You start in an empty project directory and build a local trial version for the client to assess.

| Category | What does the cyclist want to compare? | Example choice |
| --- | --- | --- |
| Front lights | Price, light output and run time on the highest setting | How much longer does the more expensive light run on its highest setting? |
| Bike bags | Price, capacity in litres and mounting position | Which bag holds a lunchbox and raincoat and fits on my handlebars? |
| Bike locks | Price, type and length | Is a cable lock long enough to secure my bike to the rack, or do I need the longer chain? |

The [completed brief](briefing.md) lists all nine sample products. You follow one purchase from start to finish, then use bags to check that the comparison changes with the category. Orders use local sample data.

The demo uses the iO shell to show what an agreement in the spec means when you order a light. In your own project, you can build and test directly from the spec. If you want to try an interaction with the client first, use the shell or build a prototype that suits that interaction better.

[Try the shop in the prototype shell](/prototypes/bike-shop/index.html?lang=en&screen=store&role=cyclist&state=ready&record=categories&format=phone&scenario=buy-light). Choose Front lights on the shop page, select Stad 400 and Route 800, choose ‘Compare lights’ and place a test order for one light. The demo uses English for its shop, review controls, product spec and design spec. The functional walkthrough and prompt results follow the tutorial language.

Start in an empty project directory. With [access to the iO Skills repository](install.md), run this command, choose your agent when prompted and start a session in that directory. Paste one prompt at a time. For your own project, choose one task from your brief. Use your own users, the actions they take and the result they expect.

```sh
npx skills add iodigital-com/io-skills --skill '*'
```

Want to try your own idea straight away? Use the [starter prompt for an empty project directory](../skills/prototype-shell.md#you-are-starting-in-an-empty-directory) to have your agent set up the project and build the first clickable scenario.

## Find out what the cyclist needs to know

The client asks for “product comparison”. Before designing it, find out what decision the cyclist is trying to make. Use [interview-me](../skills/interview-me.md) during your conversation with the client.

```prompt
Use interview-me. I’m the client commissioning the new feature. Our webshop sells front lights, bike bags and bike locks. Parents want to compare two models on their phones with their children. Start with one question about a real purchase, such as choosing a light for the ride to school on a dark winter morning. Then ask what matters when choosing a bag or lock. Summarise the choices shared by all categories and the data we need for each.
```

[View example output · brief for the product comparison feature](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=briefing)

Play the client using the [completed brief](briefing.md). Explain why a cyclist asks about the highest setting for a light and where a bag attaches. Record the confirmed goal, the nine sample products and the open question about comparing three models at once in `briefing.md`.

## Write the acceptance example before the first screen

Once the client confirms the cyclist’s shopping journey, use [spec-driven-development](../skills/spec-driven-development.md). The spec gives the client and the team the same example to try once the full journey is ready.

```prompt
Use spec-driven-development. Read briefing.md and write the product spec in English in spec/product-comparison.md. Describe how a cyclist opens a category, selects two distinct models, compares their prices and attributes, and orders one. Use the two comparisons from the brief as acceptance examples. Compare the €39 and €69 front lights, then the 2-litre and 5-litre bags. Show that only the ordered model appears in the basket and on the confirmation. Use the €69 light for that order. Leave comparing three models at once as an open question.
```

[View example output · product spec with acceptance examples](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=spec)

Can you predict what the confirmation should say? Of the two lights compared, only the one ordered appears in the basket and on the confirmation. In the demo, choose the Route 800 and expect one light at €69 in both places.

## Decide what needs to sit together on a phone

The shopping journey is agreed. The client now needs to see whether a cyclist can compare the correct values on a narrow screen. Give the spec to [design-spec](../skills/design-spec.md).

```prompt
Use design-spec with spec/product-comparison.md. In spec/product-comparison.design.md, sketch the shop, category, comparison and basket in English for phone and desktop. Show how a cyclist can tell which value belongs to each model, where the models differ and how to choose one. Use the lights from the acceptance example to illustrate price, light output and run time on the highest setting. Show how the same layout presents price, capacity and mounting position for bags.
```

[View example output · design spec for the comparison screen](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=design)

Look at the phone wireframe and find the same details on screen. Ask a colleague which light costs €30 more, how much longer it runs on the highest setting and which button selects just that light. If they mix up the models or settings, revise the wireframe.

## Let the client try the shopping journey

Use [prototype-shell](../skills/prototype-shell.md) to create a project copy of the bundled starter. The starter comes with a different example. This prompt asks your agent to create the shop’s screens and sample data in that copy.

```prompt
Use prototype-shell. Create a project copy in prototype-review/ with the nine sample products from briefing.md. Follow the spec and design to build the shop with three categories, selection of any two models within a category and the comparison with the appropriate rows. Each purchase button should add one chosen item. Connect the basket to a local test checkout with sample details. Give me a shop entry link and a shareable link that opens the two lights from the acceptance example in the comparison at phone width.
```

[View example output · interactive comparison of both lights](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light)

The example output opens the two lights. [Open the bike bags next](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=bags&format=phone&scenario=buy-light), select Frame 2 and Stuur 5, and compare them. Can you find 2 L for the frame bag and 5 L for the handlebar bag? Choose ‘Copy situation link’ for that comparison, open it in another window and check that the same two bags appear.

## Record the decision from the review

Suppose a member of the shop team reads “3 hours” during the review and asks which setting that refers to. The client wants the setting to stay next to each value even after scrolling. Record this refinement first with [spec-driven-development](../skills/spec-driven-development.md).

```prompt
Use spec-driven-development to record this confirmed decision in spec/product-comparison.md. On a phone, each light shows the setting directly beside the run time, for example ‘3 hours on the highest setting’. Add an acceptance example for both models. Then use design-spec and prototype-shell to update the sketch and the mobile comparison in the project copy.
```

[View example output · review decision on run time at the highest setting](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=review-decision)

Open the comparison at phone width and scroll to run time. Can you see 2 hours for one light and 3 for the other, each labelled as measured on the highest setting? Does the client want to show the journey to colleagues after the review? Copy the verified link to this comparison and replace `<review-link>` in this optional prompt for [functional-analysis](../skills/functional-analysis.md).

```prompt
Use functional-analysis with spec/product-comparison.md. In spec/FA.md, write a short explanation in English for a shop colleague demonstrating the shopping journey. Use the labels shown on screen. Place <review-link> beside the step where the cyclist compares run times. Open the link in a fresh session to check that it shows the right comparison.
```

[View example output · comparison walkthrough for the client](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=fa)

## Choose a first part you can demonstrate

Once the client approves the design, use [planning-and-task-breakdown](../skills/planning-and-task-breakdown.md). Make the tasks small enough to review the category-specific rows early.

```prompt
Use planning-and-task-breakdown with spec/product-comparison.md. Plan a local browser app in app/. Start in the shop and build selection and comparison for lights first. Use bags and locks in a second demonstration to show that the category controls which rows appear. Then plan the basket and local test checkout. Give each task a user action, visible outcome and test.
```

[View example output · build plan from selection to test order](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=plan-new)

The first task is small enough if you can select the two lights in the category and compare them on a phone while checkout is still to come.

## Build the comparison, then the purchase

Use [incremental-implementation](../skills/incremental-implementation.md) once the plan is approved. With [test-driven-development](../skills/test-driven-development.md), first show which behaviour is still missing in the working app.

```prompt
Use incremental-implementation and test-driven-development in app/. Start with a failing behaviour test that selects two models and checks that the comparison rows show the values from the brief for each one. For the pair of front lights in the spec, check price, light output and run time on the highest setting. For the pair of bags, check price, capacity and mounting position. Build this step, rerun the tests and give me the test command.
```

[View example output · behaviour test for the comparison rows](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=test-compare)

Check both phone views against the [product data in the brief](briefing.md). Then choose a different pair within one category. Do you see the details for exactly those two products?

```prompt
Use test-driven-development to test that only the chosen model reaches the basket and the confirmation. Compare the two lights and tap ‘Add to basket’ on the €69 light. Check that the basket contains one Route 800 at €69. Complete the test order with local sample details and check the same model, quantity and price on the confirmation. Show the failure first, implement the interaction and rerun the comparison tests too. Keep checkout entirely local.
```

[View example output · test that only the chosen model reaches confirmation](/prototypes/bike-shop/index.html?lang=en&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=test-order)

## Review the change against the shopping agreement

Once the tests pass, use [code-review-and-quality](../skills/code-review-and-quality.md). Ask the reviewer to follow the data as the cyclist moves between screens.

```prompt
Use code-review-and-quality on the change in app/. Compare the implementation and tests with spec/product-comparison.md. Check the rows for lights, bags and locks, the product ID behind each purchase button and where the confirmation gets its total. For each finding, give its location in the code, its effect on the cyclist and a way to reproduce it.
```

[View example output · code review of the comparison, basket and confirmation](/prototypes/bike-shop/index.html?lang=en&screen=basket&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=review)

Fix findings about the agreed behaviour and rerun the affected tests. If comparing three models at once comes up again, record the client’s decision in the spec first. Update the affected screens, tests and any functional analysis when you agree a change.

## Decide whether the practice version is ready for handover

Use [shipping-and-launch](../skills/shipping-and-launch.md) when someone else needs to assess the tested version.

```prompt
Use shipping-and-launch for the local handover. Start the shopping journey on the shop page at phone width. Order one of the two lights you compared and check the selected model, quantity and price on the confirmation. Then compare two bags and two locks and check the attributes for each category. Connect each acceptance point to an observation or test, record the version and start instructions, and identify the decision still with the client.
```

[View example output · handover of the tested shopping journey](/prototypes/bike-shop/index.html?lang=en&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=handover)

A colleague can now start on the shop homepage, compare two models and order one without assistance. In the worked test order, the confirmation shows one front light, the Route 800, at €69.
