import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
describe('GET endpoint', function () {
  it('responds with image', async function () {
    const response = await request.get(
      '/api/images?filename=encenadaport&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
  it('responds with image', async function () {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
  it('responds with an error', async () => {
    const response = await request.get(
      '/api/images?filename=invalid&width=150&height=160'
    );
    expect(response.status).toBe(400);
  });
  it('responds with an error', async () => {
    const response = await request.get(
      '/api/images?filename=invalid&width=a&height=b'
    );
    expect(response.status).toBe(400);
  });
  it('retrieves image from cache', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await request.get(
      '/api/images?filename=palmtunnel&width=100&height=100'
    );
    if (response.status == 200) {
      const response1 = await request.get(
        '/api/images?filename=palmtunnel&width=100&height=100'
      );
      expect(response1.status).toBe(304);
    }
  });
});
