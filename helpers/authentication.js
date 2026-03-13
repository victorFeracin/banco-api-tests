import request from 'supertest';
import 'dotenv/config';

const getToken = async (username, password) => {
  const response = await request(process.env.BASE_URL)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({
      'username': username,
      'senha': password
    });

  return response.body.token;
}

export default getToken;