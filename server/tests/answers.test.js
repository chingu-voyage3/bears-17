require('dotenv').config();

const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../index');
const Answer = require('../models/answer');
const answers = require('./data/testAnswers');

describe('GET /api/answers/:id', () => {
  beforeAll(() => {
    return Answer.create(answers);
  });

  afterAll(() => {
    return Answer.remove({}).exec();
  });

  it('should display a maximum of 10 answers by default', async () => {
    const url = '/api/answers/5a2ff186fc13ae7095000649';
    const response = await request(app.callback()).get(url);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toBe(10);
  });

  it('should limit the number of results if uses the limit query', async () => {
    const limit = 2;
    const url = `/api/answers/5a2ff186fc13ae7095000649?limit=${limit}`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.length).toBe(limit);
  });

  it('should display the second page of results if page query is 2', async () => {
    const limit = 2;
    const url = `/api/answers/5a2ff186fc13ae7095000649?limit=${limit}&page=2`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should sort answers by date in descending order by default', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should sort answers by votes', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649?sort_by=votes`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should sort answers by date', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649?sort_by=submitted_at`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should sort answers by date in ascending order', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649?sort=1`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should sort answers by votes in ascending order', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649?sort=1&sort_by=votes`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should return an error if sort_by value is not valid', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649?sort_by=invalidSort`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should return an error if sort value is not valid', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649?sort=2`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });

  it('should return an error if page has no items', async () => {
    const url = `/api/answers/5a2ff186fc13ae7095000649?page=5`;
    const response = await request(app.callback()).get(url);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchSnapshot();
  });
});
