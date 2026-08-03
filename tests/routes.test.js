const request = require('supertest');
const app = require('../server');

describe('Northwind Design Studio routes', () => {
  test('GET / returns 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('GET /portfolio returns 200', async () => {
    const res = await request(app).get('/portfolio');
    expect(res.statusCode).toBe(200);
  });

  test('GET /contact returns 200', async () => {
    const res = await request(app).get('/contact');
    expect(res.statusCode).toBe(200);
  });
});
