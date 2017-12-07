const Question = require('../models/question.js');

exports.addQuestion = async (ctx) => {

  const question = ctx.request.body;

  let newQuestion  = new Question(question);

  newQuestion.save((err) => {
    if (err) {
      console.error(err, "error");
      return err;
    }
    // saved
    return true;
  })

  return ctx.body = "New Question Added";
};

exports.getQuestions = async (ctx) => {

  const questions = await Question.find({})
    .then((res) => {
      ctx.body = res;
      return ctx.body;
    });
};
