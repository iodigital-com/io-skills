# Connect a project to the review shell

## Files to change

The starter is a complete static directory. Open it over HTTP. Set the name, optional logo URL and accent colour in `project.js`. Adjust the shell layout in `index.html` and `shell.css` when the project needs a local variation. The example under `demo/` shows where to put the project's own routes and feature documents.

| Setting | Contract |
| --- | --- |
| `formats` | Each preset supplies a unique `id`, `label`, `width` and `height` in CSS pixels. The first is the initial format. |
| `screens` | Each screen has an `id`, `label`, ordered `views` and optional `fa` and `spec` document paths. The first view is the screen picker's fallback. |
| `views` | One entry per supported combination of `role`, `state` and `record`, plus its directly loadable `url`. Use string IDs. A list or empty screen can use a dataset ID as its record. |
| `features` | Each feature has an `id`, `label` and `scenarios`. A scenario has a project-wide unique `id`, a `label` and a `start` containing a registered `screen`, `role`, `state` and `record`. |
| Scenario `fa` | Optional mapping from screen ID to document path, including a heading fragment if needed. A screen's own `fa` is the fallback. |

Keep IDs stable as the prose or screen labels evolve. The project supplies the intended URLs explicitly. CSS and component state inside the frame belong to that project.

## Use an existing screen

For example, a registered view could use the following project-owned route. The preview URL is independent of the shell's public sharing URL.

```js
{ role: 'reviewer', state: 'returned', record: '104',
  url: '/review/requests/104?as=reviewer&example=returned' }
```

- **React.** The project route looks up the agreed fixture from its path and query, then renders the existing detail component with that request and persona as props. Loading the URL directly should reproduce the view. [React component props](https://react.dev/learn/passing-props-to-a-component)
- **Vue.** In a view or route wrapper, read the same fixture keys and pass the record and persona into the project's component. Register the URL that works on a direct page load. [Vue props](https://vuejs.org/guide/components/props.html)
- **Twig.** A project controller resolves the fixture and passes the request and persona to its existing template. Register the resulting server-rendered page. [Twig template variables](https://twig.symfony.com/doc/3.x/templates.html#variables)

For a local review setup, serving the shell and preview under the same origin is simplest. If a project hosts the preview elsewhere, check that it permits embedding by the shell and that reviewers can load the URL directly. Use project-controlled preview URLs and example data. A simulated persona controls a prototype fixture, independently of the reviewer's actual access.

## Report navigation

After a project action reaches an addressable view, call the helper from the starter. The shell accepts events from its current preview frame and matches the reported tuple against the registered views. It retains the shell's scenario and preview format. The final view URL must restore the reached state on a fresh load.

```js
import { navigatePreview } from '../preview-bridge.js';
// Adjust the import to the helper's location in the project.
navigatePreview({ screen: 'request-detail', role: 'applicant', state: 'draft', record: '104' });
```

The helper returns false when used standalone or when it cannot determine the host address. Let the project router handle navigation in that case. If the host omits the referrer, supply the shell's known origin as the second argument.

## Link the explanation

Keep FA documents as accessible Markdown files, with paths relative to the shell. Set a screen default such as `./docs/requests.md#request-detail` and, for a scenario, override that screen with a specific passage. The document viewer supports headings, paragraphs, simple lists, tables, fenced code blocks, bold text, inline code and links. Use unique heading text for passage anchors.

```markdown
[See the returned request as its applicant](prototype:request-detail?role=applicant&state=returned&record=104)
```

Inside the shell, a document link can also specify `scenario` or `format`. Omitted values inherit the current review context. For an email, feedback ticket or standalone FA, use the browser link produced by **Copy situation link**. Verify it in a new session before sharing it with a reviewer.
