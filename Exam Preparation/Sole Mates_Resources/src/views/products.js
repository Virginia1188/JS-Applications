import { html } from '../lib.js';
import { getAll } from '../data/products.js';


const productsTemplate = (products) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
    ${products.length > 0 ? 
    html`${products.map(productTemplate)}` :
    html`<h2>There are no items added yet.</h2>`}
    </ul>
</section>`;

const productTemplate = (product) => html`
<li class="card">
    <img src=${product.imageUrl} alt="travis" />
    <p>
    <strong>Brand: </strong><span class="brand">${product.brand}</span>
    </p>
    <p>
    <strong>Model: </strong
    ><span class="model">${product.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
    <a class="details-btn" href="/products/${product._id}">Details</a>
</li>`;

export async function productsPage(ctx) {
    const products = await getAll();
    console.log(products);
    ctx.render(productsTemplate(products));
}