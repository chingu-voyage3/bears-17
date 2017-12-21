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
  const { user_id } = ctx.request.body;

  if (!user_id) {
    ctx.body = { error: 'user_id is required' };
    return ctx.body;
  }

  await Question.findOne({ _id: ctx.params.id })
    .then(async (res) => {
      if (!res) {
        ctx.body = { error: 'Question ID not found' };
        return ctx.body;
      }

      const userVoted = res.voted_by.includes(user_id);

      if (userVoted) {
        await Question.findOneAndUpdate(
          { _id: ctx.params.id },
          {
            $pull: { voted_by: user_id },
            $inc: { votes: -1 },
          },
          { new: true },
        )
          .then((question) => {
            ctx.body = question;
            return ctx.body;
          })
          .catch((err) => {
            ctx.body = {
              error: err,
            };
            return ctx.body;
          });
      } else {
        await Question.findOneAndUpdate(
          { _id: ctx.params.id },
          {
            $addToSet: { voted_by: user_id },
            $inc: { votes: 1 },
          },
          { new: true },
        )
          .then((question) => {
            ctx.body = question;
            return ctx.body;
          })
          .catch((err) => {
            ctx.body = {
              error: err,
            };
            return ctx.body;
          });
      }
    })
    .catch((err) => {
      ctx.body = {
        error: err,
      };
      return ctx.body;
    });
};
