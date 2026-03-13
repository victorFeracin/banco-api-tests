import request from 'supertest';
import { expect } from 'chai';
const BASE_URL = 'http://localhost:3000';

describe('Transferencias', () => {
  describe('POST /transferencias', () => {
    it('Should return status 201 when the transfer value is equal or greater than R$10,00', async () => {
      // Get token
      const responseLogin = await request(BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          'username': 'julio.lima',
          'senha': '123456'
        });
      
      const token = responseLogin.body.token;

      const response = await request(BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            contaOrigem: 1,
            contaDestino: 2,
            valor: 10,
            token: ''
        });
      
      expect(response.status).to.equal(201);
    });

    it('Should return status 422 when the transfer value is below R$10,00', async () => {
      // Get token
      const responseLogin = await request(BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          'username': 'julio.lima',
          'senha': '123456'
        });
      
      const token = responseLogin.body.token;

      const response = await request(BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            contaOrigem: 1,
            contaDestino: 2,
            valor: 9.99,
            token: ''
        });
      
      expect(response.status).to.equal(422);
    });
  });
});