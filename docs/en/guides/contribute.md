# Contribute a skill

Does your team have a workflow another project team could use? Share the skill with a small example that a colleague can run from an empty project.

## Describe the task and the result

Write down the question that would lead someone to the skill, the input it needs and the result it should produce. Check the catalog to see whether the task is already covered. A focused improvement can go into an existing skill.

An example for [design-spec](../skills/design-spec.md) uses two front lights that a cyclist wants to compare on a phone. Supply the price, light output and run time on the highest setting for each model. Ask for a text wireframe in which the cyclist adds only the Route 800 to the basket. The colleague testing the contribution should be able to point to the order action for that model in the wireframe.

## Make the contribution easy to try

1. Edit `skills/<skill-id>/SKILL.md` in the iO library. Include recognisable tasks in its description and write the steps that lead to the result.
2. Include the templates, scripts or examples the skill needs. Use generic roles and fictional data. Keep the licence with any material you reuse.
3. Add Dutch and English catalog entries under `docs/nl/skills/` and `docs/en/skills/`, both named `<skill-id>.md`. Give each page a concrete example prompt and expected result.
4. Open a pull request. Include the example input, the install command for the proposed version and one check a colleague can use to see whether the skill worked.

## Ask a second team to try it

Ask a colleague on another team to open the proposed version, install the skill in an empty project and follow the example as written. Have them record the output, which check passed and where they needed more explanation in the pull request.

If the wireframe leaves your colleague unsure which light ‘Add to basket’ will add, record exactly where the uncertainty arose. Revise the prompt or example and ask the colleague to try the same purchase again before the skill joins the library.
