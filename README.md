# iO Skills

- **Nederlands** · [Projectdoel en werkwijze](docs/nl/project-intent.md)
- **English** · [Project goals and workflow](docs/en/project-intent.md)

## Skills

Run these commands from the project where you want to use the skills. They install from the [public iO Skills repository](https://github.com/iodigital-com/io-skills). Choose your agent when prompted and install at project level.

```sh
# Browse the library
npx skills add iodigital-com/io-skills --list

# Install iO's design-spec skill in the current project
npx skills add iodigital-com/io-skills --skill design-spec

# Install the optional skill for client-facing functional analyses
npx skills add iodigital-com/io-skills --skill functional-analysis

# Install the prototype review shell
npx skills add iodigital-com/io-skills --skill prototype-shell

# Install the whole collection in the current project
npx skills add iodigital-com/io-skills --skill '*'
```

To start your own prototype, run `node <installed-skill-dir>/scripts/create.mjs ./prototype-review`. Replace `<installed-skill-dir>` with the project path shown for `prototype-shell` by `npx skills list`.

To adapt a skill, edit `skills/<name>/SKILL.md` and its supporting files. The project’s `.agents/skills` directory links to `skills/`, so new and updated definitions are available to agents working in this checkout. Other projects install those skills from the iO repository.

The first 26 skills were adapted from [Addy Osmani’s agent-skills at revision e997ac5](https://github.com/addyosmani/agent-skills/tree/e997ac5b9a74eab332d5e9793bb38a38c8cfdd74/skills). Each carries the [original MIT license](licenses/addy-agent-skills-LICENSE).

## Development

[V1 product specification](spec/product.md) · [Proposed capability map](spec/capability-map.md)

### Run the prototype review shell

Run `pnpm prototype` at the repository root with Python 3 installed. In the [equipment-request demo](http://127.0.0.1:4319/), select **Improve a returned request** to see why a reviewer sent an application back for changes. Choose **Reviewer** and **Phone**, then use **Copy situation link**. Open the link in a private window and check that it restores the same request, role and screen size.

The [starter](skills/prototype-shell/assets/starter/) ships with the skill. Edit `project.js` in your project copy to connect screens, scenarios, example records, viewport sizes and the relevant passages from your functional analysis. The [adaptation guide](skills/prototype-shell/references/adapting.md) covers React, Vue and Twig.

Run `pnpm test:prototype` to check starter creation, navigation and link resolution. The [React and Vue test instructions](packages/prototype-shell/checks/README.md) cover the two browser checks. The full example walkthrough is in the [approved V1 spec](spec/SPEC-prototype-shell.md).

### Run the documentation website

From the project root, use Node.js 22 and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [the Dutch site](http://localhost:3000/nl/) or [the English site](http://localhost:3000/en/). Both versions use the matching Markdown articles and interface text in `docs/nl/` and `docs/en/`. The home route opens the Dutch version.

Both tutorials link each worked prompt to its result in the [Wobble Wheel kids’ bike shop demo](http://localhost:3000/prototypes/bike-shop/index.html?lang=en). The English storefront and review shell live in `public/prototypes/bike-shop/`. Edit the shared English [product spec](spec/examples/bike-shop/spec.md) and [screen designs](spec/examples/bike-shop/design.md) in `spec/examples/bike-shop/`. The functional walkthrough and prompt explanations follow the tutorial language in `docs/{nl,en}/prototypes/bike-shop/`. Run `node website/scripts/prepare-site.mjs` after editing these Markdown files to refresh a running preview.

`pnpm build` validates paired content and exports the Next.js website to `out/`.

The [production workflow](.github/workflows/deploy.yml) runs the prototype tests on pushes to `main`, then deploys to [io-skills on the Prophets Vercel team](https://vercel.com/prophets/io-skills). Vercel builds the site from the project root with Node.js 22 and `pnpm build`. The live site is available in [Dutch](https://io-skills.vercel.app/nl/) and [English](https://io-skills.vercel.app/en/).

GitHub Actions reads the team and project IDs from the repository variables `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`. Store a Vercel token scoped to this project in the Actions secret `VERCEL_TOKEN`. To retry a deployment, rerun the workflow on `main`.
