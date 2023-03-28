import { html } from '../lib.js';

export const layoutTemplate = (userData, content) => html`
<header>

    <h1><a href="/">Orphelp</a></h1>

    <nav>
        <a href="/">Dashboard</a>

        ${userData ? html`
        <div id="user">
            <a href="/posts">My Posts</a>
            <a href="/create">Create Post</a>
            <a href="/logout">Logout</a>
        </div>` : html`
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`}
    </nav>
</header>

<main id="main-content">
${content}
</main>`;

