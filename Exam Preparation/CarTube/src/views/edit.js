import { createListing, deleteListing, editListing, getById } from '../data/cars.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (car,onEdit) => html`
<section id="edit-listing">
    <div class="container">

        <form id="edit-form" @submit=${onEdit}>
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand} value="">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model} value="">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description} value="">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year} value="">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl} value="">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price} value="">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const car = await getById(id);
    console.log(car);


    ctx.render(editTemplate(car,createSubmitHandler(onEdit)));

    async function onEdit({brand,model,description,year,imageUrl,price}){

        if([brand,model,description,year,imageUrl,price].some(l => l=='')){
            return alert('All fields are required');
        }
        year = Number(year);
        price = Number(price);
        if(year <= 0 ){
            return alert('Invalid year! Year must be positive number!');
        }

        if( price <= 0){
            return alert('Inavild price! Price must be a positive number!');
        }
        await editListing(id, {brand,model,description,year,imageUrl,price});

        ctx.page.redirect(`/listings/${id}`);
    }

}