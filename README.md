# k6 API Performance Testing

API performance testing portfolio project using **k6**, **TypeScript** and a controlled local REST API.

The goal of this project is to demonstrate how performance tests can be designed, implemented and maintained in a safe, repeatable and CI-friendly way.

## Project purpose

This project is not intended to load test public third-party APIs.

Instead, it uses a local API as the system under test. This makes the test environment controlled, predictable and safe for experimenting with performance scenarios, thresholds and test data.

## What this project demonstrates

- designing API performance tests with k6
- using TypeScript for better maintainability
- running tests against a controlled local REST API
- defining performance thresholds
- separating functional checks from performance criteria
- validating response status, headers and body shape
- creating a project structure suitable for future CI/CD integration
- documenting performance testing decisions in a recruiter-friendly way

## Tech stack

- k6
- TypeScript
- Node.js
- npm

## Current status

The project currently includes:

- a local Node.js REST API used as the system under test
- a `/health` endpoint for basic smoke performance testing
- a `/products` endpoint returning sample product data
- k6 smoke performance tests written in TypeScript
- reusable smoke test thresholds
- TypeScript type checking
- npm scripts for local execution

## Project structure

```text
k6-api-performance-testing/
├── app/
│   ├── data/
│   │   └── products.ts
│   └── server.ts
├── src/
│   └── config/
│       └── performance-thresholds.ts
├── tests/
│   └── smoke/
│       ├── health.smoke.test.ts
│       └── products.smoke.test.ts
├── README.md
├── package.json
├── tsconfig.json
└── .nvmrc
```

## Running locally

Install dependencies:

```bash
npm install
```

Start the local API:

```bash
npm run start:api
```

In a second terminal, run all smoke performance tests:

```bash
npm run test:smoke
```

Run only the `/health` smoke test:

```bash
npm run test:smoke:health
```

Run only the `/products` smoke test:

```bash
npm run test:smoke:products
```

Run TypeScript checks:

```bash
npm run typecheck
```

## Available scripts

```bash
npm run start:api
```

Starts the local API on `http://localhost:3000`.

```bash
npm run test:smoke
```

Runs all k6 smoke performance tests.

```bash
npm run test:smoke:health
```

Runs the k6 smoke performance test against the local `/health` endpoint.

```bash
npm run test:smoke:products
```

Runs the k6 smoke performance test against the local `/products` endpoint.

```bash
npm run typecheck
```

Runs TypeScript validation without emitting compiled files.

## Current smoke tests

The current smoke tests verify that the local API is reachable and responds correctly under minimal load.

### `GET /health`

The `/health` smoke test checks:

- `GET /health` returns HTTP 200
- the response uses JSON content type
- smoke performance thresholds are met

### `GET /products`

The `/products` smoke test checks:

- `GET /products` returns HTTP 200
- the response uses JSON content type
- the response body has the expected basic shape
- `data` is an array
- `count` is a number
- `count` matches `data.length`
- the product list is not empty
- smoke performance thresholds are met

## Current smoke thresholds

The current smoke thresholds verify that:

- 100% of k6 checks pass
- failed HTTP requests stay below 1%
- 95% of requests complete below 500 ms

These thresholds are intentionally simple at this stage and will be refined as more performance scenarios are added.

## Checks vs thresholds

This project uses both k6 checks and thresholds.

**Checks** validate response correctness, for example whether the endpoint returns HTTP 200, whether the response uses JSON content type, or whether the response body has the expected shape.

**Thresholds** define performance pass/fail criteria, for example maximum acceptable response time, failed request rate, or required check pass rate.

This distinction is important because a performance test should not only confirm that the API responds, but also whether it responds within acceptable performance limits.

## Why a local API?

The project uses a local API instead of a public third-party API because performance testing should be safe, controlled and repeatable.

A local API allows the test suite to evolve without:

- generating traffic against external services
- dealing with third-party rate limits
- depending on external infrastructure stability
- producing misleading results caused by network or provider variability

## Planned improvements

- add more realistic API endpoints
- add load test scenario
- add stress test scenario
- add spike test scenario
- add HTML/JSON reporting
- add GitHub Actions workflow
- expand documentation with performance testing decisions

## Notes

This project is being developed iteratively.

The current version focuses on establishing a clean foundation: local API, k6 execution, basic checks, thresholds, response body validation and TypeScript validation. More advanced scenarios will be added in later commits.
