import request from 'supertest';
import { expect } from 'chai';
const BASEURL = 'http://localhost:3000';

describe('Login', () => {
  describe('POST /login', () =>{
    it('Should return status 200 with a string token when inserting valid credentials', async () => {
      const response = await request(BASEURL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          'username': 'julio.lima',
          'senha': '123456'
        });

      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string');
    });
  });
});