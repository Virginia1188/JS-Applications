import { detailsPage } from './details.js';
import {showView} from './util.js';

const homeSection = document.querySelector('#home-page');
const catalog = homeSection.querySelector('#movies-list');

catalog.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.tagName == 'BUTTON'){
        const id = e.target.dataset.id;
        detailsPage(id);
    }
});
export function homePage(){
    showView(homeSection);
    displayMovies();
}

async function getMovies(){
    const res = await fetch('http://localhost:3030/data/movies');
    const data = await res.json();
    
    return data;
}

async function displayMovies(){
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie){
    const element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = `
        <img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href=#/details/${movie._id}">
                <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
            </a>
        </div>`;

    // element.dataset.id
    return element;

}

// window.getMovies = getMovies;