# Equipment requests

Applicants use this workspace to correct requests that have been returned. Reviewers can reopen those same requests, read the reason and check the history. The request number identifies which item everyone is looking at.

## Read a request

The detail screen identifies the equipment and the request number. The status appears next to the title. On a phone, it sits below the title, above the Details and History links.

A returned request shows the reason before the equipment details. Request 104 needs a delivery room for a studio monitor. Request 105 needs a cost centre for a conference speaker. Both have the same status.

[Open request 104 as an applicant](prototype:request-detail?role=applicant&state=returned&record=104)  
[Open request 105 as a reviewer](prototype:request-detail?role=reviewer&state=returned&record=105)

## Improve a returned request

The applicant opens the returned studio monitor request. The return reason explains what is missing. In Request details, **Edit delivery room** opens the field. The applicant enters the missing information and selects **Save draft**.

The status changes to **Draft** and the delivery room appears in the details. The applicant can edit a draft again. Saving a draft keeps the request with the applicant. Submitting it for a new review is outside this example.

[Try the returned request](prototype:request-detail?role=applicant&state=returned&record=104&scenario=improve-returned)  
[See the resulting draft](prototype:request-detail?role=applicant&state=draft&record=104&scenario=improve-returned)

## Check the return reason

Read the return reason as the applicant, then open the same request as the reviewer. Both perspectives show the reason about the missing room. Only the applicant can edit the delivery room.

A reviewer comparing two returned requests should check the request number before discussing a correction. The reason for the conference speaker is about a cost centre and applies to request 105.

[Read the applicant's view](prototype:request-detail?role=applicant&state=returned&record=104&scenario=verify-return-reason)  
[Compare the reviewer's view](prototype:request-detail?role=reviewer&state=returned&record=104&scenario=verify-return-reason)  
[Read the second return reason](prototype:request-detail?role=reviewer&state=returned&record=105)

## Read the history

**History** opens the activity for the current request. The most recent event appears first. The applicant and reviewer can both see why the request was returned. In the applicant's draft view, the latest event shows that a draft was saved.

**Details** returns to the same request in the same state. **All requests** opens the list, where a reader can choose either request by its number and equipment name.

[Open the history of request 104](prototype:request-history?role=reviewer&state=returned&record=104)

## Sharing an edit

A shared link reopens the request, person and state being discussed. Text that is still being typed stays with the person editing. A fresh session opening the example draft for request 104 shows its example delivery room, **Room 3B**. Request 105 uses **Facilities** as its draft cost centre.

The example keeps saved edits in the current tab when storage is available. It has no shared record store. The project running a live prototype can supply its own record values.
