import koaRouter from 'koa-router';
import { PROJECTS, ASSETS_VERSION } from './const.js'

const router = new koaRouter();

router.get('/', async (ctx) => await ctx.render('index', { projects: PROJECTS, assets_version: ASSETS_VERSION }));
router.get('/case_studies', async (ctx) => await ctx.render('case_studies', { projects: PROJECTS, assets_version: ASSETS_VERSION }));
router.get('/project/:project_name', async (ctx) => {
    const projectName = ctx.params.project_name,
        keys = Object.keys(PROJECTS),
        currentIndex = keys.indexOf(projectName)
    ;
    if (currentIndex != -1) {
        const nextIndex = currentIndex == keys.length - 1 ? 0 : currentIndex + 1,
            nextProjectName = keys.at(nextIndex),
            prevIndex = currentIndex == 0 ? keys.length - 1 : currentIndex - 1,
            prevProjectName = keys.at(prevIndex)
        ;
        await ctx.render('project_page', {
            currentProject: { name: projectName, data: PROJECTS[projectName] },
            nextProject: { name: nextProjectName, data: PROJECTS[nextProjectName] },
            prevProject: { name: prevProjectName, data: PROJECTS[prevProjectName] },
            assets_version: ASSETS_VERSION
        });
    } else {
        ctx.redirect('/');
        ctx.status = 301;
    }
});

router.get('/favicon.ico', async (ctx) => {
    ctx.redirect('/img/favicon.ico')
})

export default router;
