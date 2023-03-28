import {page} from './lib.js';
import {render} from './lib.js';
import { getUserData } from './utils.js';
import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/home.js';
import { productsPage } from './views/products.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { logout } from './data/auth.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';



const root = document.getElementById('wrapper');

page(decorateContext);

page('index.html','/');
page('/', homePage);
page('/products', productsPage);
page('/login',loginPage);
page('/register', registerPage);
page('/logout',logoutAction);
page('/create',createPage);
page('/products/:id', detailsPage);
page('/products/:id/edit', editPage);
page('/search',searchPage);
page.start();

function decorateContext(ctx, next){
    ctx.render = renderView;
    next();
}

function renderView(content){
    const userData = getUserData();
    render(layoutTemplate(userData,content),root);
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/');
}