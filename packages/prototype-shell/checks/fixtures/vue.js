import { createApp, h } from 'vue';
import { readRequest } from './data.js';

const RequestDetail = {
  props: { request: Object },
  render() {
    return h('article', [
      h('h1', this.request.title),
      h('p', this.request.persona),
      h('p', this.request.status),
      h('p', this.request.reason)
    ]);
  }
};

createApp(RequestDetail, { request: readRequest() }).mount('#app');
