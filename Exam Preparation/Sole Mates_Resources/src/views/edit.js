import { html } from '../lib.js';
import { getById } from '../data/products.js';
import { createSubmitHandler } from '../utils.js';
import {updateProduct} from '../data/products.js';


const editTemplate = (product,onEdit) => html`
<section id="edit">
    <div class="form">
    <h2>Edit item</h2>
    <form class="edit-form" @submit=${onEdit}>
        <input
        type="text"
        name="brand"
        .value=${product.brand}
        id="shoe-brand"
        placeholder="Brand"
        />
        <input
        type="text"
        name="model"
        .value=${product.model}
        id="shoe-model"
        placeholder="Model"
        />
        <input
        type="text"
        name="imageUrl"
        .value=${product.imageUrl}
        id="shoe-img"
        placeholder="Image url"
        />
        <input
        type="text"
        name="release"
        .value=${product.release}
        id="shoe-release"
        placeholder="Release date"
        />
        <input
        type="text"
        name="designer"
        .value=${product.designer}
        id="shoe-designer"
        placeholder="Designer"
        />
        <input
        type="text"
        name="value"
        .value=${product.value}
        id="shoe-value"
        placeholder="Value"
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
   
    ctx.render(editTemplate(product,createSubmitHandler(onEdit)));

    async function onEdit({ brand, model,  imageUrl,  release,  designer,  value } ){
        if([brand, model,  imageUrl,  release,  designer,  value].some(p => p =='')){
            return alert('All fields are required');
        }

        await updateProduct(id,{ brand, model,  imageUrl,  release,  designer,  value });

        ctx.page.redirect(`/products/${id}`);

    }
}