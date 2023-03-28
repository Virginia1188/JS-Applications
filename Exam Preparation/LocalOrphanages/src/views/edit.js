import { html } from '../lib.js';
import { getById } from '../data/products.js';
import { createSubmitHandler } from '../utils.js';
import {updateProduct} from '../data/products.js';

const editTemplate = (product,onEdit) => html`
<section id="edit-page" class="auth">
    <form id="edit" @submit=${onEdit}>
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" .value=${product.title} id="title" value="">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" .value=${product.description} id="description" value="">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" .value=${product.imageUrl} id="imageUrl" value="">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" .value=${product.address} id="address" value="">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" .value=${product.phone} id="phone" value="">
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
   
    ctx.render(editTemplate(product,createSubmitHandler(onEdit)));

    async function onEdit({ title, description, imageUrl, address, phone} ){
        if([title, description, imageUrl, address, phone].some(p => p =='')){
            return alert('All fields are required');
        }

        await updateProduct(id,{ title, description, imageUrl, address, phone });

        ctx.page.redirect(`/${id}`);

    }
}