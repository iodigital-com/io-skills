# Add a product comparison to an existing shop

Add a feature to a live site by finding the existing agreements in the code and spec, specifying what changes and reviewing the design before connecting it to the existing basket. Each step links to the skill to use at that point.

Wobble Wheel is a fictional children’s bike shop selling front lights, bike bags and bike locks. The webshop has a page for each product, a working basket and checkout. Visitors have to switch between product pages to weigh up two models. The retailer wants visitors to compare any two distinct models in a category as the range grows.

A parent rides to school with her child before it gets light. They are choosing a front light together. The Stad 400 costs €39 and delivers 400 lumens for two hours on the highest setting. The Route 800 costs €69 and delivers 800 lumens for three hours on that setting. She wants to see what the extra €30 buys her. Choosing a bag for a lunchbox and a raincoat raises different questions. Where does it fit on the bike and how much will it hold?

The [completed brief](briefing.md) lists the nine sample products and the attributes compared in each category.

[Try the shop in the prototype shell](/prototypes/bike-shop/index.html?lang=en&screen=store&role=cyclist&state=ready&record=categories&format=phone&scenario=buy-light&tutorial=existing-project). Choose Front lights on the shop page. Select Stad 400 and Route 800, open the comparison and order one of them using the sample details. The demo uses English for its shop, review controls, product spec and design spec. The functional walkthrough and prompt results follow the tutorial language.

**Follow along in your own project.** [Install the skills](install.md) in the existing shop repository. Give the agent the start instructions, catalog data and current agreements from Git or Confluence. With the demo alone, you can follow the brief, review the design and try the shopping journey in the shell.

## Map the current shopping journey

Use [context-engineering](../skills/context-engineering.md) before deciding where the comparison belongs. Find out which product details the shop already has and how a product page adds an item to the basket.

```prompt
Use context-engineering. Trace an existing purchase from the shop through category and product page to basket and test confirmation. Find the current Add to basket action and its test. Where do product ID and price come from? Which fields hold light run time, bag capacity and mount, and lock type and length? Compare what you find with our Git spec or Confluence analysis. For each missing value, identify who can confirm it.
```

[View example output · current shopping journey and available product data](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=context)

Record the build and document version. If the only run-time field for a light says “up to 8 hours”, ask the retailer which setting was used. All run times in the brief refer to the highest setting.

## Understand the choice the cyclist wants to make

Use [interview-me](../skills/interview-me.md) if “compare products” is the entire brief. Ask the retailer to answer with an actual conversation from the shop in mind.

```prompt
Use interview-me. I’m the retailer. A parent and her child are looking for a light for dark school mornings and a bag for a lunchbox. Ask me one question at a time. Where does she start in each case, which attributes help her choose and what does she want to do after comparing? Ask how she chooses a lock as well. Summarise the first release and open questions.
```

[View example output · brief for the product comparison feature](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=briefing)

The retailer confirms that price matters for every product. For lights the cyclist also compares lumens and run time on the highest setting, for bags capacity and mounting position, and for locks type and length. In the first release she chooses two distinct models in the same category. Comparing three at once remains an open question.

## Record the new agreement in the project spec

Use [spec-driven-development](../skills/spec-driven-development.md) once the retailer approves that proposal. The existing analysis of buying from a product page still describes the current shopping journey. The new spec describes what comparison adds to it.

```prompt
Use spec-driven-development. Record the approved feature ‘Compare two different models from the same category’ in our English product spec in Git. Use the nine sample products from the brief. Describe selection with zero, one and two models, removing a selection and the rows for each category. Take one acceptance example from Front lights to a confirmation showing one Route 800 at €69. In a second example, compare Frame 2 and Stuur 5 on price, litres and mount. Include a check of an existing product-page purchase. Link the previous analysis and record the open question about three at once.
```

[View example output · product spec with acceptance examples](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=spec)

Check the spec against the [product data in the brief](briefing.md). If the cyclist chooses the Route 800, the confirmation should show **1 × Route 800 at €69**. If the spec is in a separate repository, link the agreed commit to the implementation task.

## Design selection and comparison for a phone

Use [design-spec](../skills/design-spec.md) when you know *what* the cyclist should be able to do and want to discuss *where* she needs to tap.

```prompt
Use design-spec with the approved spec and existing category card. Write the design spec in English. Sketch the category on a phone with no selection, one model selected and two distinct models selected. Show how to replace a selection. Sketch the comparison first for lights, then for two bags. Keep each price, the two category attributes and the purchase button with the correct product. Reuse our existing purchase button and identify the product ID it passes.
```

