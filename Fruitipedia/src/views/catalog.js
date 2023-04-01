import { html } from '../lib.js';
import { getAll } from '../data/data.js';


const productsTemplate = (products) => html`
<h2>Fruits</h2>
<section id="dashboard">
    ${products.length > 0 ? 
    html`${products.map(f => productTemplate(f))}` : html`<h2>No fruit info yet.</h2>`}
</section>`;

const productTemplate = (product) => html`
<div class="fruit">
    <img src=${product.imageUrl} alt="example1" />
    <h3 class="title">${product.name}</h3>
    <p class="description">${product.description}</p>
    <a class="details-btn" href="/details/${product._id}">More Info</a>
</div>`;

export async function catalogPage(ctx) {
    const products = await getAll();
   
    ctx.render(productsTemplate(products));
}