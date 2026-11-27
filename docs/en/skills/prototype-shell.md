# Set up a prototype review

Give clients and teammates a working example they can explore together. The shell opens on a feature overview and lets a reviewer share the exact screen, persona, state, example record and preview format they are discussing.

## Example prompt

> Create a project copy for our bike shop. Let me choose a category in the shop and then any two models. Share the phone view of Frame 2 beside Stuur 5 so the retailer can check where each bag fits.

## What do you get?

The skill includes the runnable example and instructions for connecting a screen from your own stack. Switch persona or viewport during the review while keeping your place in the FA. Open a copied link in a fresh browser session to check what a colleague will see.

On a phone, the prototype fills the screen. Tap **Prototype** to read the spec or change the state, then close the panel to continue testing. On desktop, drag the divider left to give the document more reading space. You can also Tab to the divider and adjust its position with the arrow keys.

## Try the example

Install `prototype-shell` in your project using the [installation guide](../guides/install.md). Run the commands below from your project directory to create and serve the example. Replace `.agents/skills/prototype-shell` with the skill directory shown by the installer if your agent uses another path.

```sh
node .agents/skills/prototype-shell/scripts/create.mjs ./prototype-review
python3 -m http.server 4319 --bind 127.0.0.1 --directory ./prototype-review
```

The bundled starter has its own equipment-request example. In the [shop tutorial](../guides/new-project.md), you adapt a project copy for the retailer’s product comparison feature.

Open `http://127.0.0.1:4319/` and choose **Improve a returned request**. Switch to **Reviewer** and **Phone**, then open the copied link in a private window. You will see the same return reason for request 104. Choose **Open explanation for this screen** to read the passage for that scenario.
