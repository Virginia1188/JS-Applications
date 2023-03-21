import {html,render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {until} from '../node_modules/lit-html/directives/until.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


const root = document.querySelector('div.conteiner');

page(decorateContext);

page('/',catalogPage);
page('/details/:id',detailsPage);
page('/create',createPage);
page('/edit/:id',editPage);
page('/login',loginPage);
page('/register',registerPage);
page('/my-furniture',catalogPage);

page.start();



function decorateContext(ctx, next){
    ctx.render =(content)=> render(content,root);

    next();
}