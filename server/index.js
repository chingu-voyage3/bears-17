const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const Router = require('koa-router');
const send = require('koa-send');
const serve = require('koa-static');
const path = require('path');
const session = require('koa-session');

const QuestionController = require('./controller/index.js');
const AnswerController = require('./controller/answers.js');
const UserController = require('./controller/user.js');

const app = new Koa();
const router = new Router();

const port = process.env.API_PORT || 3000;
const db =
  process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB_URL;

// Authentication
const passport = require('koa-passport');
require('./controller/passport.js');

app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

const localAuth = async ctx => passport.authenticate('local', (err, user, info, status) => {
  if (err) return err;
  if (user === false) {
    ctx.body = { success: false };
    return ctx.body;
  }
  ctx.login(user);
  ctx.body = { success: true, user };
  return ctx.body;
})(ctx);

const localReg = async ctx => passport.authenticate('signup', (err, user, info, status) => {
  if (err) return err;
  if (user === false) {
    ctx.body = { success: false };
    return ctx.body;
  }
  ctx.login(user);
  ctx.body = { success: true, user };
  return ctx.body;
})(ctx);
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

app.use(serve('./dist'));

// sessions
app.keys = [process.env.SESSION_KEY_1];
app.use(session({}, app));

router
  .get('/api/questions', QuestionController.getQuestions)
  .post('/api/post/question', QuestionController.addQuestion)
  .get('/api/questions/random/:limit?', QuestionController.getRandomQuestions)
  .get('/api/questions/user/:id', QuestionController.findQuestionsByUser)
  .get('/api/question/:id', QuestionController.getId)
  .post('/api/question/:id/vote', QuestionController.vote)
  .get('/api/answers/:id', AnswerController.findAnswersById)
  .get('/api/answers/user/:id', AnswerController.findAnswersByUser)
  .post(
    '/api/answer',
    AnswerController.validateAnswer,
    AnswerController.addAnswer,
  )
  .post('/api/answer/:id/flag', AnswerController.flag)
  .post('/api/answer/:id/vote', AnswerController.vote)
  .get('/api/questions/total', QuestionController.totalQuestions)
  .post('/api/user/update-profile', UserController.updateProfile)
  .post('/api/questions/:id/spam', QuestionController.markSpam)
  .post('/api/login', localAuth)
  .post('/api/register', localReg)
  .get('/api/logout', (ctx) => {
    ctx.logout();
    ctx.body = { success: true };
    return ctx.body;
  })
  .get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
    }),
  )
  .get('/api/auth/google/callback', ctx =>
    passport.authenticate('google', (err, user, info) => {
      if (err) return err;
      if (user === false) {
        ctx.body = { success: false };
        return ctx.body;
      }
      ctx.login(user);
      ctx.body = { success: true, user };
      return ctx.body;
    })(ctx) )
  .get('*', async (ctx) => {
    await send(ctx, './dist/index.html');
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}
