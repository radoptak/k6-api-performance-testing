import http from 'k6/http';
import { check } from 'k6';

import { baseUrl } from '../../src/config/environment.ts';
import { smokeThresholds } from '../../src/config/performance-thresholds.ts';
import { isProductsResponse } from '../../src/validators/product-response.ts';

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: smokeThresholds,
};


export default function (): void {
  const response = http.get(`${baseUrl}/products`);

  let body: unknown;

  try {
    body = response.json();
  } catch {
    body = null;
  }

  check(response, {
    'GET /products returns 200': (res) => res.status === 200,
    'GET /products returns JSON': (res) =>
      String(res.headers['Content-Type']).includes('application/json'),
  });

  check(body, {
    'GET /products returns expected body shape': isProductsResponse,
    'GET /products returns matching count': (res) =>
      isProductsResponse(res) && res.count === res.data.length,
    'GET /products returns at least one product': (res) =>
      isProductsResponse(res) && res.data.length > 0,
  });
}