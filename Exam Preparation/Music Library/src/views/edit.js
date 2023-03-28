import { html } from '../lib.js';
import { getById } from '../data/products.js';
import { createSubmitHandler } from '../utils.js';
import { updateProduct } from '../data/products.js';

const editTemplate = (product, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="singer" .value=${product.singer} id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" .value=${product.album} id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" .value=${product.imageUrl} id="album-img" placeholder="Image url" />
            <input type="text" name="release" .value=${product.release} id="album-release" placeholder="Release date" />
            <input type="text" name="label" .value=${product.label} id="album-label" placeholder="Label" />
            <input type="text" name="sales" .value=${product.sales} id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);

    ctx.render(editTemplate(product, createSubmitHandler(onEdit)));

    async function onEdit({ singer, album,  imageUrl,  release,  label,  sales }) {
        if ([singer, album,  imageUrl,  release,  label,  sales ].some(p => p == '')) {
            return alert('All fields are required');
        }

        await updateProduct(id, { singer, album,  imageUrl,  release,  label,  sales  });

        ctx.page.redirect(`/dashboard/${id}`);

    }
}