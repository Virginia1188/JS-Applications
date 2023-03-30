import { html } from '../lib.js';
import { getById,updateData } from '../data/data.js';
import { createSubmitHandler } from '../utils.js';


const editTemplate = (product,onEdit) => html`
<section class="editPage">
    <form @submit=${onEdit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" .value=${product.name} class="name" type="text" value="">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" .value=${product.imgUrl} class="imgUrl" type="text" value="">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" .value=${product.price} class="price" type="text" value="12.80">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" .value=${product.releaseDate} class="releaseDate" type="text" value="">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" .value=${product.artist} class="artist" type="text" value="">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" .value=${product.genre} class="genre" type="text" value="">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" .value=${product.description} class="description" rows="10"
                    cols="10"></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
   
    ctx.render(editTemplate(product,createSubmitHandler(onEdit)));

    async function onEdit({ name, imgUrl, price, releaseDate, artist, genre, description } ){
        if([name, imgUrl, price, releaseDate, artist, genre, description].some(p => p =='')){
            return alert('All fields are required');
        }

        await updateData(id,{name, imgUrl, price, releaseDate, artist, genre, description});
        ctx.page.redirect(`/details/${id}`);

    }
}