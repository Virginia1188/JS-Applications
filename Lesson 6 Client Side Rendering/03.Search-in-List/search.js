import {towns} from './towns.js';
import {html, render} from 'https://unpkg.com/lit-html?module';

const div = document.getElementById('towns');
const btn = document.querySelector('button');
const input = document.getElementById('searchText');

const ul = document.createElement('ul');
div.appendChild(ul);

const template = (town) => html`
<li>${town}</li>
`;

render(towns.map(template),ul);

btn.addEventListener('click',search);

function search() {
   const li = Array.from(document.querySelectorAll('ul li'));
   li.forEach(l=> l.classList = '');
   let count = 0;
   li.forEach(l => {
      
      if(l.textContent.includes(input.value)){
         l.classList = 'active';
         count++;
      }
   });
   document.getElementById('result').textContent = `${count} matches`;

}
