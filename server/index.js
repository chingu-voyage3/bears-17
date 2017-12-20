const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const Router = require('koa-router');
const QuestionController = require('./controller/index.js');
const AnswerController = require('./controller/answers.js')

const app = new Koa();
const router = new Router();

const port = process.env.API_PORT || 3000;

// Promise Library for mongoose
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.DB_URL, { useMongoClient: true })
  .then((res) => {
    console.log('Mongoose connected');
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
  .post('/api/answer', AnswerController.validateAnswer, AnswerController.addAnswer);

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
