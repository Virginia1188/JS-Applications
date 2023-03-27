import { countBuys, deleteProduct, getById, sendBuys } from '../data/products.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';
import { getBuyForUser } from '../data/products.js';


const detailsTemplate = (product, onDelete, onBuy, bought) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${product.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">${bought}</span> times.</h4>
                <span>${product.description}</span>
            </div>
        </div>
        <div id="action-buttons">
            ${product.canEdit ? html`
            <a href="/products/${product._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}

            ${product.canBuy ? html`

            <a @click=${onBuy} href="" id="buy-btn">Buy</a>` : null}

        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData = await getUserData();
    const product = await getById(id);
   
    let bought = await countBuys(id);
    
    if (userData) {
        const userCanBuy = await getBuyForUser(id, userData._id);
        if (userData._id === product._ownerId) {
            product.canEdit = true;
            // console.log(product.canEdit);
        } else if (userCanBuy == 0) {
            product.canBuy = true;
        }
    }
    ctx.render(detailsTemplate(product, onDelete, onBuy, bought));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteProduct(id);
            ctx.page.redirect('/products');
        }
    }

    async function onBuy() {

        const result = await sendBuys( id );
        bought = await countBuys(id);
        // const allBuys = await countBuys(id);


        ctx.page.redirect(`/products/${id}`);
    }

   
}