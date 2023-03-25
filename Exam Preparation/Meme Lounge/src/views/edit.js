import { createMeme, editMeme, getMemeById } from '../data/memes.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (meme,onEdit) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${onEdit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    console.log(id);
    const meme = await getMemeById(id);
    console.log(meme);

    ctx.render(editTemplate(meme, createSubmitHandler(onEdit)));

    async function onEdit({ title, description, imageUrl }, form) {

        if(title == ''|| description =='' || imageUrl =='' ){
            return alert('All fields are required');
        }

        await editMeme(id,title, description, imageUrl);
        form.reset();
        ctx.page.redirect(`/allmemes/${id}`);
    }
}