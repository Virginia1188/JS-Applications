import {html, render} from 'https://unpkg.com/lit-html?module';

const input = document.getElementById('towns');
const btn = document.getElementById('btnLoadTowns');
const root = document.getElementById('root');

btn.addEventListener('click',()=>{
    const data = input.value;
    const result = [...data.match(/[A-z]+/g)];
    console.log(result);

    const ul = document.createElement('ul');
    root.appendChild(ul);
    const template = (result) => html`
    <li>${result}</li>
`;
    render(result.map(template),ul);
});
