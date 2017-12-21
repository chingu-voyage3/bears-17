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


exports.markSpam = async (ctx) => {
  ctx.user = { id: '5a2ff257fc13ae6d59000535' };
  if (!ctx.user) {
    ctx.body = 'Not authourized';
    return ctx.body;
  }
  await Question.findOne({ _id: ctx.params.id})
    .then(async (data) => {
      const userMarked = data.spam.includes(ctx.user.id);
      const updates = userMarked
        ? { $pull: { spam: ctx.user.id } }
        : { $addToSet: { spam: ctx.user.id } };

      await Question.update({ _id: ctx.params.id }, updates)
        .then((res) => {
          ctx.body = res;
        }).catch((err) => {
          ctx.body = err;
        });
    }).catch((err) => {
      ctx.body = err;
    });
};
