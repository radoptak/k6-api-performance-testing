import http from 'k6/http';
import { check } from 'k6';

import { baseUrl } from '../../src/config/environment.ts';
import { smokeThresholds } from '../../src/config/performance-thresholds.ts';

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: smokeThresholds,
};

export default function (): void {
  const response = http.get(`${baseUrl}/health`);

  check(response, {
    'GET /health returns 200': (res) => res.status === 200,
    'GET /health returns JSON': (res) =>
      String(res.headers['Content-Type']).includes('application/json'),
  });
}