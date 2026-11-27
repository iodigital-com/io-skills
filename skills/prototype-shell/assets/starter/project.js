// Each scenario starts at an exact view. Its FA can point to a different passage
// from another scenario even when both start on the same preview URL.
import { requests } from './demo/records.js';

function view(screen, role, state, record) {
  const params = new URLSearchParams({ screen, role, state, record });
  return { role, state, record, url: './demo/index.html?' + params };
}

function detailViews(screen) {
  return requests.flatMap(({ id }) => [
    view(screen, 'applicant', 'returned', id),
    view(screen, 'reviewer', 'returned', id),
    view(screen, 'applicant', 'draft', id),
  ]);
}

const returnedRequest = { screen: 'request-detail', role: 'applicant', state: 'returned', record: '104' };
const requestList = { screen: 'request-list', role: 'applicant', state: 'populated', record: 'queue' };

export const project = {
  title: 'Equipment requests',
  accent: '#365b4a',
  formats: [
    { id: 'desktop', label: 'Desktop', width: 1280, height: 820 },
    { id: 'phone', label: 'Phone', width: 390, height: 844 },
  ],
  features: [
    {
      id: 'review', label: 'Review a request',
      scenarios: [
        {
          id: 'improve-returned', label: 'Improve a returned request',
          description: 'Read the return reason, add a delivery room and save a draft.',
          start: returnedRequest,
          fa: { 'request-detail': './demo/requests-fa.md#improve-a-returned-request' },
        },
        {
          id: 'verify-return-reason', label: 'Check the return reason',
          description: 'Compare what the applicant and reviewer see on the same request.',
          start: returnedRequest,
          fa: { 'request-detail': './demo/requests-fa.md#check-the-return-reason' },
        },
        {
          id: 'review-other-request', label: 'Review a second request',
          description: 'Open request 105 and check which cost centre information is missing.',
          start: { ...returnedRequest, role: 'reviewer', record: '105' },
        },
      ],
    },
    {
      id: 'find', label: 'Find a request',
      scenarios: [
        {
          id: 'open-list', label: 'Browse equipment requests',
          description: 'Choose a request from the workplace equipment list.',
          start: requestList,
        },
        {
          id: 'retry-list', label: 'Recover the request list',
          description: 'Retry an interrupted refresh and return to the list.',
          start: { ...requestList, state: 'error' },
        },
      ],
    },
  ],
  screens: [
    {
      id: 'request-detail', label: 'Request detail', views: detailViews('request-detail'),
      fa: './demo/requests-fa.md#read-a-request', spec: './demo/requests-spec.md',
    },
    {
      id: 'request-history', label: 'Request history', views: detailViews('request-history'),
      fa: './demo/requests-fa.md#read-the-history', spec: './demo/requests-spec.md',
    },
    {
      id: 'request-list', label: 'Request list', spec: './demo/requests-spec.md',
      views: [
        view('request-list', 'applicant', 'populated', 'queue'),
        view('request-list', 'reviewer', 'populated', 'queue'),
        view('request-list', 'applicant', 'empty', 'queue'),
        view('request-list', 'applicant', 'error', 'queue'),
      ],
    },
  ],
};
