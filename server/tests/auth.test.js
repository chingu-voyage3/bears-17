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

  it('should return a 302 redirect as well as a location of dashboard if user has logged in successfully', async () => {
    const url = '/api/login';
    const response = await request(app.callback()).post(url).send(loginData);
    expect(response.status).toEqual(302);
    expect(response.header.location).toEqual('/dashboard');
  });

  if ('should return a 302 redirect to the locaation of / if user fails to login', async () => {
    const url = '/api/login';
    const response = await request(app.callback()).post(url).send(failLogin);
    expect(response.status).toEqual(302);
    expect(response.header.location).toEqual('/');
    expect(response.body).toEqual('Hello Koa');

  });
});
