# iO ASCII wireframe conventions

Use these defaults when a project has no established text-wireframe notation. They give reviewers a consistent way to read a screen in a Markdown diff. Keep a team's existing notation, such as [PlantUML Salt](https://plantuml.com/salt), when that is how it maintains its specs.

## Screen structure

Use the following order per screen. Translate headings and UI labels into the requested language. Keep existing screen, state and persona IDs across translations and revisions.

| Section | What to include |
| --- | --- |
| Screen and source | A heading with the stable screen ID, one sentence on its purpose and a reference to the requirement. |
| Wireframes | Caption each sketch with **width · state · persona**, omitting dimensions that do not vary or apply. Use the same state and persona when comparing widths. |
| Layout rules | Explain what draws attention first, the reading order and how regions move or wrap. Use a second sketch when a different arrangement would be hard to reconstruct from prose. |
| Visible variants | Describe what appears, disappears or moves in each relevant state or persona. A compact table works when several views share a layout. Omit this section for a single unvarying view. |
| Review checks | Give an observable check for each important relationship. End with open questions only when there is a decision left to make. |

## Drawing the screen

Use one fenced `text` block per view and ordinary spaces for alignment. Draw regions with `+` for corners and intersections, `-` for horizontal edges and `|` for vertical edges. Align the edges in a monospace preview. Box the regions whose placement matters. Keep the actual spelling of labels, including accents. Character counts express relative placement. Specify a pixel breakpoint only when it comes from the project.

| Element | Write it as | How to read it |
| --- | --- | --- |
| Heading, label or read-only value | `Request status`, `Returned` | Plain text is visible content. |
| Button | `[Save changes]` | The text inside the brackets is the action label. |
| Text input | `Title: "Equipment request"` | The label precedes an editable example value. Use `""` for an empty field. |
| Checkbox | `[ ] Notify me` or `[x] Notify me` | The label follows the box. |
| Radio option | `( ) Delivery` or `(o) Pickup` | The label follows the unselected or selected option. |

For an unfamiliar component, use its project name and add a short note below the drawing. Keep the same symbol for the same control across screens. Use prose for important relationships so a reader can also understand the layout without seeing the drawing.

See the [worked example](worked-example.md) for a wide and narrow view of the same returned request.
