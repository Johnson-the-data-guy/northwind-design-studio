const request = require('supertest');

// Prevent a real local .env from leaking credentials into these tests —
// each describe block controls process.env explicitly.
jest.mock('dotenv', () => ({ config: jest.fn() }));

describe('Auth routes (no provider credentials configured)', () => {
  let app;

  beforeAll(() => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
    jest.resetModules();
    app = require('../server');
  });

  test('GET /auth/google returns 503 when Google credentials are missing', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.statusCode).toBe(503);
    expect(res.text).toMatch(/Google login isn't configured/);
  });

  test('GET /dashboard redirects home when not logged in', async () => {
    const res = await request(app).get('/dashboard');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/');
  });

  test('POST /auth/logout redirects home', async () => {
    const res = await request(app).post('/auth/logout');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/');
  });
});

describe('Auth routes (provider credentials configured)', () => {
  let app;

  beforeAll(() => {
    process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
    process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret';
    jest.resetModules();
    app = require('../server');
  });

  afterAll(() => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
  });

  test('GET /auth/google redirects to Google when configured', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toMatch(/accounts\.google\.com/);
  });
});
