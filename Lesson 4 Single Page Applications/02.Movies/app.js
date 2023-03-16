// import {} from './';

//[x] create app.js module
//[x] create router.js containing hide and display of view
//[x] placeholders for all views
//[x] implement views
// - create request logic
// - DOM manipulation logic

//[x] catalog
//[x] login
//[] register
//[] create
//[] details
//[] like
//[] edit
//[] delete

// show view home page

import {showView, updateNav} from './util.js';
import {homePage} from './home.js';
import {loginPage} from './login.js';
import {registerPage} from './register.js';
import {editPage} from './edit.js';
import {createPage} from './create.js';
import {detailsPage} from './details.js';

const routes = {
    '/': homePage,
    '/logout': logoutPage,
    '/login': loginPage,
    '/register': registerPage,
    '/create': createPage

};


document.querySelector('nav').addEventListener('click',navigate);
document.querySelector('#add-movie-button a').addEventListener('click',navigate);

function navigate(e){
    if(e.target.tagName == 'A' && e.target.href){
        e.preventDefault();
        const url = new URL(e.target.href);
        const view = routes[url.pathname];

        if(typeof view == 'function'){
            view();
        }
    }
}

function logoutPage(){
    localStorage.removeItem('user');
    updateNav();
}

updateNav();
homePage();