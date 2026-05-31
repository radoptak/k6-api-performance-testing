import http from 'k6/http';
import { check } from 'k6';

import { smokeThresholds } from '../../src/config/performance-thresholds.ts';

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: smokeThresholds,
};

const baseUrl = __ENV.BASE_URL ?? 'http://localhost:3000';

export default function (): void {
  const response = http.get(`${baseUrl}/health`);

  check(response, {
    'GET /health returns 200': (res) => res.status === 200,
    'GET /health returns JSON': (res) =>
      String(res.headers['Content-Type']).includes('application/json'),
  });
}