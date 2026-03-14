import request from 'supertest';
import { expect } from 'chai';
import getToken from '../helpers/authentication.js';
import 'dotenv/config';
import postTransferencias from '../fixtures/postTransferencias.json' assert { type: "json" };

describe('Transferencias', () => {
  let token;
    
  beforeEach(async () => {
    token = await getToken('julio.lima', '123456');
  });

  describe('POST /transferencias', () => {
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

  describe('GET /transferencias/{id}', () => {
    it('Should return status 200 and the data returned should match the database values when the ID is valid', async () => {
      const response = await request(process.env.BASE_URL)
        .get('/transferencias/3')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).to.equal(200);

      expect(response.body.id).to.equal(3);
      expect(response.body.id).to.be.a('number');
      expect(response.body.conta_origem_id).to.equal(1);
      expect(response.body.conta_origem_id).to.be.a('number');
      expect(response.body.conta_destino_id).to.equal(2);
      expect(response.body.conta_destino_id).to.be.a('number');
      expect(response.body.conta_origem_id).to.equal(1);
      expect(response.body.conta_origem_id).to.be.a('number');
      expect(response.body.valor).to.equal(500.00); // Should FAIL (the database returns a string value)
      expect(response.body.valor).to.be.a('number');
      expect(response.body.data_hora).to.equal('2026-02-25T20:59:17.000Z');
      expect(response.body.data_hora).to.be.a('string');
    });
  });

  describe('GET /transferencias', () => {
    it('Should return status 200 and 10 elements at the first page after specifying the limit of 10 registers', async () => {
      const response = await request(process.env.BASE_URL)
        .get('/transferencias?page=1&limit=10')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).to.equal(200);
      expect(response.body.limit).to.equal(10);
      expect(response.body.transferencias).to.have.lengthOf(10); // Chai method to validate the length of an array
    });
  });
});