import { deleteData, getById } from '../data/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (product, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
    <img id="details-img" src=${product.imageUrl} alt="example1" />
    <p id="details-title">${product.name}</p>
    <div id="info-wrapper">
        <div id="details-description">
        <p> ${product.description}</p>
            <p id="nutrition">Nutrition</p>
            <p id = "details-nutrition"> ${product.nutrition} </p>
        </div>
        ${product.canEdit ? 
        html`<div id="action-buttons">
                <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
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
            ctx.page.redirect('/');
        }
    }

}