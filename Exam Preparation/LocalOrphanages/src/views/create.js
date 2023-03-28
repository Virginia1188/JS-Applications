import { create } from '../data/products.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

// TODO replace with actual view

const createTemplate = (onCreate) => html`
<section id="create-page" class="auth">
    <form id="create" @submit=${onCreate}>
        <h1 class="title">Create Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone">
        </article>

        <input type="submit" class="btn submit" value="Create Post">
    </form>
</section>
`;

export async function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({title, description, imageUrl, address, phone },form){

        if([title, description, imageUrl, address, phone ].some(f => f=='')){
            return alert('All fields are required');
        }
        const result = create({title, description, imageUrl, address, phone });
        form.reset();
        ctx.page.redirect('/');
    }
}