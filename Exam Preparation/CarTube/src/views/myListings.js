import { myListings } from '../data/cars.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const myListingsTemplate = (myCars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

    ${myCars.length > 0 ? html`
        ${myCars.map(myCarTemplate)}` : html`
        <p class="no-cars"> You haven't listed any cars yet.</p>`}
 
    </div>
</section>`;


const myCarTemplate = (car)=> html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/listings/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function myListingsPage(ctx) {
    const userData = await getUserData();
    const myCars = await myListings(userData._id);

    ctx.render(myListingsTemplate(myCars));
}