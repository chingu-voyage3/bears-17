const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const Router = require('koa-router');

const app = new Koa();
const router =  new Router();

const QuestionController = require('./controller/index.js')

const port = process.env.API_PORT || 3000;

// Mongoose

// Promise Library for mongoose
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.DB_URL)
  .then((res) => {
    console.log("Mongoose connected")
  })
  .catch((err) => {
    console.log('Error Connecting');
    console.error(err);
  });


app.use(koaBody());

router
  .get('/', async (ctx, next) => {
    ctx.body = 'Hello Koa';
  })
  .get('/api/get-questions', QuestionController.getQuestions);

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
