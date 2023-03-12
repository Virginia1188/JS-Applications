import { html, render } from 'https://unpkg.com/lit-html?module';
import { contacts } from './contacts.js';

// export {contacts} from './contacts.js';
// export {html, render} from './node_modules/lit-html/lit-html.js';

const divContacts = document.getElementById('contacts');

const template = (user) => html`
<div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${user.name}</h2>
                <button class="detailsBtn">Details</button>
                <div class="details" id="${user.id}">
                    <p>Phone number: ${user.phoneNumber}</p>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
</div>
`;


    render(contacts.map(template), divContacts);

divContacts.addEventListener('click',showHide);
function showHide(e) {
    if(e.target.classList.contains('detailsBtn')){
        let parent = e.target.parentElement;
        let details = parent.getElementsByClassName('details')[0];
        
        if (details.style.display == 'block') {
            details.style.display = '';
        } else {
            details.style.display = 'block';
        }
    }
    
    
}