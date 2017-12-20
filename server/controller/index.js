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

exports.vote = async (ctx) => {
  await Question.findOneAndUpdate(
    { _id: ctx.params.id },
    { $inc: { votes: 1 } },
    { new: true },
  )
    .then((res) => {
      if (res) {
        ctx.body = res;
        return ctx.body;
      }

      ctx.body = {
        error: 'Question ID not found',
      };
      return ctx.body;
    })
    .catch((err) => {
      ctx.body = {
        error: err,
      };
      return ctx.body;
    });
};
