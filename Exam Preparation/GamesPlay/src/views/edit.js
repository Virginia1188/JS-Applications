import { html } from '../lib.js';

import { createSubmitHandler } from '../utils.js';
import {updateGame,getById} from '../data/data.js';

const editTemplate = (game,onEdit) => html`
<section id="edit-page" class="auth">
    <form id="edit" @submit=${onEdit}>
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${game.title} value="">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value=${game.category} value="">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel} value="">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl} value="">

            <label for="summary">Summary:</label>
            <textarea name="summary" .value=${game.summary} id="summary"></textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
   
    ctx.render(editTemplate(product,createSubmitHandler(onEdit)));

    async function onEdit({ title, category, maxLevel, imageUrl, summary} ){
        if([title, category, maxLevel, imageUrl, summary].some(p => p =='')){
            return alert('All fields are required');
        }

        await updateGame(id,{ title, category, maxLevel, imageUrl, summary });

        ctx.page.redirect(`/catalog/${id}`);

    }
}