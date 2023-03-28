import { deleteProduct, getAllLikes, getById, getUseerLikes, sendLikes} from '../data/products.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (product, onDelete, onLike, allLikes) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${product.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${product.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${product.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${product.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${product.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${product.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${allLikes}</span></div>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            ${product.canEdit ? 
            html`
            <a href="/dashboard/${product._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`: null}
            ${product.canLike  ? 
            html`
            <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>` : null}

        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData = await getUserData();
    const product = await getById(id);
    let allLikes = await getAllLikes(id);
    let userLikes;

    if (userData) {
        userLikes = await getUseerLikes(id, userData._id);
        if (userData._id === product._ownerId) {
            product.canEdit = true;

        } else if(userLikes == 0 && userData._id != product._ownerId){
            product.canLike = true;
        }
    }
    update(allLikes);

    function update (allLikes,userLikes){
        ctx.render(detailsTemplate(product, onDelete,onLike, allLikes));
    }
    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteProduct(id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onLike(){
        const result = await sendLikes(id);
        allLikes = await getAllLikes(id);
        userLikes = await getUseerLikes(id, userData._id);
        update(allLikes);
        ctx.page.redirect(`/dashboard/${id}`);
    }

}