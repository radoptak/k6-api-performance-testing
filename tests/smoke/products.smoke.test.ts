import http from 'k6/http';
import { check } from 'k6';

import { baseUrl } from '../../src/config/environment.ts';
import { smokeThresholds } from '../../src/config/performance-thresholds.ts';

type ProductResponseItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

type ProductsResponse = {
  data: ProductResponseItem[];
  count: number;
};

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: smokeThresholds,
};

function isProductResponseItem(value: unknown): value is ProductResponseItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ProductResponseItem).id === 'string' &&
    typeof (value as ProductResponseItem).name === 'string' &&
    typeof (value as ProductResponseItem).category === 'string' &&
    typeof (value as ProductResponseItem).price === 'number' &&
    typeof (value as ProductResponseItem).inStock === 'boolean'
  );
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const response = value as ProductsResponse;

  return (
    Array.isArray(response.data) &&
    response.data.every(isProductResponseItem) &&
    typeof response.count === 'number'
  );
}

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