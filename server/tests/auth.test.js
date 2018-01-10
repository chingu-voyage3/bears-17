require('dotenv').config();

const request = require('supertest');
const app = require('../index.js');
const mongoose = require('mongoose');
const Auth = require('../models/auth.js');


const loginData = {
  username: 'test',
  password: '12345',
};

const failLogin = {
  username: 'supertest',
  password: '12345',
};

describe('POST /api/login', () => {
  beforeAll(async (done) => {
    const newAuth = new Auth({
      local: {
        name: 'test',
        password: '12345',
      },
    });
    await newAuth.save();

    return done();
  });

  afterAll(async (done) => {
    await Auth.remove({ 'local.name': 'test' }).exec();
    return done();
  });

  it('should return a 200 as well and return true if user has logged in successfully', async () => {
    const url = '/api/login';
    const response = await request(app.callback()).post(url).send(loginData);
    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
  });

  if ('should return 200 and return a false object if user fails to login', async () => {
    const url = '/api/login';
    const response = await request(app.callback()).post(url).send(failLogin);
    expect(response.status).toEqual(200);
    expect(response.header.location).toEqual('/');
    expect(response.body.success).toEqual(false);
  });
});
