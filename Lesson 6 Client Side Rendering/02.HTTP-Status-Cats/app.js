
import { html, render } from 'https://unpkg.com/lit-html?module';
import { cats } from './catSeeder.js';

const sectionsCats = document.getElementById('allCats');

const ul = document.createElement('ul');
sectionsCats.appendChild(ul);

const template = (cat) => html`
<li>
<img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
    </div>
</div>
</li>
`;

ul.addEventListener('click', (e) => {
    if (e.target.classList == 'showBtn') {
        const toggle = e.target.parentElement.querySelector('div');

        if (toggle.style.display == 'none') {
            toggle.style.display = 'block';
            e.target.textContent = 'Hide status code';
        } else {
            toggle.style.display = 'none';
            e.target.textContent = 'Show status code';
        }
    }
});
render(cats.map(template), ul);