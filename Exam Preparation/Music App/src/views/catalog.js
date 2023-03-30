import { html } from '../lib.js';
import { getAll } from '../data/data.js';
import { getUserData } from '../utils.js';


const productsTemplate = (products, userData) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${products.length > 0 ? 
    html`${products.map(p => productTemplate(p, userData))}` :
    html`<p>No Albums in Catalog!</p>`}

</section>
`;

const productTemplate = (product,userData) => html`
<div class="card-box">
    <img src=${product.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${product.name}</p>
            <p class="artist">Artist: ${product.artist}</p>
            <p class="genre">Genre: ${product.genre}</p>
            <p class="price">Price: ${product.price}</p>
            <p class="date">Release Date: ${product.releaseDate}</p>
        </div>
        ${userData ? html`
        <div class="btn-group">
            <a href="/details/${product._id}" id="details">Details</a>
        </div>` : null}
    </div>
</div>
`;

export async function catalogPage(ctx) {
    const products = await getAll();
    const userData = getUserData();
    console.log(products);
    ctx.render(productsTemplate(products, userData));
}