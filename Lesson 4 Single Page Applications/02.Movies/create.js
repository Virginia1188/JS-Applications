
import { homePage } from './home.js';
import {showView} from './util.js';

const createSection = document.querySelector('#add-movie');
const form = createSection.querySelector('form');
form.addEventListener('submit',onSubmit);

export function createPage(){
    showView(createSection);
}

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const desription = formData.get('description');
    const img = formData.get('img');

    await createMovie(title, desription,img);
    form.reset();
    homePage();
}

async function createMovie(title, description,img){
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch('http://localhost:3030/data/movies',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({title,description,img})
    });
}