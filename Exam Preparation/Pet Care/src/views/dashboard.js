import { html } from '../lib.js';
import { getAll } from '../data/products.js';

// TODO replace with actual view

const dashboardTemplate = (pets) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${pets.length > 0 ? 
        html`${pets.map(singleTemplate)}` :
        html`
        <div>
            <p class="no-pets">No pets in dashboard</p>
        </div>`}
    </div>
</section>`;

const singleTemplate = (pet) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src=${pet.image}>
    </article>
    <h2 class="name">${pet.name}</h2>
    <h3 class="breed">${pet.breed}</h3>
    <div class="action">
        <a class="btn" href="/dashboard/${pet._id}">Details</a>
    </div>
</div>
`;

export async function dashboardPage(ctx) {
    const pets = await getAll();
    console.log(pets);
    ctx.render(dashboardTemplate(pets));
}