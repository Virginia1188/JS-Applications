import { byBrandSearch } from '../data/products.js';
import { html } from '../lib.js';
import { createSubmitHandler, getUserData } from '../utils.js';


const searchTemplate = (onSearch,isUser, result) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form class="search-wrapper cf" @submit=${onSearch}>
    <input
        id="#search-input"
        type="text"
        name="search"
        placeholder="Search here..."
        required
    />
    <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
    <ul class="card-wrapper">
        ${ Array.isArray(result) && result.length> 0  ? html`${result.map(r => productSearchTemplate(r,isUser))}` : null}
    </ul>
        ${Array.isArray(result) && result.length == 0 ? html`<h2>There are no results found.</h2>` : null}
  
    </div>
</section>
`;

const productSearchTemplate = (product,userData)=> html`
<li class="card">
<img src=${product.imageUrl} alt="travis" />
<p>
    <strong>Brand: </strong><span class="brand">${product.brand}</span>
</p>
<p>
    <strong>Model: </strong
    ><span class="model">${product.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
${userData ? 
    html`<a class="details-btn" href='/products/${product._id}'>Details</a>` : null}
</li>`;

let context;
let isUser;

export async function searchPage(ctx) {

    // const userData = await getUserData(); 
    context = ctx;
    isUser = await getUserData();
   updateResult( isUser);
}

function updateResult(isUser,result){
    context.render(searchTemplate( createSubmitHandler(onSearch),isUser, result, ));
}
async function onSearch({search},form){
      
    if(search == ''){
        return alert('All fields are required');
    }
    const result = await byBrandSearch(search);
    
    form.reset();
    updateResult(isUser,result);
    // ctx.page.redirect('/search');
}