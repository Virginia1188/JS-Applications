import { html } from '../lib.js';
import { getAll } from '../data/products.js';

// TODO replace with actual view

const productsTemplate = (products) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>

    <div class="all-posts">
    ${products.length > 0 ? 
    html`${products.map(productTemplate)}` : 
    html`<h1 class="title no-posts-title">No posts yet!</h1>`}
    </div>
  
</section>
`;

const productTemplate = (product) => html`
<div class="post">
    <h2 class="post-title">${product.title}</h2>
    <img class="post-image" src=${product.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${product._id}" class="details-btn btn">Details</a>
    </div>
</div>
`;

export async function productsPage(ctx) {
    const products = await getAll();
    ctx.render(productsTemplate(products));
}