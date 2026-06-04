import http from 'k6/http';
import { check, sleep } from 'k6';

import { baseUrl } from '../../src/config/environment.ts';
import { loadThresholds } from '../../src/config/performance-thresholds.ts';

export const options = {
  scenarios: {
    products_load: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
    },
  },
  thresholds: loadThresholds,
};

export default function (): void {
  const response = http.get(`${baseUrl}/products`);

  check(response, {
    'GET /products returns 200': (res) => res.status === 200,
    'GET /products returns JSON': (res) =>
      String(res.headers['Content-Type']).includes('application/json'),
  });

  sleep(1);
}