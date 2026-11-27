# Install the skills

Install one skill or the whole iO library in your project. You will need Node.js with `npx` and a local project folder.

## GitHub access

The [iO Skills repository](https://github.com/iodigital-com/io-skills) is private. You need a GitHub account with read access and Git configured to use that account in your terminal.

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
Use design-spec to sketch a comparison of two front lights on a phone. The Stad 400 costs €39 and delivers 400 lumens for 2 hours on its highest setting. The Route 800 costs €69 and delivers 800 lumens for 3 hours on its highest setting. Show which order action belongs to each light.
```

Can you find all three attributes for each light on the wireframe and point to the action that adds only the Route 800 to the basket?
