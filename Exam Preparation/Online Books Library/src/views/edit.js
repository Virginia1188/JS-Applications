import { html } from '../lib.js';
import { editBook, getBookById } from '../data/books.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (book, onEdit) => html`
<section id="edit-page" class="edit">
    <form id="edit-form" @submit=${onEdit} action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" .value=${book.title} id="title" value="A Court of Thorns and Roses">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" .value=${book.description}
                        id="description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" .value=${book.imageUrl} id="image" value="/images/book1.png">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${book.type}>
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>
`;



export async function editPage(ctx) {
    const id = ctx.params.id;
    const book = await getBookById(id);
    console.log(book);
    
    async function onEdit({ title, description, imageUrl, type} , form) {

        if([title, description, imageUrl, type].some(f=> f=='')){
            return alert('All fields are required');
        }
        await editBook(id, { title, description, imageUrl, type});
        form.reset();
        ctx.page.redirect('/');
    }
    ctx.render(editTemplate(book, createSubmitHandler(onEdit)));
}