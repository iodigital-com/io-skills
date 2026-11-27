# Wobble Wheel shop design spec

A parent and child are getting their bikes ready for school. They compare lights for dark mornings, bags for a lunchbox or locks for the school bike rack. The [product spec](spec.md) gives prices, attributes and acceptance examples for all nine sample products. The sketches show the shop inside the review frame. Square brackets mark an action. Open the screens at phone size (390 × 780 px) or desktop size (1120 × 820 px).

**Shop identity.** A small mint-and-coral bicycle sits beside the rounded ‘Wobble Wheel’ wordmark. Nunito gives the headings a rounded shape at weights 900–950 and keeps body text readable at 600. Soft colour fields, thin borders and a small directional arrow identify each department. Beyond the overview, ‘Categories’ returns to the three departments. Review controls and documentation sit outside the shop frame.

| Colour | Use in the shop |
| --- | --- |
| Warm paper `#fcf8ef` | Page background |
| Dark ink `#362f39` | Wordmark, headings and body text |
| Butter yellow `#f6db82` | Welcome panel and front-light department |
| Sage mint `#b9d7bf` | Bike-bag department |
| Soft coral `#f1ad9e` | Bike-lock department |
| Deep green `#36594d` | Primary actions such as ‘Add to basket’ |

Each department keeps its English name and a recognisable product photograph alongside its colour. The hand-drawn welcome illustration shows a parent on a green step-through bicycle riding beside a child on a yellow bike, with an apple in its front basket. The shop uses simple geometric shapes, soft greens and a paper texture in that scene. The category cards feature the sage Route 800 light, the terracotta Tour 18 pannier and the striped green Ketting 110 chain lock. Product selection, comparison and order details reuse each model’s photo so the family can recognise it throughout the purchase.

## Choose a department {#store}

**Purpose.** The cyclist recognises the three types of accessory before choosing a model. Each category card has a product photo and leads to its assortment.

**Desktop · `categories`**

```text
Bicycle mascot   Wobble Wheel
+----------------------------------+---------------------+
| Bike accessories                 | Family on bikes     |
| Introduction to the shop         | illustration        |
+----------------------------------+---------------------+
+------------------+------------------+------------------+
| Front light photo| Bike bag photo   | Bike lock photo  |
| [Front lights]   | [Bike bags]      | [Bike locks]     |
+------------------+------------------+------------------+
```

At phone width the illustration moves below the introduction. The three department cards follow in a single column. Each card has its photograph on the left and its name and arrow on the right. Choose ‘Bike bags’ and check that the bag models appear. [Open the shop overview](prototype:store?role=cyclist&state=ready&record=categories).

## Select two products {#catalog}

**Purpose.** The cyclist picks two different models from the open category. Each card shows the product photo, name, price, a short category-specific description, availability and a checkbox with the model name in its accessible label.

**Phone · `bags`**

```text
Bike bags
+----------+-------------------------------------+
| Photo    | Frame 2   €29                       |
|          | 2 L · Frame                         |
|          | In stock  [ ] Compare               |
+----------+-------------------------------------+
| Photo    | Stuur 5   €49                       |
|          | 5 L · Handlebar                     |
|          | In stock  [ ] Compare               |
+----------+-------------------------------------+
| Photo    | Tour 18   €79                       |
|          | 18 L · Rear rack                    |
|          | In stock  [ ] Compare               |
+----------+-------------------------------------+
0 of 2 selected                      [Compare bags]
```

On desktop the cards form a three-column grid. Additional models continue on the next row. The counter and comparison button follow the models. Selecting two enables the button and disables the remaining checkboxes. Clear either choice and check that you can select any other model. [Try selecting two bike bags](prototype:catalog?role=cyclist&state=ready&record=bags).

## Compare two products {#compare}

**Purpose.** The cyclist reads the two values for each attribute side by side and orders from the corresponding column. The two products appear in catalogue order, even if the right-hand model was selected first.

**Phone and desktop · `stad-400~route-800`**

```text
+----------------------+----------------------+
| Stad 400 photo       | Route 800 photo      |
| Stad 400             | Route 800            |
+----------------------+----------------------+
| Price                                       |
| €39                  | €69                  |
| Brightness                                  |
| 400 lumens           | 800 lumens           |
| Runtime on the highest setting              |
| 2 hours on the       | 3 hours on the       |
| highest setting      | highest setting      |
| Availability                                |
| In stock             | In stock             |
+----------------------+----------------------+
| [Add to basket]      | [Add to basket]      |
+----------------------+----------------------+
 [Browse front lights]
```

The table begins below the title and a short explanation of the brightness setting. Each attribute label spans the full table width above its pair of values. Each runtime cell repeats the setting so the cyclist can still read ‘2 hours on the highest setting’ under the Stad 400 and ‘3 hours on the highest setting’ under the Route 800 after scrolling. Column headings, attributes and values are also associated for screen readers.

**Actions and check.** Choose ‘Add to basket’ under the Route 800. The basket must contain that light at €69. Repeat with the button on the left for the Stad 400 at €39. Check that keyboard users can reach each button separately and that its accessible name includes the model.

