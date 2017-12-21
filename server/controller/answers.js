const mongoose = require('mongoose');
const Question = require('../models/question.js');
const Answer = require('../models/answer.js');
const trim = require('deep-trim-node');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;
Joi.objectId = require('eko-joi-objectid')(Joi, ObjectId);

exports.addAnswer = async (ctx) => {
  const { question_id: questionId } = ctx.answer;

  await Question.findById(questionId)
    .then((res) => {
      if (!res) {
        ctx.body = {
          err: 'QuestionID does not exist on the DB',
        };
        return ctx.body;
      }
      const answer = new Answer(ctx.request.body);
      ctx.body = answer.save();
      return ctx.body;
    })
    .catch((err) => {
      ctx.body = {
        err,
        message: 'Internal DB error, please try again',
      };
      return ctx.body;
    });
};

exports.findAnswersById = async (ctx) => {
  const { id: question_id } = ctx.params;

  await Answer.find({ question_id })
    .then((res) => {
      if (res.length === 0) {
        ctx.body = { err: 'No Answers with that ID' };
        return ctx.body;
      }

      ctx.body = res;
      return ctx.body;
    }).catch((err) => {
      console.error(err);
      ctx.body = { err: err.message };
      return ctx.body;
    });
};

exports.validateAnswer = async (ctx, next) => {
  const answer = trim(ctx.request.body);

  const schema = Joi.object()
    .keys({
      question_id: Joi.objectId()
        .required(),
      body: Joi.string()
        .required(),
      author: Joi.object({
        _id: Joi.objectId(),
        name: Joi.string(),
        avatar: Joi.string(),
      }),
    });

  const result = await Joi.validate(answer, schema)
    .then(res => res)
    .catch((err) => {
      console.error(err);
      return { err: err.details };
    });

  if (result.err) {
    ctx.body = result;
    return ctx.body;
  }

  ctx.answer = result;
  return next();
};
