import Koa from 'koa';
import render from '@koa/ejs';
import serve from 'koa-static';
import url from 'url';
import path from 'path';
import { hashFile } from 'hasha';

import router from './routes.js';
import { ASSETS_VERSION } from './const.js'

const app = new Koa(),
    __dirname = url.fileURLToPath(new URL('.', import.meta.url)),
    cvHash = await hashFile(path.resolve(__dirname, '../static/cv.pdf'))
;

render(app, {
    root: path.join(__dirname, 'views'),
    viewExt: 'ejs',
    layout: false
});

app.use(async (ctx, next) => {
    ctx.state.assets_version = ASSETS_VERSION;
    ctx.state.cvHash = cvHash;
    await next();
});

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.join(__dirname, '..', '/static'), { maxage: 365 * 24 * 60 * 60 * 1000 })); // 1y

const port = 5000;

app.listen(port, ()=>{
    console.log(`App is Started on port: ${port}`);
});