**Other categories.** For bike bags, capacity and mounting position sit between price and availability. For bike locks those rows show lock type and length. Each column keeps its product photo, model name and order button. [View Frame 2 and Tour 18](prototype:compare?role=cyclist&state=ready&record=frame-2~tour-18) or [compare Kabel 90 and Beugel 23](prototype:compare?role=cyclist&state=ready&record=kabel-90~beugel-23).

**The same layout for bike bags on a phone · `frame-2~stuur-5`**

```text
+---------------------+---------------------+
| Photo Frame 2       | Photo Stuur 5       |
| Frame 2             | Stuur 5             |
+---------------------+---------------------+
| Price                                     |
| €29                 | €49                 |
| Capacity                                  |
| 2 L                 | 5 L                 |
| Mounting point                            |
| Frame               | Handlebar           |
| Availability                              |
| In stock            | In stock            |
+---------------------+---------------------+
| [Add to basket]     | [Add to basket]     |
+---------------------+---------------------+
```

[Open this pair in the shop](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5&format=phone).

## Check the basket {#basket}

**Purpose.** Before checkout, the cyclist sees which model and quantity she has chosen and what she will pay. The sample basket contains one unit of one model.

**Desktop · `ready` · `cyclist` · `route-800`**

```text
+---------------------------+-----------------------------+
| Basket                                                  |
+---------------------------+-----------------------------+
| Photo  Route 800      €69 | Order summary               |
|        800 lumens         | Items               €69     |
|        Quantity · 1       | Collect in store   Free     |
| [Remove]                  | Total               €69     |
|                           | [Continue to test checkout] |
+---------------------------+-----------------------------+
 [Choose a different light]
```

**Phone · same situation**

```text
+---------------------------------+
| Photo  Route 800            €69 |
|        800 lumens · Quantity · 1|
| [Remove]                        |
+---------------------------------+
| Order summary                   |
| Items                       €69 |
| Collect in store           Free |
| Total                       €69 |
| [Continue to test checkout]     |
+---------------------------------+
 [Choose a different light]
```

At widths of 620 px and below, the order summary moves below the item. ‘Choose a different light’ opens the comparison. The `stad-400` situation uses the same layout with its own photo and model name, 400 lumens and €39 for both the item and the total.

**Empty basket and check.** ‘Remove’ opens `empty` with record `none`. Below ‘Basket’, a panel shows a bag icon, ‘Your basket is empty.’ and ‘Browse front lights’. The item and order summary disappear together. Follow the remaining action to start again at the category.

Bags and locks use the same basket layout. Removing a bag leaves an empty basket with a link to Bike bags (`none-bags`). For locks the link returns to Bike locks (`none-locks`).

**Phone and desktop · `empty` · `cyclist` · `none`**

```text
+--------------------------+
| Basket                   |
+--------------------------+
| Bag icon                 |
| Your basket is empty.    |
| [Browse front lights]    |
+--------------------------+
```

## Place the test order {#checkout}

**Purpose.** The cyclist checks the sample customer details, collection method and chosen item. The text below the title explains that the checkout uses fictional details and that nothing will be charged or shipped.

**Desktop · `ready` · `cyclist` · `route-800`**

```text
+---------------------------+-------------------------+
| Test checkout                                       |
+---------------------------+-------------------------+
| Details for this test     | Order summary           |
| Name     Example customer | Photo  Route 800    €69 |
| Email   demo@example.test |        800 lumens       |
| Delivery                  |        Quantity · 1     |
|          Collect in store | Items               €69 |
|                           | Collect in store   Free |
|                           | Total               €69 |
|                           | [Place test order]      |
+---------------------------+-------------------------+
 [Back to basket]
```

**Phone · same situation**

```text
+---------------------------------+
| Details for this test           |
| Name, email and delivery        |
+---------------------------------+
| Order summary                   |
| Photo  Route 800            €69 |
|        800 lumens · Quantity · 1|
| Items, collection and total     |
| [Place test order]              |
+---------------------------------+
 [Back to basket]
```

The customer details are read-only values. ‘Collect in store’ is free. At widths of 620 px and below, the details appear above the order summary. The primary action follows the total. Below it, ‘Back to basket’ returns the cyclist to the same light.

**Check.** Open checkout with the Stad 400 first. Verify €39 on the item and total, then go back and choose the Route 800. Place the €69 test order. Only the chosen light should appear on the confirmation.

## Recognise the order {#confirmation}

**Purpose.** The cyclist receives a recognisable confirmation of her choice and can try the exercise again.

**Phone and desktop · `ready` · `cyclist` · `route-800`**

```text
+----------------------------------+
| Check mark                       |
| Order confirmed                  |
| Your test order has been placed. |
+----------------------------------+
| Ordered light                    |
| Photo  Route 800            €69  |
|        800 lumens · Quantity · 1 |
| Items                       €69  |
| Collect in store           Free  |
| Total                       €69  |
+----------------------------------+
 [Start again]
```

A check mark appears above ‘Order confirmed’. The product photo, quantity and total below it let the parent check what was ordered. The order details fit the available width in a narrow frame.

**Check.** Compare the photo, model name, quantity and total with the previous step. With `stad-400`, expect one Stad 400 at €39. ‘Start again’ opens the category, where the cyclist can select any two models for a new comparison.
