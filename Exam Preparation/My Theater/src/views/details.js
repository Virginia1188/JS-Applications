import { deleteData, getAllLikes, getById, getUserLikes, postLikes } from '../data/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (product, onDelete, onLike, allLikes, userLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${product.title}</h1>
            <div>
                <img src=${product.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${product.description}</p>
            <h4>Date: ${product.date}</h4>
            <h4>Author: ${product.author}</h4>
            <div class="buttons">

                ${product.canEdit ? 
                html`
                <a  class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${product._id}">Edit</a>` : null}

                ${product.canLike && userLike === 0 ? 
                html`
                <a  class="btn-like" @click=${onLike} href="javascript:void(0)">Like</a>` : null}
                
            </div>
            <p class="likes">Likes: ${allLikes}</p>
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData =  getUserData();
    const product = await getById(id);
    let allLikes = await getAllLikes(id);
 
    
    if (userData) {
        let userLike = await getUserLikes(id, userData._id);
        if (userData._id === product._ownerId) {
            product.canEdit = true;
            
        }
         if (userData._id != product._ownerId ) {
            product.canLike = true;
        }

        ctx.render(detailsTemplate(product, onDelete, onLike, allLikes, userLike));
    }
    
    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteData(id);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike(e){
        e.preventDefault();
         postLikes(id);
        ctx.page.redirect(`/details/${id}`);
    }
      
}