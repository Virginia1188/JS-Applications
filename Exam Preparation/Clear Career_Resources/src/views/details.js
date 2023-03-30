import { deleteData, getAllApplications, getById, getUserApplication, sendApplication } from '../data/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';


const detailsTemplate = (product, onDelete, onApply, allApplications) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${product.imageUrl} alt="example1" />
        <p id="details-title">${product.title}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${product.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${product.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${product.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${allApplications}</strong></p>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            ${product.canEdit ? 
            html`
            <a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
            

            <!--Bonus - Only for logged-in users ( not authors )-->
            ${product.canApply ? html`
            <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>` : null}
           
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData = await getUserData();
    const product = await getById(id);
    const allApplications = await getAllApplications(id);
    const userApplication = await getUserApplication(id, userData._id);


    if (userData) {
        if (userData._id === product._ownerId) {
            product.canEdit = true;
        } 

        if(userData._id != product._ownerId && userApplication == 0){
            product.canApply = true;
        }
    }
    ctx.render(detailsTemplate(product, onDelete, onApply, allApplications));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteData(id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function onApply(){
        const send = await sendApplication(id);
        const updateCount = await getAllApplications(id);
        ctx.render(detailsTemplate(product, onDelete, onApply, updateCount));
        ctx.page.redirect(`/details/${id}`);
    }


}