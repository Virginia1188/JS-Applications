import { html, render } from 'https://unpkg.com/lit-html?module';

const select = document.getElementById('menu');
const template = (el) => html`
<option value="${el[1]._id}">${el[1].text}</option>
`;
load();

const form = document.querySelector('form');
const input = document.querySelector('form > input');
const btn = form.lastElementChild;

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ text: `${input.value}`})
    });
    load();
    input.value = '';
});

function load() {
    fetch('http://localhost:3030/jsonstore/advanced/dropdown')
        .then(res => res.json())
        .then((data) => {
            const result = Object.entries(data);
            render(result.map(template), select);
        });
}