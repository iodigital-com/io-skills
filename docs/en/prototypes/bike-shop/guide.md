# Compare products and place an order in the bike shop

At Wobble Wheel, a fictional children’s bike shop, you compare accessories for the school run. A parent and child are looking for a bag for a lunchbox and a raincoat. A frame bag keeps the handlebars clear. A larger bag on the rear rack offers more space. Follow the purchase through to confirmation.

## Choose a category {#store}

The shop has three departments. Choose **Front lights** for a ride in the dark, **Bike bags** for luggage or **Bike locks** to secure the bike. In that category, pick the two models you want to see side by side. [Open the shop overview](prototype:store?role=cyclist&state=ready&record=categories).

## Select two models {#catalog}

Open **Bike bags**. Select Frame 2 and Tour 18. When the counter reads **2 of 2 selected**, choose **Compare bags**. To try Stuur 5, clear one of the other bags first. [Open Bike bags](prototype:catalog?role=cyclist&state=ready&record=bags).

## Read the differences {#compare}

Frame 2 costs €29 and holds 2 litres on the frame. Tour 18 costs €79 and holds 18 litres on the rear rack. The same comparison screen shows brightness and runtime on the highest setting for lights. For locks it shows the type and length. Every category also shows price and availability. [Compare the two bags](prototype:compare?role=cyclist&state=ready&record=frame-2~tour-18) or [compare two locks](prototype:compare?role=cyclist&state=ready&record=kabel-90~beugel-23).

The Stad 400 reads ‘2 hours on the highest setting’ and the Route 800 reads ‘3 hours on the highest setting’. The setting stays with each value when you scroll. [Open the front-light comparison at phone width](prototype:compare?role=cyclist&state=ready&record=stad-400~route-800&format=phone).

## Check the basket {#basket}

Choose **Add to basket** under Tour 18. The basket contains one Tour 18 at €79. Choose **Remove**, then **Browse bike bags** to start a new selection. [See the full basket](prototype:basket?role=cyclist&state=ready&record=tour-18) or [open the empty basket for bike bags](prototype:basket?role=cyclist&state=empty&record=none-bags).

## Place the test order {#checkout}

Choose **Continue to test checkout** in the basket. Check the example customer, collection in store and the total. Choose **Place test order** to complete the purchase locally. [Try checkout with Tour 18](prototype:checkout?role=cyclist&state=ready&record=tour-18).

## Check the confirmation {#confirmation}

The **Order confirmed** screen shows the same product, quantity and price as the basket. Choose **Start again** to make a new selection. [See the confirmation for Tour 18](prototype:confirmation?role=cyclist&state=ready&record=tour-18).
