
import { deleteGame, getAllComments, getById, postComment} from '../data/data.js';
import { html } from '../lib.js';
import { createSubmitHandler, getUserData } from '../utils.js';


// TODO add actual view
const detailsTemplate = (game, onDelete, onComment, allComments) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
        ${game.summary}.
        </p>

        <!-- DONE Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                ${allComments.length> 0 ? 
                html`${allComments.map(commentTemplate)}` :
                html`<p class="no-comment">No comments.</p>`}
            </ul>
            
        </div>

        <!-- DONE Edit/Delete buttons ( Only for creator of this game )  -->
        ${game.canEdit ? html`
        <div class="buttons">
            <a href="/catalog/${game._id}/edit" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : null}

    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${game.canComment ? html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form" @submit=${onComment}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` : null}


</section>
`;
const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const allComments = await getAllComments(id);
    console.log(allComments);

    const userData = await getUserData();
    const game = await getById(id);
   
    // let bought = 0;
    
    if (userData) {
        if (userData._id === game._ownerId) {
            game.canEdit = true;
        } else{
            game.canComment = true;
        }
    }
    ctx.render(detailsTemplate(game, onDelete, createSubmitHandler(onComment), allComments));
    
    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteGame(id);
            ctx.page.redirect('/');
        }
    }

    async function onComment(comment,form){
            const text = comment.comment;
            console.log(text);
        const send = await postComment(id, text);

        ctx.page.redirect(`/catalog/${id}`);
    }
    // async function onBuy() {

    //     const result = await sendBuys( id );
    //     bought = await getBuyForUser(id, userData._id);
    //     // const allBuys = await countBuys(id);
    //     ctx.page.redirect(`/products/${id}`);
    // }

   
}