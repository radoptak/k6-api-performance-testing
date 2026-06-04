import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { products } from './data/products.ts';

const port = Number(process.env.PORT ?? 3000);

function sendJson(response: ServerResponse, statusCode: number, payload: unknown): void {
  const body = JSON.stringify(payload);

  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });

  response.end(body);
}

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'GET' && request.url === '/health') {
    sendJson(response, 200, {
      status: 'ok',
      service: 'local-performance-api',
    });

    return;
  }

    if (request.method === 'GET' && request.url === '/products') {
    sendJson(response, 200, {
      data: products,
      count: products.length,
    });

    return;
  }

const productDetailsMatch = request.url?.match(/^\/products\/([^/]+)$/);

  if (request.method === 'GET' && productDetailsMatch) {
    const productId = decodeURIComponent(productDetailsMatch[1]);
    const product = products.find((item) => item.id === productId);

    if (!product) {
      sendJson(response, 404, {
        error: 'Product Not Found',
      });

      return;
    }

    sendJson(response, 200, product);

    return;
  }

  sendJson(response, 404, {
    error: 'Not Found',
  });
});

server.listen(port, () => {
  console.log(`Local performance API listening on http://localhost:${port}`);
});