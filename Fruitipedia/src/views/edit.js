import { html } from '../lib.js';
import { getById,updateData } from '../data/data.js';
import { createSubmitHandler } from '../utils.js';


const editTemplate = (product,onEdit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Fruit</h2>
    <form class="edit-form" @submit=${onEdit}>
        <input
        type="text"
        name="name"
        .value=${product.name}
        id="name"
        placeholder="Fruit Name"
        />
        <input
        type="text"
        name="imageUrl"
        .value=${product.imageUrl}
        id="Fruit-image"
        placeholder="Fruit Image URL"
        />
        <textarea
        id="fruit-description"
        name="description"
        .value=${product.description}
        placeholder="Description"
        rows="10"
        cols="50"
        ></textarea>
        <textarea
        id="fruit-nutrition"
        name="nutrition"
        .value=${product.nutrition}
        placeholder="Nutrition"
        rows="10"
        cols="50"
        ></textarea>
        <button type="submit">post</button>
    </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
   
    ctx.render(editTemplate(product,createSubmitHandler(onEdit)));

    async function onEdit({name,imageUrl, description, nutrition} ){
        if([name,imageUrl, description, nutrition].some(p => p =='')){
            return alert('All fields are required');
        }

        await updateData(id,{name,imageUrl, description, nutrition});
      
        ctx.page.redirect(`/details/${id}`);

    }
}