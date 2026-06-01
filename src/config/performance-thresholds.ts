export const smokeThresholds = {
  checks: ['rate==1'],
  http_req_failed: ['rate<0.01'],
  http_req_duration: ['p(95)<500'],
};