import request from 'supertest';
import { expect } from 'chai';
import getToken from '../helpers/authentication.js';
import 'dotenv/config';
import postTransferencias from '../fixtures/postTransferencias.json' assert { type: "json" };

describe('Transferencias', () => {
  describe('POST /transferencias', () => {
    let token;
    
    beforeEach(async () => {
      token = await getToken('julio.lima', '123456');
    });

    it('Should return status 201 when the transfer value is equal or greater than R$10,00', async () => {
      const bodyTransfers = { ...postTransferencias };
      
      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransfers);
      
      expect(response.status).to.equal(201);
    });

    it('Should return status 422 when the transfer value is below R$10,00', async () => {
      const bodyTransfers = { ...postTransferencias };
      bodyTransfers.valor = 7;

      const response = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransfers);
      
      expect(response.status).to.equal(422);
    });
  });
});