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
- validating response status, headers, body shape and individual item structure
- creating smoke and load test scenarios
- running smoke performance tests in GitHub Actions
- creating a project structure suitable for CI/CD integration
- documenting performance testing decisions in a recruiter-friendly way

## Tech stack

- k6
- TypeScript
- Node.js
- npm
- GitHub Actions

## Current status

The project currently includes:

- a local Node.js REST API used as the system under test
- a `/health` endpoint for basic smoke performance testing
- a `/products` endpoint returning sample product data
- k6 smoke performance tests written in TypeScript
- product response item shape validation in the `/products` smoke test
- a k6 load test scenario for `GET /products`
- reusable smoke and load thresholds
- shared environment configuration
- GitHub Actions workflow for smoke performance tests
- TypeScript type checking
- npm scripts for local execution

## Project structure

```text
k6-api-performance-testing/
├── .github/
│   └── workflows/
│       └── smoke-performance.yml
├── app/
│   ├── data/
│   │   └── products.ts
│   └── server.ts
├── src/
│   └── config/
│       ├── environment.ts
│       └── performance-thresholds.ts
├── tests/
│   ├── load/
│   │   └── products.load.test.ts
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

Run the products load test:

```bash
npm run test:load
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
npm run test
```

Runs all smoke performance tests.

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
npm run test:load
```

Runs all k6 load tests.

```bash
npm run test:load:products
```

Runs the k6 load test against the local `/products` endpoint.

```bash
npm run typecheck
```

Runs TypeScript validation without emitting compiled files.

## Environment configuration

Tests use a shared `baseUrl` configuration from:

```text
src/config/environment.ts
```

By default, tests run against:

```text
http://localhost:3000
```

The target API URL can be overridden with `BASE_URL`:

```bash
BASE_URL=http://localhost:4000 npm run test:smoke
```

This allows the same tests to run against different environments without changing test code.

## Current smoke tests

Smoke tests verify that the local API is reachable and responds correctly under minimal load.

### `GET /health`

The `/health` smoke test checks:

- `GET /health` returns HTTP 200
- the response uses JSON content type
- smoke performance thresholds are met

### `GET /products`

The `/products` smoke test checks:

- `GET /products` returns HTTP 200
- the response uses JSON content type
- the response body has the expected shape
- `data` is an array
- each item in `data` has the expected product shape:
  - `id` is a string
  - `name` is a string
  - `category` is a string
  - `price` is a number
  - `inStock` is a boolean

- `count` is a number
- `count` matches `data.length`
- the product list is not empty
- smoke performance thresholds are met

## Current load test

The current load test verifies that the `/products` endpoint remains stable under a small, constant local load.

### `GET /products` load scenario

The products load test uses:

- `constant-vus` executor
- 5 virtual users
- 30 seconds duration
- 1 second sleep between iterations

This is intentionally a small local load scenario. It is not intended to simulate production traffic. Its purpose is to establish the structure for future load, stress and spike tests.

## Current thresholds

The project currently separates smoke thresholds from load thresholds.

### Smoke thresholds

Smoke tests verify that:

- 100% of k6 checks pass
- failed HTTP requests stay below 1%
- 95% of requests complete below 500 ms

### Load thresholds

The products load test verifies that:

- at least 99% of k6 checks pass
- failed HTTP requests stay below 1%
- 95% of requests complete below 500 ms

These thresholds are intentionally simple at this stage and will be refined as more realistic scenarios are added.

## GitHub Actions

This project includes a GitHub Actions workflow for smoke performance testing:

```text
.github/workflows/smoke-performance.yml
```

The workflow runs automatically on:

- push to `main`
- pull requests

The CI workflow performs the following steps:

- checks out the repository
- sets up Node.js using `.nvmrc`
- installs k6
- installs npm dependencies with `npm ci`
- runs TypeScript checks
- starts the local API
- waits until the local API is ready
- runs smoke performance tests

At this stage, the workflow runs smoke tests only.

The load test is intentionally kept out of the default CI workflow because it has a different purpose and takes longer to execute. A separate manual workflow for load or extended performance scenarios may be added later.

## Checks vs thresholds

This project uses both k6 checks and thresholds.

**Checks** validate response correctness, for example whether the endpoint returns HTTP 200, whether the response uses JSON content type, whether the response body has the expected shape, or whether product items have the expected structure.

**Thresholds** define pass/fail criteria for the whole test run, for example maximum acceptable response time, failed request rate, or required check pass rate.

This distinction is important because a performance test should not only confirm that the API responds, but also whether it responds within acceptable performance limits.

## Smoke test vs load test

A **smoke test** answers:

```text
Does the basic mechanism work?
```

In this project, smoke tests run with minimal traffic and validate that endpoints respond correctly.

A **load test** answers:

```text
Does the endpoint remain stable under a defined level of traffic?
```

In this project, the first load test runs `GET /products` with 5 constant virtual users for 30 seconds.

## Why a local API?

The project uses a local API instead of a public third-party API because performance testing should be safe, controlled and repeatable.

A local API allows the test suite to evolve without:

- generating traffic against external services
- dealing with third-party rate limits
- depending on external infrastructure stability
- producing misleading results caused by network or provider variability

## Planned improvements

- add more realistic API endpoints
- add business-rule validation for product data
- add stress test scenario
- add spike test scenario
- add HTML/JSON reporting
- add manual GitHub Actions workflow for load tests
- expand documentation with performance testing decisions

## Notes

This project is being developed iteratively.

The current version focuses on establishing a clean foundation: local API, k6 execution, smoke checks, product item shape validation, a first load scenario, reusable thresholds, response body validation, TypeScript validation and GitHub Actions smoke workflow. More advanced scenarios will be added in later commits.
