# iO Skills

- **Nederlands** · [Projectdoel en werkwijze](docs/nl/project-intent.md)
- **English** · [Project goals and workflow](docs/en/project-intent.md)

## Skills

Run these commands from the project where you want to use the skills. While the [iO Skills repository](https://github.com/iodigital-com/io-skills) is private, Git needs to be signed in with an account that has read access. Choose your agent when prompted and install at project level.

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

To adapt a skill for iO, edit its `SKILL.md` and supporting files under `skills/<name>/`. The separate `.agents/skills/` directory holds the project tools installed by the CLI. The initial 26 library skills come from [Addy Osmani’s agent-skills at revision e997ac5](https://github.com/addyosmani/agent-skills/tree/e997ac5b9a74eab332d5e9793bb38a38c8cfdd74/skills). Each includes the [upstream MIT license](licenses/addy-agent-skills-LICENSE) so the notice travels with individual installations.

## Development

[V1 product specification](spec/product.md) · [Proposed capability map](spec/capability-map.md)

### Run the prototype review shell

Run `pnpm prototype` at the repository root with Python 3 installed. Open [the example prototype](http://127.0.0.1:4319/) and select **Improve a returned request**. Try changing the persona to **Reviewer**, choosing **Phone** and opening the copied link in a private window.

The [starter](skills/prototype-shell/assets/starter/) ships with the skill. Edit `project.js` in your project copy to connect screens, scenarios, example records, viewport sizes and FA passages. The [adaptation guide](skills/prototype-shell/references/adapting.md) covers React, Vue and Twig.

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

For a future Vercel deployment, use the project root, the Next.js framework preset and `pnpm build` as the build command.
