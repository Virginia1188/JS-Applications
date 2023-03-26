import { createListing } from '../data/cars.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const createTemplate = (onCreate) => html`
<section id="create-listing">
    <div class="container">
        <form id="create-form" @submit=${onCreate}>
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;

export async function createPage(ctx) {

    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({brand, model, description, year, imageUrl, price }){

        if([brand, model, description, year, imageUrl, price ].some(l => l=='')){
            return alert('All fields are required');
        }

        if(year <= 0 ){
            return alert('Invalid year! Year must be positive number!');
        }

        if( price <= 0){
            return alert('Inavild price! Price must be a positive number!');
        }
        await createListing({brand, model, description, year, imageUrl, price });

        ctx.page.redirect('/listings');
    }
}