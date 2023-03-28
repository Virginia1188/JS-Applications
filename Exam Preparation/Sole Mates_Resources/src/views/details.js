import {  deleteProduct, getById } from '../data/products.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (product, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
        <img src=${product.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
        <p>Brand: <span id="details-brand">${product.brand}</span></p>
        <p>
        Model: <span id="details-model">${product.model}</span>
        </p>
        <p>Release date: <span id="details-release">${product.release}</span></p>
        <p>Designer: <span id="details-designer">${product.designer}</span></p>
        <p>Value: <span id="details-value">${product.value}</span></p>
    </div>

${product.canEdit ? 
    html`<div id="action-buttons">
        <a href="/products/${product._id}/edit" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>` : null}
 
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData = await getUserData();
    const product = await getById(id);
   
    
    if (userData) {
        if (userData._id === product._ownerId) {
            product.canEdit = true;

        } 
    }
    ctx.render(detailsTemplate(product, onDelete));
    
    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteProduct(id);
            ctx.page.redirect('/products');
        }
    }

    // async function onBuy() {

    //     const result = await sendBuys( id );
    //     bought = await getBuyForUser(id, userData._id);
    //     // const allBuys = await countBuys(id);
    //     ctx.page.redirect(`/products/${id}`);
    // }

   
}