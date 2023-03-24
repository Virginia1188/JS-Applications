import { html } from '../lib.js';
import { deleteBook, getBookById } from '../data/books.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (book, onDelete) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">

            ${book.canEdit ? html`
                <a class="button" href="/home/${book._id}/edit">Edit</a>
                <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>` : null}

            ${book.canLike ? html`
                <a class="button" href="/like">Like</a>` : null}

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;


export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const userData = getUserData();
    const book = await getBookById(id);
    console.log(book);
    console.log(id);

    if(userData && userData._id == book._ownerId){
        book.canEdit = true;
    }
    
    if(userData && userData._id != book._ownerId){
        book.canLike = true;
    }


    ctx.render(detailsTemplate(book, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure?');
        if(choice){
            await deleteBook(id);
            ctx.page.redirect('/');
        }
    }
}