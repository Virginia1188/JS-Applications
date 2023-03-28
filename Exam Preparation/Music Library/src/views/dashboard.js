import { html } from '../lib.js';
import { getAll } from '../data/products.js';

const productsTemplate = (products) => html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->

       ${products.length > 0 ? html`${products.map(productTemplate)}` : html`<h2>There are no albums added yet.</h2>`}
    </ul>

</section>

`;

const productTemplate = (product) => html`
<li class="card">
    <img src=${product.imageUrl} alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${product.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${product.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${product.sales}</span></p>
    <a class="details-btn" href="/dashboard/${product._id}">Details</a>
</li>
`;

export async function productsPage(ctx) {
    const products = await getAll();
    console.log(products);
    ctx.render(productsTemplate(products));
}