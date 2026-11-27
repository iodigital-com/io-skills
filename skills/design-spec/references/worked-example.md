# Worked example — request detail

## Agreed functional spec

- **REQ-1.** Applicants and reviewers can read a request's title, status and description. The detail screen covers two statuses, **In review** and **Returned**.
- **REQ-2.** While a request is in review, only the reviewer has an **Open review** action.
- **REQ-3.** When a request has been returned, both readers can see the reason. Only the applicant has an **Edit request** action.

## Screen `request-detail`

Applicants and reviewers use this screen to understand the request's status and see their available action. The visible fields and actions follow REQ-1 through REQ-3 in the [agreed functional spec](#agreed-functional-spec).

### Wireframes

**Wide · `returned` · `applicant`**

```text
+----------------------------------+--------------------+
| Equipment request                | Request status     |
|                                  | Returned           |
| Reason for return                |                    |
| Please add the delivery date.    | [Edit request]     |
|                                  |                    |
| Description                      |                    |
| A monitor for the shared desk.   |                    |
+----------------------------------+--------------------+
```

**Narrow · `returned` · `applicant`**

```text
+--------------------------------+
| Equipment request              |
| Request status                 |
| Returned                       |
|                                |
| Reason for return              |
| Please add the delivery date.  |
|                                |
| [Edit request]                 |
|                                |
| Description                    |
| A monitor for the shared desk. |
+--------------------------------+
```

### Layout rules

- Lead with the request title. For a returned request, give the reason priority over the general description.
- On a wide screen, keep the status and available action in the side panel. After the title, read the status, reason (when present), available action and description in sequence.
- When the columns no longer fit, stack the regions in that reading order. A long reason wraps and pushes the action and description down.

### Visible variants

Use the screen ID and the state and persona IDs below to identify a view during prototype or functional-analysis handoff.

| State ID | Persona ID | Visible status | Reason | Action |
| --- | --- | --- | --- | --- |
| `in-review` | `applicant` | In review | Hidden | None |
| `in-review` | `reviewer` | In review | Hidden | Open review |
| `returned` | `applicant` | Returned | Shown | Edit request |
| `returned` | `reviewer` | Returned | Shown | None |

### Review checks

- Open the two returned variants. Both show the same reason. Only the applicant sees **Edit request**.
- Switch to the reviewer's in-review variant on a narrow screen. **Open review** follows the status, and the description follows the action.
- Read the applicant's returned variant at a narrow width with a multiline reason. The full reason appears before **Edit request**.
