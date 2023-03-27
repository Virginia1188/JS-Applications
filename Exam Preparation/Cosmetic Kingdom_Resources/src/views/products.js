import { html } from '../lib.js';
import { getAll } from '../data/products.js';

// TODO replace with actual view

const productsTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">
    ${products.length > 0 ? 
        html`${products.map(productTemplate)}` :
        html`<h2>No products yet.</h2>`}
</section>`;

const productTemplate = (product) => html`
    <div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/products/${product._id}">Details</a>
    </div>
`;

export async function productsPage(ctx) {
    const products = await getAll();
    console.log(products);
    ctx.render(productsTemplate(products));
}