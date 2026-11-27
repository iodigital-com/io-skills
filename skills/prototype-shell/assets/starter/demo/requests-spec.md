# Equipment requests — example spec

## Request detail

The detail and history screens support two equipment requests. Each has its own return reason and fixed example draft value.

| Request | Equipment | Correction requested | Example draft value |
| --- | --- | --- | --- |
| 104 | Studio monitor | Delivery room | Room 3B |
| 105 | Conference speaker | Cost centre | Facilities |

The applicant and reviewer can read a returned request. Only the applicant can edit or open a draft. The applicant can enter a non-empty correction and save the draft. Show the saved value in the current tab when storage is available. A fresh session uses the configured example data. Editing a record never writes form data into a URL.

## History

Switching between detail and history keeps the same record, persona and state. Returned requests show submission and return events. Drafts have a further save event. Display the newest event first.

## List

The list is a separate example dataset, identified by `queue`. Applicants can open a populated list, an empty list or a failed refresh. **Try again** changes the failed refresh to the populated list. Reviewers can open the populated list. Every listed record opens as returned for the same persona.

The list has a spec and no client explanation. Opening the list alone does not change the explanation someone is already reading.
