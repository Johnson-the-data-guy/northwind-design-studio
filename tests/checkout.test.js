const request = require('supertest');

// Prevent a real local .env from leaking credentials into these tests —
// each describe block controls process.env explicitly.
jest.mock('dotenv', () => ({ config: jest.fn() }));

describe('Checkout routes (Stripe not configured)', () => {
  let app;

  beforeAll(() => {
    delete process.env.STRIPE_SECRET_KEY;
    jest.resetModules();
    app = require('../server');
  });

  test('POST /checkout/subscribe/:tier returns 503 when Stripe is unconfigured', async () => {
    const res = await request(app).post('/checkout/subscribe/starter');
    expect(res.statusCode).toBe(503);
    expect(res.text).toMatch(/Stripe isn't configured/);
  });

  test('POST /checkout/subscribe/:tier returns 404 for an unknown tier', async () => {
    const res = await request(app).post('/checkout/subscribe/does-not-exist');
    expect(res.statusCode).toBe(404);
  });

  test('GET /checkout/success renders a confirmation page', async () => {
    const res = await request(app).get('/checkout/success');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/subscribed/i);
  });

  test('GET /checkout/cancel renders a cancellation page', async () => {
    const res = await request(app).get('/checkout/cancel');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/canceled/i);
  });
});

describe('Checkout routes (Stripe configured)', () => {
  const mockCreateSession = jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test-session' });

  jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => ({
      checkout: { sessions: { create: mockCreateSession } }
    }));
  });

  let app;

  beforeAll(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    jest.resetModules();
    app = require('../server');
  });

  afterAll(() => {
    delete process.env.STRIPE_SECRET_KEY;
  });

  test('POST /checkout/subscribe/:tier creates a session and redirects to Stripe', async () => {
    const res = await request(app).post('/checkout/subscribe/studio');
    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'subscription',
        success_url: expect.stringContaining('/checkout/success'),
        cancel_url: expect.stringContaining('/checkout/cancel')
      })
    );
    expect(res.statusCode).toBe(303);
    expect(res.headers.location).toBe('https://checkout.stripe.com/test-session');
  });
});
