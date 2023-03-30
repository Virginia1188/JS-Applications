import { bySearch } from '../data/cars.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const searchTemplate = (onSearch, result) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container" @click=${onSearch}>
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${result !== undefined ? 
        html`${result.length > 0 ? 
        html`${result.map(carTemplate)}` :
        html`<p class="no-cars"> No results.</p>`}` :null}
    </div>
</section>`;

const carTemplate = (car) => html`
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

export async function searchPage(ctx){

    ctx.render(searchTemplate(onSearch));

    async function onSearch(e){

        if(e.target.tagName === 'BUTTON'){
            const input = document.getElementById('search-input');
            const query = input.value.trim();

            const result = await bySearch(query);
            input.value ='';
            ctx.render(searchTemplate(onSearch,result));
        }
    }

}