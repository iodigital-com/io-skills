# Example results for the bike shop

These are the work products for the new comparison feature. The children’s bike shop sells front lights, bike bags and bike locks to families. One tutorial starts with an empty project for a working prototype. The other adds the feature to the existing shop.

## The shop owner’s brief {#briefing}

**The request.** “My customers have already found the right department. Can they put two models side by side on their phone and order the one they choose?”

**What informs the choice?** A parent riding to school with her child in winter wants to know how bright each light is and how long it lasts on the highest setting. For a bag, she needs to know whether it holds a lunchbox and raincoat and where it attaches to the bike. For a lock, the type and length matter. Price and availability appear in every comparison.

**First release.** Pick any two different models from the same category. Choose **Add to basket** under the chosen model. Whether shoppers want to compare three models at once remains open. [Start in the bike shop](prototype:store?role=cyclist&state=ready&record=categories).

## Current purchase route and available data {#context}

The shop in the brief already sells through its categories, product pages, basket and checkout. The comparison adds an entry point to that basket.

- **Product data.** In the demo, `shop/catalog.js` groups nine models by category. Each has an ID and a price. For Frame 2 these are `frame-2` and €29. The bag also has a capacity of 2 litres and mounts to the frame. Lights use lumens and runtime on the highest setting. Locks use type and length in centimetres.
- **Purchase action.** In `shop/shop.js`, each button in `comparisonPage()` passes the product ID from its own column. The basket uses it for the name and price. [Open the basket with Frame 2](prototype:basket?role=cyclist&state=ready&record=frame-2).
- **Still to verify with the retailer.** Check the original product-page purchase action in the shop’s application. Have the retailer confirm the units and test setting before placing source values in the same comparison row.

## Review decision on runtime {#review-decision}

**Observation.** After scrolling, a shop colleague reads ‘3 hours’ under the Route 800. The copy explaining the test setting above the table is off screen.

**Decision and acceptance check.** Include the setting with each value. At phone width, the Stad 400 cell reads ‘2 hours on the highest setting’ and the Route 800 cell reads ‘3 hours on the highest setting’. This decision applies to the runtime row in Front lights. [View the two cells at phone width](prototype:compare?role=cyclist&state=ready&record=lights&format=phone).

## Build plan for the standalone prototype {#plan-new}

1. **First demonstration.** Open Front lights from the shop. One checked box keeps comparison disabled. Two open the comparison for exactly those lights. The test matches each price, brightness and runtime to the correct column. [Open Front lights](prototype:catalog?role=cyclist&state=ready&record=lights).
2. **Reuse the module.** Apply the same selection to Bike bags and Bike locks. Compare capacity and mounting point for Frame 2 and Stuur 5, then compare type and length for two locks. [Open the bag comparison](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).
3. **Order the chosen model.** Connect both purchase buttons to the basket. Follow one Route 800 at €69 through the test checkout and confirmation. Repeat the purchase from another category.

## Build plan for the existing shop {#plan-existing}

1. **Selection on the existing category card.** Locate the category card, the product model and the link to the product page. Add a checkbox and a count. After making two selections, the cyclist can clear either box and select another model from the category. Also check the original route to the product page.
2. **Comparison within a category.** The category supplies the rows and the selected products supply the column values. Frame 2 and Stuur 5 should show 2 L and 5 L respectively. [View the bags](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).
3. **Connect the existing purchase action.** Each column passes the same product ID as the corresponding product page. Check the model and quantity confirmed by the existing checkout for each entry point.

## Behaviour test for the comparison {#test-compare}

The test selects two products from one category. Selecting the second enables the comparison button and disables the remaining checkboxes. Clear either selection and any other model in the list becomes available again.

| Tested pair | Left column | Right column |
| --- | --- | --- |
| Stad 400 and Route 800 | €39, 400 lumens, 2 hours on the highest setting | €69, 800 lumens, 3 hours on the highest setting |
| Frame 2 and Stuur 5 | €29, 2 L, Frame | €49, 5 L, Handlebar |
| Kabel 90 and Ketting 110 | €19, Cable, 90 cm | €49, Chain, 110 cm |

The first light comparison test expected ‘2 hours on the highest setting’ and found ‘2 hours’. The revised cell includes the setting. The current browser test checks the price and two category-specific attributes for every product in all nine pairs. [Try two bags](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).

Start the site with `pnpm dev`. Run `pnpm run test:shop` in `packages/prototype-shell/checks`. Set `SHOP_BASE_URL=http://127.0.0.1:4173` to test the preview on port 4173.

## Behaviour test for one test order {#test-order}

**Action.** Choose ‘Add to basket’ under Route 800. The accessible name also includes the model, so the test activates the right button.

**Result.** The basket contains one Route 800. The item and total are €69, with free collection. The same check passes at checkout and on the confirmation. The other light in the comparison never appears in the order. [View the basket](prototype:basket?role=cyclist&state=ready&record=route-800) or [open the confirmation](prototype:confirmation?role=cyclist&state=ready&record=route-800).

## Tests for the new and existing purchase routes {#test-existing}

- **New comparison.** Both language paths were tested with all nine pairs in the same English shop. One purchase per pair took every product through the basket to confirmation. [View the Stuur 5 confirmation](prototype:confirmation?role=cyclist&state=ready&record=stuur-5).
- **Category change.** Select one light, return to the shop and open Bike bags. The count starts at zero. Select Frame 2 and Tour 18, add Tour 18 to the basket and remove it. The empty basket leads back to the bags for a fresh choice. [Open the empty basket](prototype:basket?role=cyclist&state=empty&record=none-bags).
- **Existing route.** In the original shop, add one Stad 400 from its product page. That separate regression check expects one Stad 400 at €39 on confirmation. Run it in the existing shop’s test environment.

## Code review against the purchase agreement {#review}

- **Selection and data.** In `shop/catalog.js`, each valid pair contains two products from the same category. In `shop/shop.js`, `comparisonPage()` uses the category’s attributes and each selected model’s ID. For bags, 2 L stays under Frame 2 and 5 L under Stuur 5. [Inspect the columns](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).
- **From button to order.** Each purchase button passes the ID from its own column. The same ID supplies the line item and total on the basket, checkout and confirmation screens. A shopper who picks Frame 2 sees one bag at €29. [Open the test checkout](prototype:checkout?role=cyclist&state=ready&record=frame-2).

## Handover of the local practice build {#handover}

**Tested version.** The local demo has six screens and nine products in `public/prototypes/bike-shop/`. Run the documentation site with `pnpm dev` and open the demo from the tutorial. [Start in the shop](prototype:store?role=cyclist&state=ready&record=categories).

**Result.** All 20 Chrome browser tests passed. The Dutch tutorial path at phone width and the English path at desktop width covered the nine pairs, an order for each model, changing categories and emptying the basket. The retailer can demonstrate all three categories with fictional order details.

## Release assessment for the existing shop {#release}

**Ready for the retailer’s review.** A shopper can choose any two models within each category and order either one. The confirmation shows, for example, one Tour 18 at €79 or one Beugel 23 at €59. [View the Beugel 23 confirmation](prototype:confirmation?role=cyclist&state=ready&record=beugel-23).

**Before publication.** Record the tested build, spec version and outcome of the original product-page purchase in the shop’s implementation PR. The retailer can decide after the review whether to add a third comparison column.
