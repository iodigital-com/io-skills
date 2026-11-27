# Specify behaviour with a test

Start with the outcome you want to demonstrate when fixing a defect or changing a business rule. Write a test that exposes the missing behaviour first.

## Example prompt

> Start with a behaviour test for the new bag comparison. Select Frame 2 and Stuur 5. Check that the Stuur 5 shows “5 L” for Capacity and “Handlebar” for Mounting point and that its purchase button adds one bag at €49. Show the test exposing the missing behaviour, build the feature and rerun it.

## What do you get?

A test that demonstrably fails before the change and passes after the smallest suitable correction. You can then simplify the code and run the tests again.
