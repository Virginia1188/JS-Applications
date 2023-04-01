import { searchProduct } from '../data/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const searchTemplate = (onSearch,result) => html`
       <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
  <div class="search-result">
    ${Array.isArray(result) && result.length === 0 ? html`<p class="no-result">No result.</p>` : null}
    ${Array.isArray(result) && result.length > 0 ? html`${result.map(productTemplate)}` : null}
  <!--If there are matches display a div with information about every fruit-->
  </div>
        </section>`;

const productTemplate = (product) => html`
<div class="fruit">
  <img src=${product.imageUrl} alt="example1" />
  <h3 class="title">${product.name}</h3>
  <p class="description">${product.description}</p>
  <a class="details-btn" href="/details/${product._id}">More Info</a>
</div>`;

export async function searchPage(ctx) {

    ctx.render(searchTemplate(createSubmitHandler(onSearch)));

    async function onSearch({search},form){
        console.log(search);
        if(search == ''){
        return alert('All fields are required');
        }
        const result = await searchProduct(search);
        form.reset();

        ctx.render(searchTemplate(createSubmitHandler(onSearch),result));
    }
}