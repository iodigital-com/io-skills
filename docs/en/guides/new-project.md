# Start a new project

Turn a brief into a testable spec, review the screens with the client and build a product comparison feature in small steps. Each step names the skill, gives you a prompt and tells you what to check.

In this tutorial you work on Wobble Wheel, a fictional children’s bike shop. Its webshop already sells front lights, bike bags and bike locks for the school run. The retailer wants a new feature. Within each category, a cyclist should be able to compare any two distinct models and order one. You start in an empty project directory and build a local trial version for the retailer to assess.

| Category | What does the cyclist want to compare? | Example choice |
| --- | --- | --- |
| Front lights | Price, light output and run time on the highest setting | What do we gain on the early school run by spending €30 more on the Route 800? |
| Bike bags | Price, capacity in litres and mounting position | How much room do the Frame 2 and Stuur 5 have for a lunchbox and a raincoat? |
| Bike locks | Price, type and length | Would I rather use the Kabel 90 or the Ketting 110 to secure my bike? |

The [completed brief](briefing.md) lists all nine sample products. You follow one purchase from start to finish, then use bags to check that the comparison changes with the category. Orders use local sample data.

[Try the shop in the prototype shell](/prototypes/bike-shop/index.html?lang=en&screen=store&role=cyclist&state=ready&record=categories&format=phone&scenario=buy-light). Choose Front lights on the shop page, select Stad 400 and Route 800, choose ‘Compare lights’ and place a test order for one light. The demo uses English for its shop, review controls, product spec and design spec. The functional walkthrough and prompt results follow the tutorial language.

Start in an empty project directory. With [access to the iO Skills repository](install.md), run this command, choose your agent when prompted and start a session in that directory. Paste one prompt at a time. For your own project, substitute one recognisable customer journey from your brief, with your own shop, products and decisions.

```sh
npx skills add iodigital-com/io-skills --skill '*'
```

## Find out what the cyclist needs to know

The shop asks for “product comparison”. Before designing it, find out what decision the cyclist is trying to make. Use [interview-me](../skills/interview-me.md) during your conversation with the shop.

```prompt
Use interview-me. I’m the retailer. Our webshop sells front lights, bike bags and bike locks. Parents want to compare two models on their phones with their children. Start with one question about a real purchase, such as choosing a light for the ride to school on a dark winter morning. Then ask what matters when choosing a bag or lock. Summarise the choices shared by all categories and the data we need for each.
```

[View example output · brief for the product comparison feature](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=briefing)

Play the retailer using the [completed brief](briefing.md). Explain why a cyclist asks about the highest setting for a light and where a bag attaches. Record the confirmed goal, the nine sample products and the open question about comparing three models at once in `briefing.md`.

## Write the acceptance example before the first screen

Once the shop confirms the journey, use [spec-driven-development](../skills/spec-driven-development.md). The spec gives the shop and the team the same example to try once the full journey is ready.

```prompt
Use spec-driven-development. Read briefing.md and write the product spec in English in spec/product-comparison.md for the existing bike shop. Start with choosing a category. Describe how a cyclist selects any two distinct models from that category, compares price and the two category attributes, then orders one. Use the supplied product data. Write acceptance examples for Stad 400 against Route 800 and Frame 2 against Stuur 5. Follow one Route 800 at €69 through to local test confirmation. Leave comparing three models at once as an open question.
```

[View example output · product spec with acceptance examples](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=spec)

Can you predict what the confirmation should say? When the cyclist chooses the Route 800 in the comparison, you expect one Route 800 at €69 in the basket and on the confirmation. The Stad 400 was selected for comparison only.

## Decide what needs to sit together on a phone

The shopping journey is agreed. The shop now needs to see whether a cyclist can compare the correct values on a narrow screen. Give the spec to [design-spec](../skills/design-spec.md).

```prompt
Use design-spec with spec/product-comparison.md. In spec/product-comparison.design.md, sketch the shop, category, comparison and basket in English for phone and desktop. Use Stad 400 and Route 800 to show how each price, light output, run time on the highest setting and purchase button stays with its model. Sketch the same screen for Frame 2 and Stuur 5 with capacity and mounting position. Mark the elements shared by both categories.
```

[View example output · design spec for the comparison screen](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=design)

Look at the phone wireframe and find the same details on screen. Ask a colleague which light costs €30 more, how much longer it runs on the highest setting and which button selects just that light. If they mix up the models or settings, revise the wireframe.

## Let the shop try the shopping journey

Use [prototype-shell](../skills/prototype-shell.md) to create a project copy of the bundled starter. The starter comes with a different example. This prompt asks your agent to create the shop’s screens and sample data in that copy.

```prompt
Use prototype-shell. Create a project copy in prototype-review/ with the nine sample products from briefing.md. Follow the spec and design to build the shop with three categories, selection of any two models within a category and the comparison with the appropriate rows. Each purchase button should add one chosen item. Connect the basket to a local test checkout with sample details. Give me a shop entry link and a shareable phone view of Stad 400 beside Route 800.
```

