import {page} from './lib.js';
import {render} from './lib.js';
import { getUserData } from './utils.js';
import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { listingsPage } from './views/allListings.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myListingsPage } from './views/myListings.js';
// import { loginPage } from './views/login.js';
// import { registerPage } from './views/register.js';
// import { logout } from './data/auth.js';


//  TODO change root = change
const root = document.body;

page(decorateContext);

page('index.html','/');
page('/', homePage);
page('/login',loginPage);
page('/register', registerPage);
page('/logout',logoutAction);
page('/listings',listingsPage);
page('/create', createPage);
page('/listings/:id', detailsPage);
page('/listings/:id/edit',editPage);
page('/mylistings', myListingsPage);

page.start();

function decorateContext(ctx, next){

    ctx.render = renderView;

    next();
}

function renderView(content){
    console.log('before data');
    const userData = getUserData();
    console.log('after data');
    render(layoutTemplate(userData,content),root);
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/');
}