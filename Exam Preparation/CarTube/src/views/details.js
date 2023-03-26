import { deleteListing, getById } from '../data/cars.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (car, userData, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>


        ${userData && userData.canEdit ? html`
        <div class="listings-buttons">
            <a href="/listings/${car._id}/edit" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list" >Delete</a>
        </div>` : null}

    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData = await getUserData();
    const car = await getById(id);

    if(userData && userData._id == car._ownerId){
        userData.canEdit = true;
    }
    ctx.render(detailsTemplate(car, userData, onDelete));

    
    async function onDelete(){
        const choice = confirm('Are you sure?');
        if(choice){
            await deleteListing(id);
            ctx.page.redirect('/listings');
        }
    }

}