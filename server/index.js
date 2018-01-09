const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const Router = require('koa-router');
const QuestionController = require('./controller/index.js');
const AnswerController = require('./controller/answers.js');
const session = require('koa-session');

const app = new Koa();
const router = new Router();

const port = process.env.API_PORT || 3000;
const db =
  process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB_URL;

  // Authentication
const passport = require('koa-passport');
require('./controller/auth.js');

app.use(passport.initialize());
app.use(passport.session());

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

// sessions
app.keys = [process.env.SESSION_KEY_1];
app.use(session({}, app));

router
  .get('/', async (ctx) => {
    ctx.body = 'Hello Koa';
  })
  .get('/dashboard', async (ctx) => {
    ctx.body = 'success';
  })
  .get('/api/questions', QuestionController.getQuestions)
  .get('/api/questions/random/:limit?', QuestionController.getRandomQuestions)
  .get('/api/question/:id', QuestionController.getId)
  .post('/api/question/:id/vote', QuestionController.vote)
  .get('/api/answers/:id', AnswerController.findAnswersById)
  .post(
    '/api/answer',
    AnswerController.validateAnswer,
    AnswerController.addAnswer,
  )
  .post('/api/answer/:id/flag', AnswerController.flag)
  .post('/api/questions/:id/spam', QuestionController.markSpam)
  .post(
    '/api/login',
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
    }),
  )
  .post('/api/register', passport.authenticate('local-register', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  }));

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}
