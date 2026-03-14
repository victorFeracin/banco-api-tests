import request from 'supertest';
import 'dotenv/config';
import postLogin from '../fixtures/postLogin.json' assert { type: "json" };

const getToken = async (username, password) => {
  const bodyLogin = { ...postLogin };
  
  const response = await request(process.env.BASE_URL)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send(bodyLogin);

  return response.body.token;
}

export default getToken;