[View example output · design spec for the comparison screen](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=design)

Ask a colleague to point out the button in the phone wireframe that adds the Route 800 to the existing basket. Have them use the same button on screen. Does the basket now contain one Route 800 at €69?

## Review the feature in the clickable prototype

Ask the retailer which light they would recommend for the early ride to school and why. Have them add their choice to the basket. Use [prototype-shell](../skills/prototype-shell.md) when you want to run this review using your own project’s components.

```prompt
Use prototype-shell to build the comparison in our project copy. Start on the shop page and let visitors choose any two products in each of the three categories. Show their category attributes and connect the purchase buttons to the existing basket and local test checkout. Give me a shareable phone view with Stad 400 and Route 800 and let me try a different pair from the shop.
```

[View example output · interactive comparison of both lights](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project)

Choose ‘Copy situation link’ for the front-light comparison. Do the same models appear when you reopen it? [Open the bike bags next](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=bags&format=phone&scenario=buy-light&tutorial=existing-project). Compare Frame 2 with Stuur 5. Choose ‘Add to basket’ under the handlebar bag and check that the basket shows one Stuur 5 at €49.

## Write the walkthrough for the retailer

Use [functional-analysis](../skills/functional-analysis.md) if the retailer wants a short functional explanation alongside the prototype. Give the agent the approved spec and the situation link you just checked. You can also go straight to planning the build.

```prompt
Use functional-analysis. Extend the existing shop guide for a member of staff demonstrating the new comparison. Describe how a visitor selects two products from Front lights, compares their run times and chooses one model. Place the supplied situation link beside the comparison step and give the reader one concrete thing to look for in the basket. Use the button labels from the prototype.
```

[View example output · comparison walkthrough for the retailer](/prototypes/bike-shop/index.html?lang=en&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=fa)

A colleague should be able to open the comparison from the guide and recognise which of the two lights they chose when they reach the basket.

## Plan the extension around existing components

Use [planning-and-task-breakdown](../skills/planning-and-task-breakdown.md) once the retailer has reviewed the first version. You are changing an existing screen and introducing a new one. Plan the work so there is something to demonstrate along the way.

```prompt
Use planning-and-task-breakdown. Turn the Git spec and existing components into two demonstrable pieces of work. Start with selection from a category and comparison with that category’s rows. Use lights and bags for the first demo. In the second step connect the purchase button to the existing basket and test checkout. Name the files, a visible outcome and an existing purchase route to retest for each step.
```

[View example output · build plan for the comparison and existing basket](/prototypes/bike-shop/index.html?lang=en&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=plan-existing)

In the first demo, let the retailer pick two models. Do the rows change correctly when they move from a light comparison to bike bags? The basket connection can wait for this demo.

## Build the comparison and connect the basket

Use [incremental-implementation](../skills/incremental-implementation.md) and [test-driven-development](../skills/test-driven-development.md) once the plan is approved.

```prompt
Use incremental-implementation and test-driven-development. Start with a failing test for two selected lights and another for Frame 2 against Stuur 5. Check that any chosen pair in the category shows the correct data. Then connect the basket. Verify one Route 800 at €69 through to test confirmation and, starting with an empty basket, one Stuur 5 at €49. Also run the existing tests for adding an item from a product page.
```

[View example output · tests for the new and existing shopping journeys](/prototypes/bike-shop/index.html?lang=en&screen=basket&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=test-existing)

Also try removing a selection before opening the comparison. The test order shows how the new feature joins the existing checkout. Use the test environment’s sample details.

## Review the feature for release

Use [code-review-and-quality](../skills/code-review-and-quality.md) and [shipping-and-launch](../skills/shipping-and-launch.md) when the comparison and basket integration work.

```prompt
Use code-review-and-quality with the agreed Git spec. Check selecting and replacing two models, the attributes for each category and both purchase buttons. Repeat the purchase from an existing product page. Use shipping-and-launch to record the tested build, scenarios covered, results and open decisions for the retailer.
```

[View example output · release assessment for the new comparison feature](/prototypes/bike-shop/index.html?lang=en&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=release)

Ask the retailer to compare and order in the release candidate. Record the result on the implementation PR. With separate repositories, link the implementation PR to the agreed spec commit and link back to the implementation PR from the spec PR.
