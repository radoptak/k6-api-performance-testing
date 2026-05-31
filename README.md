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
- a `/health` endpoint for smoke performance testing
- a k6 smoke performance test written in TypeScript
- reusable smoke test thresholds
- TypeScript type checking
- npm scripts for local execution

## Project structure

```text
k6-api-performance-testing/
├── app/
│   └── server.ts
├── src/
│   └── config/
│       └── performance-thresholds.ts
├── tests/
│   └── smoke/
│       └── health.smoke.test.ts
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

In a second terminal, run the smoke performance test:

```bash
npm run test:smoke
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

Runs the k6 smoke performance test against the local `/health` endpoint.

```bash
npm run typecheck
```

Runs TypeScript validation without emitting compiled files.

## Current smoke test

The current smoke test verifies that the local API is reachable and responds correctly under minimal load.

It checks:

- `GET /health` returns HTTP 200
- the response uses JSON content type
- failed HTTP requests stay below 1%
- 95% of requests complete below 500 ms

## Checks vs thresholds

This project uses both k6 checks and thresholds.

**Checks** validate basic response correctness, for example whether the endpoint returns HTTP 200.

**Thresholds** define performance pass/fail criteria, for example maximum acceptable response time or error rate.

This distinction is important because a performance test should not only confirm that the API responds, but also whether it responds within acceptable performance limits.

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

The current version focuses on establishing a clean foundation: local API, k6 execution, basic checks, thresholds and TypeScript validation. More advanced scenarios will be added in later commits.
