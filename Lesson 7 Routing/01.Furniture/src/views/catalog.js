import { getAll } from '../api/data.js';
// import { html, until } from '../lib.js';
import {html,render} from 'https://unpkg.com/lit-html?module';
import page from '../../node_modules/page/page.mjs';
import {until} from '../../node_modules/lit-html/directives/until.js';

// template
const catalogTemplate = (dataPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">    
 
</div>     
`;
// ${until(dataPromise),html`<p>Loading &hellip;</p>`}
const itemTemplate = (item) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
            <p>${item.description}</p>
            <footer>
                <p>Price: <span>${item.price}' $</span></p>
            </footer>
            <div>
                <a href="${`/details/${item._id}`}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>
`;

export function catalogPage(ctx) {
    // console.log(ctx);
    ctx.render(catalogTemplate(loadItems()));

}

async function loadItems(){
    const items = await getAll();
    console.log(items);

    return items.map(itemTemplate);
}