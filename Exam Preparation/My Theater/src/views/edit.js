import { html } from '../lib.js';
import { getById,updateData } from '../data/data.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (product,onEdit) => html`
<section id="editPage">
    <form class="theater-form" @submit=${onEdit}>
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" .value=${product.title} type="text" placeholder="Theater name" value="">
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" .value=${product.date} type="text" placeholder="Month Day, Year" value="">
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" .value=${product.author} type="text" placeholder="Author"
                value="">
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description" .value=${product.description} 
                placeholder="Description"></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" .value=${product.imageUrl} type="text" placeholder="Image Url"
                value="">
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
   
    ctx.render(editTemplate(product,createSubmitHandler(onEdit)));

    async function onEdit({title, date, author, imageUrl, description} ){
        if([title, date, author, imageUrl, description].some(p => p =='')){
            return alert('All fields are required');
        }

        await updateData(id,{ title, date, author, imageUrl, description });
        ctx.page.redirect(`/details/${id}`);

    }
}