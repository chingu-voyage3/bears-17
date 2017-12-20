const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const Router = require('koa-router');
const QuestionController = require('./controller/index.js');
const AnswerController = require('./controller/answers.js')

const app = new Koa();
const router = new Router();

const port = process.env.API_PORT || 3000;
const db = process.env.NODE_ENV === 'test'
  ? process.env.DB_TEST
  : process.env.DB_URL;

// Promise Library for mongoose
mongoose.Promise = require('bluebird');

mongoose.connect(db, { useMongoClient: true })
  .then((res) => {
    console.log('Mongoose connected to', db);
  })
  .catch((err) => {
    console.log('Error Connecting');
    console.error(err);
  });

app.use(koaBody());

router
  .get('/', async (ctx) => {
    ctx.body = 'Hello Koa';
  })
  .get('/api/questions', QuestionController.getQuestions)
  .get('/api/questions/random/:limit?', QuestionController.getRandomQuestions)
  .get('/api/question/:id', QuestionController.getId)
  .get('/api/answers/:id', AnswerController.findAnswersById)
  .post('/api/answer', AnswerController.validateAnswer, AnswerController.addAnswer);

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
