import { getSearch } from '../data/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const searchTemplate = (onSearch,userData,result) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search" @click=${onSearch}>
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button  class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    ${result !== undefined ? 
    html`
    <div class="search-result">
     ${result.length == 0 ? html`<p class="no-result">No result.</p>` : 
     html`${result.map(r => cardTemplate(r, userData))}`}
    </div>` : null}
</section>
`;

const cardTemplate = (product, userData)=> html`
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
</div>`;


export async function searchPage(ctx) {

    const userData = getUserData();
    ctx.render(searchTemplate(onSearch,userData));

    async function onSearch(e){
        if(e.target.tagName === 'BUTTON'){
            const txt = document.getElementById('search-input');
            const query = txt.value.trim();
            if(query == ''){
                return alert('All fields are required');
            }
            console.log(query);
            const result = await getSearch(query);
            console.log(result);
            txt.value = '';
            ctx.render(searchTemplate(onSearch,userData,result));
        }
    }
}


