import { deletePet, getAllDonations, getById, getByUserDonation, sendDonation} from '../data/products.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';
// import { getBuyForUser } from '../data/products.js';


const detailsTemplate = (pet, onDelete,onDonation,donationCount) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donationCount}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            ${pet.user ? html`
            <div class="actionBtn">
                ${pet.canEdit ? 
                html`
                    <a href="/dashboard/${pet._id}/edit" class="edit">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>` : null}
                ${pet.canDonate ?
                html`<a @click=${onDonation} href="javascript:void(0)" class="donate">Donate</a>` : null}
            </div>` : null}

        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const userData = await getUserData();
    const pet = await getById(id);
    let userCanDonate;
    let donationCount =  await getDonations();

    async function getDonations(){
        const allDonation = await getAllDonations(id);
        return Number(allDonation) * 100;
    };
    
    if (userData) {
        userCanDonate = await getByUserDonation(id, userData._id);
        pet.user = true;
        if (userData._id === pet._ownerId) {
            pet.canEdit = true;
            
        } else if (userCanDonate == 0) {
            pet.canDonate = true;
        }
    }
    update(donationCount);
    function update(donationCount){
        ctx.render(detailsTemplate(pet, onDelete,onDonation,donationCount));
    }

    
    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deletePet(id);
            ctx.page.redirect('/');
        }
    }

    async function onDonation() {

        const result = await sendDonation( id );
        userCanDonate = await getByUserDonation(id, userData._id);
        donationCount = getDonations();
        update(donationCount);
        ctx.page.redirect(`/dashboard/${id}`);
    }

   
}