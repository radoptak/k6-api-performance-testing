import http from 'k6/http';
import { check, group, sleep } from 'k6';

import { baseUrl } from '../../src/config/environment.ts';
import { loadThresholds } from '../../src/config/performance-thresholds.ts';
import {
  isProductResponseItem,
  isProductsResponse,
} from '../../src/validators/product-response.ts';

export const options = {
  scenarios: {
    product_browsing: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
    },
  },
  thresholds: loadThresholds,
};

export default function (): void {
  let selectedProductId: string | null = null;

  group('Browse product list', () => {
    const productsResponse = http.get(`${baseUrl}/products`);

    let productsBody: unknown;

    try {
      productsBody = productsResponse.json();
    } catch {
      productsBody = null;
    }

    check(productsResponse, {
      'GET /products returns 200': (res) => res.status === 200,
      'GET /products returns JSON': (res) =>
        String(res.headers['Content-Type']).includes('application/json'),
    });

    check(productsBody, {
      'GET /products returns expected body shape': isProductsResponse,
      'GET /products returns products for browsing': (body) =>
        isProductsResponse(body) && body.data.length > 0,
    });

    if (isProductsResponse(productsBody) && productsBody.data.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsBody.data.length);
      selectedProductId = productsBody.data[randomIndex].id;
    }
  });

  const productId = selectedProductId;

  if (productId === null) {
    sleep(1);
    return;
  }

  group('Open product details', () => {
    const productResponse = http.get(`${baseUrl}/products/${productId}`);

    let productBody: unknown;

    try {
      productBody = productResponse.json();
    } catch {
      productBody = null;
    }

    check(productResponse, {
      'GET /products/:id returns 200': (res) => res.status === 200,
      'GET /products/:id returns JSON': (res) =>
        String(res.headers['Content-Type']).includes('application/json'),
    });

    check(productBody, {
      'GET /products/:id returns expected product shape': isProductResponseItem,
      'GET /products/:id returns selected product': (body) =>
        isProductResponseItem(body) && body.id === productId,
    });
  });

  sleep(1);
}