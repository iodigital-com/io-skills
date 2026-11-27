const requests = {
  '406': 'A delivery date is missing.',
  '407': 'A room number is missing.'
};

export function readRequest() {
  const params = new URLSearchParams(location.search);
  const record = params.get('record');
  return {
    title: `Equipment request ${record}`,
    reason: requests[record],
    persona: params.get('role') === 'reviewer' ? 'Reviewer workspace' : 'Applicant workspace',
    status: params.get('state') === 'returned' ? 'Returned for changes' : 'Draft'
  };
}
