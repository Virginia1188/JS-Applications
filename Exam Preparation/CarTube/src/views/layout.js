import { html } from '../lib.js';

export const layoutTemplate = (userData, content) => html`
<header>
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/listings">All Listings</a>
        <a href="/search">By Year</a>

        ${userData ? html`
        <div id="profile">
            <a>Welcome ${userData.username}</a>
            <a href="/mylistings">My Listings</a>
            <a href="/create">Create Listing</a>
            <a href="/logout">Logout</a>
        </div>` : html`
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        `}

    </nav>
</header>


<main>
${content}
</main>
`;

