import request from 'supertest';
import { expect } from 'chai';
import 'dotenv/config';
import postLogin from '../fixtures/postLogin.json' assert { type: "json" };

describe('Login', () => {
  describe('POST /login', () =>{
    it('Should return status 200 with a string token when inserting valid credentials', async () => {
      const bodyLogin = { ...postLogin };

      const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string');
    });
  });
});