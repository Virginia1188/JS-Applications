import { html } from '../lib.js';
import { getAll, getByUser } from '../data/data.js';
import { getUserData } from '../utils.js';

const profileTemplate = (products,userData) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${userData.email}</h2>
    </div>
    <div class="board">
        ${products.length > 0 ? 
        html`${products.map(cardTemplate)}` :
        html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`}
        
    </div>
</section>
`;

const cardTemplate = (product) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${product.imageUrl}>
        <h2>${product.title}</h2>
        <h6>${product.date}</h6>
        <a href="/details/${product._id}" class="details-button">Details</a>
    </div>
</div>
`;

export async function profilePage(ctx) {
    const userData = getUserData();
    const products = await getByUser(userData._id);
    console.log(products);
    ctx.render(profileTemplate(products,userData));
}