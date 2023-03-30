import { html } from '../lib.js';
import { getAll } from '../data/data.js';

// TODO replace with actual view

const productsTemplate = (products) => html`
<section id="dashboard">
    <h2>Job Offers</h2>

    ${products.length > 0 ? 
    html`${products.map(productTemplate)}` :
    html`<h2>No offers yet.</h2>`}
    
</section>

`;

const productTemplate = (product) => html`
<div class="offer">
    <img src=${product.imageUrl} alt="./images/example3.png" />
    <p>
        <strong>Title: </strong><span class="title">${product.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${product.salary}</span></p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
</div>
`;

export async function productsPage(ctx) {
    const products = await getAll();
    console.log(products);
    ctx.render(productsTemplate(products));
}