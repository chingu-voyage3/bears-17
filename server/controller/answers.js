const mongoose = require('mongoose');
const Question = require('../models/question.js');
const Answer = require('../models/answer.js');
const trim = require('deep-trim-node');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;
Joi.objectId = require('eko-joi-objectid')(Joi, ObjectId);

exports.addAnswer = async (ctx) => {
  const { question_id: questionId } = ctx.answer;

  const newAnswer = ctx.answer;
  newAnswer.author = ctx.state.user;
  newAnswer.author.name = ctx.state.user.username;

  await Question.findById(questionId)
    .then((res) => {
      if (!res) {
        ctx.body = {
          err: 'QuestionID does not exist on the DB',
        };
        return ctx.body;
      }
      const answer = new Answer(newAnswer);
      return answer.save();
    }).then((res) => {
      ctx.body = res;
      return ctx.body;
    })
    .catch((err) => {
      ctx.body = {
        err,
      };
      return ctx.body;
    });
};

exports.findAnswersByUser = async (ctx) => {
  const answers = await Answer.find({ 'author._id': ObjectId(ctx.params.id) });
  ctx.body = answers;
  return ctx.body;
};

exports.findAnswersById = async (ctx) => {
  const SORTS = [-1, 1, '-1', '1'];
  const SORT_BYS = ['votes', 'submitted_at'];
  const { id: question_id } = ctx.params;
  let {
    limit = 10,
    page = 1,
    sort = -1,
    sort_by = 'submitted_at',
  } = ctx.request.query;

  limit = parseInt(limit, 10);
  limit = Number.isInteger(limit) ? limit : 10;

  const skip = (page - 1) * limit;

  if (!SORT_BYS.includes(sort_by)) {
    ctx.body = { err: `'${sort_by}' is not a valid value for 'sort_by'` };
    return ctx.body;
  }

  if (!SORTS.includes(sort)) {
    ctx.body = { err: `'${sort}' is not a valid value for 'sort'` };
    return ctx.body;
  }
  await Answer.find({ question_id: ObjectId(question_id) })
    .sort({ [sort_by]: sort })
    .skip(skip)
    .limit(limit)
    .then((res) => {
      if (res.length === 0) {
        ctx.body = page > 1 ? { err: "Page doesn't exist" } : [];
        return ctx.body;
      }

      ctx.body = res;
      return ctx.body;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = { err: err.message };
      return ctx.body;
    });
};

exports.flag = async (ctx) => {
  const { user_id } = ctx.request.body;

  if (!user_id) {
    ctx.body = { error: 'user_id is required' };
    return ctx.body;
  }

  await Answer.findOne(
    { _id: ctx.params.id },
    '-_id flagged_by',
  )
    .then(async (res) => {
      if (!res) {
        ctx.body = { error: 'Answer ID not found' };
        return ctx.body;
      }

      const userFlagged = res.flagged_by.includes(user_id);

      const updates = userFlagged
        ? { $pull: { flagged_by: user_id } }
        : { $addToSet: { flagged_by: user_id } };

      await Answer.findOneAndUpdate(
        { _id: ctx.params.id },
        updates,
        { new: true },
      ).then((answer) => {
        ctx.body = answer;
      });
    })
    .catch((error) => {
      ctx.body = { error };
    });

  return ctx.body;
};

exports.vote = async (ctx) => {
  const { user_id } = ctx.request.body;

  if (!user_id) {
    ctx.body = { error: 'user_id is required' };
    return ctx.body;
  }

  await Answer.findOne(
    { _id: ctx.params.id },
    '-_id voted_by',
  )
    .then(async (res) => {
      if (!res) {
        ctx.body = { error: 'Answer ID not found' };
        return ctx.body;
      }

      const userVoted = res.voted_by.includes(user_id);

      const updates = userVoted
        ? {
          $pull: { voted_by: user_id },
          $inc: { votes: -1 },
        }
        : {
          $addToSet: { voted_by: user_id },
          $inc: { votes: 1 },
        };

      await Answer.findOneAndUpdate(
        { _id: ctx.params.id },
        updates,
        { new: true },
      )
        .then((answer) => {
          ctx.body = answer;
        });
    })
    .catch((error) => {
      ctx.body = { error };
    });

  return ctx.body;
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
