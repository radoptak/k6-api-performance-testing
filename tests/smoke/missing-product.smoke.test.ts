import http, { expectedStatuses } from 'k6/http';
import { check } from 'k6';

import { baseUrl } from '../../src/config/environment.ts';
import { smokeThresholds } from '../../src/config/performance-thresholds.ts';

const missingProductId = 'unknown';

type ErrorResponse = {
  error: string;
};

http.setResponseCallback(expectedStatuses(404));

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: smokeThresholds,
};

function isErrorResponse(value: unknown): value is ErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const response = value as ErrorResponse;

  return typeof response.error === 'string';
}

export default function (): void {
  const response = http.get(`${baseUrl}/products/${missingProductId}`);

  let body: unknown;

  try {
    body = response.json();
  } catch {
    body = null;
  }

  check(response, {
    'GET /products/:id returns 404 for missing product': (res) => res.status === 404,
    'GET /products/:id missing product response is JSON': (res) =>
      String(res.headers['Content-Type']).includes('application/json'),
  });

  check(body, {
    'GET /products/:id missing product returns error body': isErrorResponse,
    'GET /products/:id missing product returns expected error': (res) =>
      isErrorResponse(res) && res.error === 'Product Not Found',
  });
}