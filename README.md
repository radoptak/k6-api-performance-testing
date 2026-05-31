# k6 API Performance Testing

Portfolio project focused on API performance testing with k6 and TypeScript.

The goal of this project is to demonstrate how performance tests can be designed, implemented and maintained against a controlled local REST API.

## Project purpose

This project is not intended to load test public third-party APIs.

Instead, it uses a local API so that performance scenarios, thresholds and test data can be controlled safely and consistently.

## Planned scope

- Local REST API used as the system under test
- k6 smoke performance test
- Load, stress and spike test scenarios
- Performance thresholds
- TypeScript-based test structure
- Recruiter-friendly documentation
- GitHub Actions workflow for CI execution

## Tech stack

- k6
- TypeScript
- Node.js
- GitHub Actions

## Current status

The project currently includes:

- a local Node.js REST API used as the system under test
- a `/health` endpoint for smoke performance testing
- a k6 smoke performance test written in TypeScript
- reusable smoke test thresholds
- TypeScript type checking

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

## Current smoke thresholds

The current smoke test verifies that:

- failed HTTP requests stay below 1%
- 95% of requests complete below 500 ms

These thresholds are intentionally simple at this stage and will be refined as more performance scenarios are added.

## Notes

This project is being developed iteratively.

The current version focuses on establishing a clean foundation: local API, k6 execution, basic checks, thresholds and TypeScript validation. More advanced scenarios will be added in later commits.
