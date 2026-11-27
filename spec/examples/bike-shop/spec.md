# Wobble Wheel product comparison spec

Wobble Wheel is a fictional children’s bike shop. A parent and child are preparing for the ride to school. They want a light for dark mornings, a bag for a lunchbox and a lock for the bike rack. The parent chooses two different models from the same product category to compare on her phone. She can choose any pair, however many models the category contains. A button under each model opens the basket with one unit. A local test checkout and confirmation complete the purchase.

## Example assortment

The comparison screen takes its rows from the category and its values from the two selected products. Every category shows price and availability. All nine sample products are in stock.

| Front light | Price | Brightness | Runtime on the highest setting |
| --- | --- | --- | --- |
| Stad 400 | €39 | 400 lumens | 2 hours |
| Route 800 | €69 | 800 lumens | 3 hours |
| Trail 1200 | €99 | 1200 lumens | 4 hours |

| Bike bag | Price | Capacity | Mounting position |
| --- | --- | --- | --- |
| Frame 2 | €29 | 2 litres | Frame |
| Stuur 5 | €49 | 5 litres | Handlebar |
| Tour 18 | €79 | 18 litres | Rear rack |

| Bike lock | Price | Lock type | Length |
| --- | --- | --- | --- |
| Kabel 90 | €19 | Cable lock | 90 cm |
| Ketting 110 | €49 | Chain lock | 110 cm |
| Beugel 23 | €59 | U-lock | 23 cm |

## Acceptance examples

- Open a category. The comparison button stays disabled with zero or one model selected. Choosing two different models enables it. Clear either selection to choose another model from the same list.
- For example, in a category with five models, select the fourth and fifth. The comparison shows exactly those two models.
- In Bike bags, select Tour 18 and then Frame 2. The comparison shows Frame 2 on the left and Tour 18 on the right, in catalogue order. Share the situation and open it from the Dutch tutorial. The shop shows the same two bags and their attributes side by side in English.
- Compare Stad 400 and Route 800 on a phone. The values ‘2 hours on the highest setting’ and ‘3 hours on the highest setting’ each remain legible within the corresponding product cell.
- Compare Kabel 90 and Beugel 23. Their columns show a 90 cm cable lock and a 23 cm U-lock respectively. Choose Beugel 23. The basket, test checkout and confirmation each show one Beugel 23 at €59. Collection is free.
- Remove a bag from the basket. The empty basket leads back to Bike bags. The cyclist can choose another category from the shop overview.

In an existing shop the comparison adds a second way into the basket. In that application, also check the original route. Add the Stad 400 from its product page and complete the test checkout. Expect one Stad 400 at €39 on the confirmation.

## Open question

Would the retailer like to compare three models **at once** in a future version? The current agreement is two products from one category. [Open the design spec](design.md).
