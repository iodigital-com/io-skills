# iO Skills V1 — capability map

Proposed boundaries for the first release. The product-level acceptance criteria are in the [project spec](product.md).

| Module | Owns | Depends on |
| --- | --- | --- |
| `skill-library` | The installable iO skills, included resources, skill identifiers and contribution workflow. | — |
| `learning-content` | The two tutorial paths, worked examples and catalog copy in Dutch and English. Examples use the skill identifiers and commands that teams can install. | `skill-library` |
| `website` | Direct access to the catalog, skill lookup by name or task, tutorial navigation, language switching and presentation of the two loops. | `learning-content`, `skill-library` |

For the first slice, publish one skill with a client-neutral example and a tutorial in both website languages. A colleague new to spec-driven development follows the tutorial to install the skill in a clean project and produce the example output. An experienced colleague opens the catalog directly, finds the same skill by name or by the task at hand, and uses its install command in another project.
