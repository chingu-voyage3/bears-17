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

describe('POST /api/answer/:id/flag', () => {
  const user_id = '5a3b95107ec0f5d96cf4cbe3';
  let answer;

  beforeEach(() => {
    answer = new Answer(answers[0])
    return answer.save();
  });

  afterEach(() => {
    return Answer.remove({}).exec();
  });

  it('should return an error message if answer ID does not exist', async () => {
    const url = `/api/answer/${answers[1]._id}/flag`;
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    // TODO: we should use constants for error messages and assert them here
    expect(response.body.error).toBeTruthy();
  });

  it('should return an error message if answer ID is not valid', async () => {
    const url = '/api/answer/invalidAnswerID/flag';
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeTruthy();
  });

  it('should return an error message if user ID not provided', async () => {
    const url = `/api/answer/${answer._id}/flag`;
    const response = await request(app.callback())
      .post(url);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeTruthy();
  });

  it('should add user ID to flagged_by if user not yet flagged', async () => {
    const answerBeforeFlag = await Answer.findOne(
      { _id: answer._id },
      '-_id flagged_by',
    );

    expect(answerBeforeFlag.flagged_by.length).toBe(0);

    const url = `/api/answer/${answer._id}/flag`;
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeFalsy();
    expect(response.body.flagged_by.includes(user_id)).toBe(true);
  });

  it('should remove user ID from flagged_by if user already flagged', async() => {
    const answerBeforeFlag = await Answer.findOneAndUpdate(
      { _id: answer._id },
      { $addToSet: { flagged_by: user_id } },
      {
        fields: '-_id flagged_by',
        new: true,
      },
    );

    expect(answerBeforeFlag.flagged_by.includes(user_id)).toBe(true);

    const url = `/api/answer/${answer._id}/flag`;
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeFalsy();
    expect(response.body.flagged_by.includes(user_id)).toBe(false);
  });
});

describe('POST /api/answer/:id/vote', () => {
  const user_id = '5a3b95107ec0f5d96cf4cbe3';
  let answer;

  beforeEach(() => {
    answer = new Answer(answers[0]);
    return answer.save();
  });

  afterEach(() => {
    return Answer.remove({}).exec();
  });

  it('should return an error message if answer ID does not exist', async () => {
    const url = `/api/answer/${answers[1]._id}/vote`;
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeTruthy();
  });

  it('should return an error message if answer ID is not valid', async () => {
    const url = '/api/answer/invalidAnswerID/vote';
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeTruthy();
  });

  it('should return an error message if user ID not provided', async () => {
    const url = `/api/answer/${answer._id}/vote`;
    const response = await request(app.callback()).post(url);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeTruthy();
  });

  it('should add user ID to voted_by if user not yet voted', async () => {
    const answerBeforeVote = await Answer.findOne(
      { _id: answer._id },
      '-_id voted_by'
    );

    expect(answerBeforeVote.voted_by.length).toBe(0);

    const url = `/api/answer/${answer._id}/vote`;
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeFalsy();
    expect(response.body.voted_by.includes(user_id)).toBe(true);
  });

  it('should remove user ID from voted_by if user already voted', async () => {
    const answerBeforeVote = await Answer.findOneAndUpdate(
      { _id: answer._id },
      { $addToSet: { voted_by: user_id } },
      {
        fields: '-_id voted_by',
        new: true,
      }
    );

    expect(answerBeforeVote.voted_by.includes(user_id)).toBe(true);

    const url = `/api/answer/${answer._id}/vote`;
    const response = await request(app.callback())
      .post(url)
      .send({ user_id });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.error).toBeFalsy();
    expect(response.body.voted_by.includes(user_id)).toBe(false);
  });
});
