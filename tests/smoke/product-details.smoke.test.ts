import http from 'k6/http';
import { check } from 'k6';

import { baseUrl } from '../../src/config/environment.ts';
import { smokeThresholds } from '../../src/config/performance-thresholds.ts';
import { isProductResponseItem } from '../../src/validators/product-response.ts';

const existingProductId = 'prod-001';

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: smokeThresholds,
};

export default function (): void {
  const response = http.get(`${baseUrl}/products/${existingProductId}`);

  let body: unknown;

  try {
    body = response.json();
  } catch {
    body = null;
  }

  check(response, {
    'GET /products/:id returns 200': (res) => res.status === 200,
    'GET /products/:id returns JSON': (res) =>
      String(res.headers['Content-Type']).includes('application/json'),
  });

  check(body, {
    'GET /products/:id returns expected product shape': isProductResponseItem,
    'GET /products/:id returns requested product': (res) =>
      isProductResponseItem(res) && res.id === existingProductId,
  });
}