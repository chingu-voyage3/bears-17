const Question = require('../models/question.js');

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
  const { page } = ctx.request.query;
  const limit = 10;
  const skip = (page - 1) * limit;
  await Question.find({})
    .limit(limit)
    .skip(skip)
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
