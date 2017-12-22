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
  let { page = 1, limit = 10 } = ctx.request.query;
  limit = Number(limit);
  limit = Number.isInteger(limit) ? limit : 10;
  const skip = (page - 1) * limit;

  await Question.find({})
    .limit(limit)
    .skip(skip)
    .then((res) => {
      if (res.length === 0) {
        ctx.body = { err: 'No search results' };
        return ctx.body;
      }
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

      const updates = userVoted
        ? {
          $pull: { voted_by: user_id },
          $inc: { votes: -1 },
        }
        : {
          $addToSet: { voted_by: user_id },
          $inc: { votes: 1 },
        };

      await Question.findOneAndUpdate(
        { _id: ctx.params.id },
        updates,
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
    })
    .catch((err) => {
      ctx.body = {
        error: err,
      };
      return ctx.body;
    });
};
