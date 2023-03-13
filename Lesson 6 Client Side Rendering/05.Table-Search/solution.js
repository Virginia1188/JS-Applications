import { html, render } from 'https://unpkg.com/lit-html?module';

const tbody = document.querySelector('tbody');
const input = document.getElementById('searchField');

load();
document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick() {
   const tds = document.querySelectorAll('tbody td');
   Array.from(tbody.children).forEach((tr) => {
      tr.classList.remove('select');
   });

   Array.from(tds).forEach((td) => {
      if (td.textContent.includes(input.value)) {
         td.parentElement.className = 'select';
      }
   });
   input.value = '';
}

function load() {

   fetch('http://localhost:3030/jsonstore/advanced/table')
      .then(res => res.json())
      .then((data) => {
         render(Object.entries(data).map(template), tbody);
      });
}

const template = (user) => html`
      <tr>
         <td>${user[1].firstName} ${user[1].lastName}</td>
         <td>${user[1].email}</td>
         <td>${user[1].course}</td>
      </tr>
   `;
