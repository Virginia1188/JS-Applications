import { byUserId } from '../data/memes.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const profileTemplate = (memes,userData) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

        ${memes.length > 0 ? html`
            ${memes.map(memeTemplate)}` : html`<p class="no-memes">No memes in database.</p>`}
        
    </div>
</section>
`;

const memeTemplate = (meme)=> html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/allmemes/${meme._id}">Details</a>
</div>
`;

export async function profilePage(ctx) {
    const userData = await getUserData();
    const memes = await byUserId(userData._id);
    console.log(userData);
    ctx.render(profileTemplate(memes, userData));
}