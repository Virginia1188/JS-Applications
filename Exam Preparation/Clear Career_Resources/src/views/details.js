// import { getApplications, getUserApplication } from '../data/applications.js';
import { deleteOffer, getById } from '../data/offers.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (offer,onDelete)=>html`
<section id="details">
    <div id="details-wrapper">
    <img id="details-img" src=${offer.imageUrl} alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
        Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
        <div id="details-description">
        <h4>Description</h4>
        <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${offer.requirements}</span>
        </div>
    </div>
    <p>Applications: <strong id="applications">0</strong></p>

    ${offer.canEdit ? html`
        <div id="action-buttons">

        <a href="/dashboard/${offer._id}/edit" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>

        <a href="" id="apply-btn">Apply</a>` : null}

    <!-- ${offer.canEdit || offer.canApply ? html`
    <div id="action-buttons">

        ${offer.canEdit ? html`
        <a href="/dashboard/${offer._id}/edit" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
        
        ${offer.canApply ? html`
        <a href="" id="apply-btn">Apply</a>` : null}
    </div> ` : null} -->
    
    </div> 
    </div>
</section>
`;


export async function detailsPage(ctx){
    const id = ctx.params.id;
    
    const offer = await getById(id);
    const userData = getUserData();

    if(userData && userData._id == offer._ownerId){
        offer.canEdit = true;
    }

    ctx.render(detailsTemplate(offer,onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure?');
        if(choice){
            await deleteOffer(id);
            ctx.page.redirect('/dashboard');
        }
    }
}



// export async function detailsPage(ctx){
//     const id = ctx.params.id;
//     // requesting data for applications
//     const requests = [
//         getById(id),
//         getApplications(id),
//     ];
//     const userData = getUserData();

//     if(userData){
//         requests.push(getUserApplication(id,userData._id));
//         console.log(userData._id);
//     }

//     const [offer, applications,hasApplied] = await Promise.all(requests);
//     offer.applications = applications;

//     // 
//     if(userData) {
//         offer.canEdit = userData._id == offer._ownerId; // returns boolean
//         offer.canApply = offer.canEdit == false && hasApplied == 0; //if zero the current user doesn't have applications for this offer
//     }

//     ctx.render(detailsTemplate(offer,onDelete));

//     async function onDelete(){
//         const choice = confirm('Are you sure?');
//         if(choice){
//             await deleteOffer(id);
//             ctx.page.redirect('/dashboard');
//         }
//     }
// }