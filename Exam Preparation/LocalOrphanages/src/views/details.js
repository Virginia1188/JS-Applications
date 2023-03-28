import { deleteProduct, getAllDonations, getById, sendDonations, userDonate} from '../data/products.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

// TODO add actual view
const detailsTemplate = (product, onDelete,onDonate,allDonations,hasDonated) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${product.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${product.title}</h2>
                <p class="post-description">Description: ${product.description}</p>
                <p class="post-address">Address: ${product.address}</p>
                <p class="post-number">Phone number: ${product.phone}</p>
                <p class="donate-Item">Donate Materials: ${allDonations}</p>

                <div class="btns">
                    ${product.canEdit ? html`
                    <a href="/${product._id}/edit" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>` : null}
                    
                    ${product.canDonate && hasDonated == 0 ? 
                    html`<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>` : null}
                </div>

            </div>
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData = await getUserData();
    const product = await getById(id);
    let allDonations = await getAllDonations(id);
    let hasDonated = await userDonate(id, userData._id);
   
    
    if (userData) {
        if (userData._id === product._ownerId) {
            product.canEdit = true;  
        }else if(userData._id != product._ownerId){
            product.canDonate = true;
        }
    }
    update(allDonations,hasDonated);
    function update(allDonations,hasDonated){
        ctx.render(detailsTemplate(product, onDelete,onDonate,allDonations,hasDonated));
    }
    
    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteProduct(id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate(){
        const result = await sendDonations(id);
        hasDonated = await userDonate(id, userData._id);
        update(hasDonated);
        ctx.page.redirect(`/${id}`);
    }
}
