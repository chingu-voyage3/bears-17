const Question = require('../models/question.js');
const Answer = require('../models/answer.js');

exports.addAnswer = async (ctx) => {
  await Question.findById(ctx.request.body.question_id)
    .then((res) => {
      if (res) {
        const answer = new Answer(ctx.request.body);
        return answer.save();
      }

      ctx.body = false;
      return ctx.body;
    });

  await Answer.find({ question_id: ctx.request.body._id })
    .then((res) => {
      const result = [res];
      ctx.body = result;
      return ctx.body;
    });
};
