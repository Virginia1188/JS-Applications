import { deleteData, getById } from '../data/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';



const detailsTemplate = (product, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${product.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${product.name}</h1>
                <h3>Artist: ${product.artist}</h3>
                <h4>Genre: ${product.genre}</h4>
                <h4>Price: ${product.price}</h4>
                <h4>Date: ${product.releaseDate}</h4>
                <p>Description: ${product.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${product.canEdit ? html`
            <div class="actionBtn">
                <a href="/edit/${product._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>` : null}

        </div>
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
            await deleteData(id);
            ctx.page.redirect('/catalog');
        }
    }

}