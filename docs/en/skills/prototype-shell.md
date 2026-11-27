# Set up a prototype review

You can add iO’s optional review environment to your project with the separate `prototype-shell` skill. The client and project team can try a feature together and decide whether it works as agreed. Open a task in your own prototype, try it from different roles and read the relevant spec beside the screen. Share a link to the exact situation when you discuss a change.

In [spec-driven development](../workflow.md), you choose how to check each agreement. For an interaction that uses the camera, you might build a custom prototype inside the mobile app. For a pricing rule, a test with two sample amounts can be enough.

## Set up the skill

Open a terminal in your app’s directory. If you are starting from scratch, create an empty project directory and open your terminal there. Run the following command, choose your agent and install the skill at project level. The [installation guide](../guides/install.md) explains the GitHub access you need.

```sh
npx skills add iodigital-com/io-skills --skill prototype-shell
```

Start your agent in that directory. Choose the prompt below that fits your project and paste it into your agent’s chat.

## You have an app without a spec or prototype

Your current app is the starting point. If you have a screen in mind, add its name or route to the prompt. Otherwise, the agent will pick a small task someone can already complete in the app.

```prompt
Use prototype-shell in this project. We have a working app without a spec or prototype. Check how the app runs locally and inspect its routes, screens and available tests to find one task a user can complete today. Write a short Markdown spec describing where the task starts, what the user does and what result they see. Record anything that still needs confirmation.

Use the installed skill to create a project copy of the review shell. Connect the existing screens and styles through a local preview with fixed sample data. Register the scenario and preview URLs in project.js. Have the shell update the situation link as I complete the task. Link the short spec to the screen so I can read it during the review.

Start the app and shell locally. Complete the task, copy the situation link and open it in a fresh browser session. Check that it restores the same screen, role, state and sample data. Give me the startup command, the link to the overview and the situation link you tested.
```

## You are starting in an empty directory

This prompt also sets up the project. You can include your idea right away, for example “A team member reports a broken device and sees the report number.” If you are building a new project with another app as a reference, provide a path your agent can read or a screenshot.

```prompt
Use prototype-shell to set up a new project in this empty directory. We are starting without an app, spec or prototype. Find out who will use the prototype, which task they want to complete first and whether we have chosen a stack. Ask me for any of those details I haven’t supplied. If I supply a reference app, use its terminology and screen patterns.

Use my answers to write a short Markdown spec with one concrete example of a successful task. Set up the project with the agreed stack. If I have no preference, use the skill’s static starter. Create a project copy of the review shell, build the screens for my task with local sample data and register my scenario in project.js. Link the spec to the screen.

Start the project locally and complete the task. Open the copied situation link in a fresh browser session and check that I can see the same result. Give me the startup command, the link to the overview and the situation link you tested.
```

## What do you get?

The skill includes the runnable example and instructions for connecting a screen from your own stack. During the review, you can switch roles or screen sizes and keep reading the same passage in the walkthrough. Open a copied link in a fresh browser session to check what a colleague will see.

On a phone, the prototype fills the screen. Tap **Prototype** to read the spec or change the state, then close the panel to continue testing. On desktop, drag the divider left to give the document more reading space. You can also Tab to the divider and adjust its position with the arrow keys.

## Try the example

Want to explore the bundled demo first? Run the commands below from your project directory. Choose a directory name for `./prototype-review` that does not exist yet. Replace `.agents/skills/prototype-shell` with the skill directory shown by the installer if your agent uses another path.

```sh
node .agents/skills/prototype-shell/scripts/create.mjs ./prototype-review
python3 -m http.server 4319 --bind 127.0.0.1 --directory ./prototype-review
```

The bundled starter uses equipment requests. The [bike shop tutorial](../guides/new-project.md) shows how to adapt a project copy to a different feature.

Open `http://127.0.0.1:4319/` and choose **Improve a returned request**. Choose **Reviewer** and **Phone**. Select **Copy situation link** and open the link in a private window. As the reviewer, can you see the same request and the note asking for the missing room number? Choose **Open explanation for this screen** to read the passage for that scenario.
