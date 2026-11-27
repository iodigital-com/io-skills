# Contribute a skill

Does your team have a workflow another project team could use? Share the skill with a small example that a colleague can run from an empty project.

## Describe the task and the result

Write down the question that would lead someone to the skill, the input it needs and the result it should produce. Check the catalog to see whether the task is already covered. A focused improvement can go into an existing skill.

For example, give [design-spec](../skills/design-spec.md) a list with two tasks. ‘Review the report’ is open and ‘Share the agenda’ is complete. Ask for a text wireframe for a phone with a filter for open tasks. Your colleague should be able to point out which task remains visible and how to bring back the full list.

## Make the contribution easy to try

1. Edit `skills/<skill-id>/SKILL.md` in the iO library. Include recognisable tasks in its description and write the steps that lead to the result.
2. Include the templates, scripts or examples the skill needs. Use generic roles and fictional data. Keep the licence with any material you reuse.
3. Add Dutch and English catalog entries under `docs/nl/skills/` and `docs/en/skills/`, both named `<skill-id>.md`. Give each page a concrete example prompt and expected result.
4. Open a pull request. Include the example input, the install command for the proposed version and one check a colleague can use to see whether the skill worked.

## Ask a second team to try it

Ask a colleague on another team to open the proposed version, install the skill in an empty project and follow the example as written. Have them record the output, which check passed and where they needed more explanation in the pull request.

If your colleague hesitates when trying to show both tasks again, record where they got stuck. Revise the prompt or example and ask them to try the filter again before adding the skill to the library.
