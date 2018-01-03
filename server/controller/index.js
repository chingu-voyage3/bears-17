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

exports.markSpam = async (ctx) => {
  const user = ctx.state.user.id;
  if (!user) {
    ctx.body = 'Not authorized';
    return ctx.body;
  }
  const doc = await Question.findOne({ _id: ctx.params.id })
    .then(data => data )
    .catch(err => err.message);
  const userMarked = doc.spam.includes(user);
  const updates = userMarked
    ? { $pull: { spam: user } }
    : { $addToSet: { spam: user } };
  return doc.update(updates)
    .then(res => ctx.body = res)
    .catch(err => ctx.body = err.message);
};
