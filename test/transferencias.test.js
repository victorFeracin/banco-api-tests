import request from 'supertest';
import { expect } from 'chai';
import getToken from '../helpers/authentication.js';
import 'dotenv/config';

describe('Transferencias', () => {
  describe('POST /transferencias', () => {
    let token;
    
    beforeEach(async () => {
      token = await getToken('julio.lima', '123456');
    });

    it('Should return status 201 when the transfer value is equal or greater than R$10,00', async () => {
      const response = await request(process.env.BASE_URL)
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
      const response = await request(process.env.BASE_URL)
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