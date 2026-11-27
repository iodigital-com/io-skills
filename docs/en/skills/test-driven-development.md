# Specify behaviour with a test

Start with the outcome you want to demonstrate when fixing a defect or changing a business rule. Write a test that exposes the missing behaviour first.

## Example prompt

> An invitation is valid for 24 hours. First write a test with a fixed clock for an invitation sent yesterday at 10:00. At 09:59 it still works, at 10:00 it has expired. Show the test failing, update the expiry check and rerun it.

## What do you get?

A test that demonstrably fails before the change and passes after the smallest suitable correction. You can then simplify the code and run the tests again.
