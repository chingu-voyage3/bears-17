const Koa = require('koa');

const app = new Koa();
const port = process.env.API_PORT || 3000;

app.use(async (ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
