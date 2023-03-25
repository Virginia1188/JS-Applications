
import { deleteMeme, getMemeById } from '../data/memes.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (userData,meme,onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
              ${meme.description}
            </p>

            ${userData && userData.canEdit ? html`
            <a class="button warning" href="/allmemes/${meme._id}/edit">Edit</a>
            <button class="button danger" @click=${onDelete}>Delete</button>` : null}
            
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);
    const userData = await getUserData();
    console.log(userData);

    if(userData && userData._id == meme._ownerId){
        userData.canEdit = true;
    }

    ctx.render(detailsTemplate(userData,meme, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure?');

        if(choice){
            await deleteMeme(id);
            ctx.page.redirect('/allmemes');
        }
    }
}