[View example output · interactive comparison of both lights](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light)

The example output opens the two lights. [Open the bike bags next](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=bags&format=phone&scenario=buy-light), select Frame 2 and Stuur 5, and compare them. Can you find 2 L for the frame bag and 5 L for the handlebar bag? Choose ‘Copy situation link’ for that comparison, open it in another window and check that the same two bags appear.

## Record the decision from the review

Suppose a member of the shop team reads “3 hours” during the review and asks which setting that refers to. The shop wants the setting to stay next to each value even after scrolling. Record this refinement first with [spec-driven-development](../skills/spec-driven-development.md).

```prompt
Use spec-driven-development to record this confirmed decision in spec/product-comparison.md. On a phone, each light shows the setting directly beside the run time, for example ‘3 hours on the highest setting’. Add an acceptance example for both models. Then use design-spec and prototype-shell to update the sketch and the mobile comparison in the project copy.
```

[View example output · review decision on run time at the highest setting](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=review-decision)

Open the comparison and read the value for the Stad 400, then the one for the Route 800. Does the shop want to show the journey to colleagues after the review? Copy the verified link to this comparison and replace `<review-link>` in this optional prompt for [functional-analysis](../skills/functional-analysis.md).

```prompt
Use functional-analysis with spec/product-comparison.md. In spec/FA.md, write a short explanation in English for a shop colleague demonstrating the shopping journey. Use the labels shown on screen. Place <review-link> beside the step where the cyclist compares run times. Open the link in a fresh session to check that it shows the right comparison.
```

[View example output · comparison walkthrough for the retailer](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=fa)

## Choose a first part you can demonstrate

Once the retailer approves the design, use [planning-and-task-breakdown](../skills/planning-and-task-breakdown.md). Make the tasks small enough to review the category-specific rows early.

```prompt
Use planning-and-task-breakdown with spec/product-comparison.md. Plan a local browser app in app/. Start in the shop and build selection and comparison for lights first. Use bags and locks in a second demonstration to show that the category controls which rows appear. Then plan the basket and local test checkout. Give each task a user action, visible outcome and test.
```

[View example output · build plan from selection to test order](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=plan-new)

The first task is small enough if you can select the two lights in the category and compare them on a phone while checkout is still to come.

## Build the comparison, then the purchase

Use [incremental-implementation](../skills/incremental-implementation.md) once the plan is approved. With [test-driven-development](../skills/test-driven-development.md), first show which behaviour is still missing in the working app.

```prompt
Use incremental-implementation and test-driven-development in app/. Start with a failing behaviour test. In the shop, choose Front lights, select Stad 400 and Route 800, and check price, lumens and run time on the highest setting against the brief. Then add a test for Frame 2 and Stuur 5 that checks price, capacity and mounting position. Implement the required step, rerun the tests and give me the test command.
```

[View example output · behaviour test for the comparison rows](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=test-compare)

Check both phone views against the [product data in the brief](briefing.md). Then choose a different pair within one category. Do you see the details for exactly those two products?

```prompt
Use test-driven-development for the next task. Have a test tap ‘Add to basket’ for the Route 800 in the comparison and check that the basket contains only 1× Route 800 at €69. Complete the test checkout with local sample details and check the same item, quantity and price on the confirmation. Show the failure first, then implement the interaction and rerun the comparison tests as well. Keep the checkout entirely local.
```

[View example output · test for one Route 800 at €69](/prototypes/bike-shop/index.html?lang=en&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=test-order)

## Review the change against the shopping agreement

Once the tests pass, use [code-review-and-quality](../skills/code-review-and-quality.md). Ask the reviewer to follow the data as the cyclist moves between screens.

```prompt
Use code-review-and-quality on the change in app/. Compare the implementation and tests with spec/product-comparison.md. Check the rows for lights, bags and locks, the product ID behind each purchase button and where the confirmation gets its total. For each finding, give its location in the code, its effect on the cyclist and a way to reproduce it.
```

[View example output · code review of the comparison, basket and confirmation](/prototypes/bike-shop/index.html?lang=en&screen=basket&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=review)

Fix findings about the agreed behaviour and rerun the affected tests. If comparing three models at once comes up again, record the shop’s decision in the spec first. Update the affected screens, tests and any functional analysis when you agree a change.

## Decide whether the practice version is ready for handover

Use [shipping-and-launch](../skills/shipping-and-launch.md) when someone else needs to assess the tested version.

```prompt
Use shipping-and-launch for the local handover. Start the shopping journey on the shop page at phone width. Check the confirmation for one Route 800 at €69, then compare two bags and two locks using their own attributes. Connect each acceptance point to an observation or test, record the version and start instructions, and identify the decision still with the retailer.
```

[View example output · handover of the tested shopping journey](/prototypes/bike-shop/index.html?lang=en&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=handover)

A colleague can now open that version, compare both models and use sample details to reach a confirmation for 1× Route 800 at €69.
