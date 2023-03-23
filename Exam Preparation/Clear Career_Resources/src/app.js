import {page} from './lib.js';
import { render,html } from './lib.js';
import { getUserData } from './utils.js';
// import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { layoutTemplate } from './views/layout.js';
import { dashboardPage } from './views/dashboard.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

// import * as api from './data/applications.js';

// window.api = api;

const root = document.getElementById('wrapper');

page(decorateContext);

page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/dashboard/:id',detailsPage);
page('/dashboard/:id/edit',editPage);


page.start();

function decorateContext(ctx, next) {

    ctx.render = renderView;
    next();
}

function renderView(content) {
    const userData = getUserData();

    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}