# Install the skills

Install one skill or the whole library from the [public iO Skills repository](https://github.com/iodigital-com/io-skills). You will need Node.js with `npx` and a local project folder.

## Choose what to install

Open a terminal in your project folder. The following command lets you choose the skills and agent interactively.

```sh
npx skills add iodigital-com/io-skills
```

To install a single skill, pass its name. This example selects [design-spec](../skills/design-spec.md). Choose your agent when prompted and install the skill at project level.

```sh
npx skills add iodigital-com/io-skills --skill design-spec
```

If you want all the skills, install the collection in one go.

```sh
npx skills add iodigital-com/io-skills --skill '*'
```

## Check the installation

Run the following command in the same project folder. Look for the skill you chose, such as `design-spec`, in the list.

```sh
npx skills list
```

Start a new session with your chosen agent in that project folder. If you installed `design-spec`, try this prompt.

```prompt
Use design-spec to sketch a task list on a phone. The task ‘Review the report’ is open and ‘Share the agenda’ is complete. Show how someone views only open tasks and then returns to the full list.
```

Can you point out the active filter, the task it shows and the action that brings both tasks back into view?
