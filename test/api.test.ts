import request from 'supertest';
import App from '../src/app';

const app = new App({ port: 3333 }).express;

describe('GET /', () => {
  it('should return 200 OK', (done) => request(app).get('/').expect(200, done));
});
