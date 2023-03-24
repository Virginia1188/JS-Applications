import { html } from '../lib.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../utils.js';


export const loginTemplate = (onLogin) => html`

<section id="login-page" class="login">
    <form id="login-form"  @submit=${onLogin} action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }, form) {
        await login(email, password);
        form.reset();
        ctx.page.redirect('/');
    }
}