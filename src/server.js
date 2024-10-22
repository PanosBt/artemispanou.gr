import Koa from 'koa';
import render from '@koa/ejs';
import serve from 'koa-static';
import url from 'url';
import path from 'path';

import router from './routes.js';

const app = new Koa();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

render(app, {
    root: path.join(__dirname, 'views'),
    viewExt: 'ejs',
    layout: false
});

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.join(__dirname, '..', '/static')));

const port = 5000;

app.listen(port, ()=>{
    console.log(`App is Started on port: ${port}`);
});
