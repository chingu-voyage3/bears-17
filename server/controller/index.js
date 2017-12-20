const Question = require('../models/question.js');
const ObjectId = require('mongodb').ObjectId;

exports.addQuestion = async (ctx) => {
  const question = ctx.request.body;

  const newQuestion = new Question(question);

  newQuestion.save((err) => {
    if (err) {
      console.error(err);
      return err;
    }
    // saved
    return true;
  });

  ctx.body = 'New Question Added';
  return ctx.body;
};

exports.getQuestions = async (ctx) => {
  await Question.find({})
    .then((res) => {
      ctx.body = res;
      return ctx.body;
    });
};

exports.getRandomQuestions = async (ctx) => {
  await Question.getRandom(ctx.params.limit)
    .then((result) => {
      ctx.body = result;
      return ctx.body;
    });
};

exports.getId = async (ctx) => {
  await Question.findById(ctx.params.id)
    .then((result) => {
      ctx.body = result;
      return ctx.body;
    })
    .catch((err) => {
      console.error(err);
      ctx.body = 'id not recognized';
      return ctx.body;
    });
};


exports.markSpam = async (ctx) => {
  ctx.user = { id: '5a2ff257fc13ae6d59000535' };
  await Question.update({ _id: ObjectId(ctx.params.id)},
    { $addToSet: { spam: ctx.user.id } }, { upsert: true },
  ).then((data) => {
    ctx.body = data;
    return ctx.body;
  })
    .catch((err) => {
      console.log(err);
    });
};
