import { html } from '../lib.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../utils.js';

// TODO change with actual view

export const loginTemplate = (onLogin) => html`
<section id="login">
    <div class="container">
        <form id="login-form" @submit=${onLogin} action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    
    async function onLogin({ username, password }, form) {
        await login(username, password);
        form.reset();
        
        ctx.page.redirect('/listings');
    }
}