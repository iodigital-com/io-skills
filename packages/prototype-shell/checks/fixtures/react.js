import { createElement as h } from 'react';
import { createRoot } from 'react-dom/client';
import { readRequest } from './data.js';

function RequestDetail({ request }) {
  return h('article', null,
    h('h1', null, request.title),
    h('p', null, request.persona),
    h('p', null, request.status),
    h('p', null, request.reason)
  );
}

createRoot(document.getElementById('app')).render(h(RequestDetail, { request: readRequest() }));
