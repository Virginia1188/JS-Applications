

import {showView,spinner} from './util.js';
// import {createMoviePreview} from './home';

const detailsSection = document.querySelector('#movie-example');

export function detailsPage(id){
    showView(detailsSection);
    displayMovie(id);
}
async function displayMovie(id){
    const user = JSON.parse(localStorage.getItem('user'));

    detailsSection.replaceChildren(spinner());
    const [movie, likes,ownLike] = await Promise.all([
        getMovies(id),
        getLikes(id),
        getOwnLike(id,user)

    ]);
    detailsSection.replaceChildren(createMovieCard(movie,user,likes,ownLike));

}

function createMovieCard(movie,user,likes,ownLike){

    const element = document.createElement('div');
    element.innerHTML =`
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
              <img class="img-thumbnail" src="${movie.img}"alt="Movie"/>
        </div>
        <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>${movie.description}</p>
              ${createControls(movie,user,likes,ownLike)}
        </div>
    </div>
    `;
    const likeBtn =  element.querySelector('.like-btn');
    if(likeBtn){
        likeBtn.addEventListener('click',(e)=>likeMovie(e,movie._id));
    }
    return element;
}

function createControls(movie,user,likes,ownLike){
    const isOwner = user && user._id == movie._ownerId;
    let controls =[];

    if(isOwner){
        controls.push('<a class="btn btn-danger" href="#">Delete</a>');
        controls.push('<a class="btn btn-warning" href="#">Edit</a>');
        
    }else if(user && ownLike == false){
        controls.push('<a class="btn btn-primary like-btn" href="#">Like</a>'); 
    }
    controls.push(`<span class="enrolled-span">Liked${likes}</span>`);
    return controls.join('');
}

async function getMovies(id){
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await res.json();
    return movie;
}

async function getLikes(id){
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();
    return likes;

}
async function getOwnLike(movieId,user){
    if(!user){
        return false;
    }else{
        const userId = user._id;
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22 `);
        const like = await res.json();
        return like.length >0;
    }
}

async function likeMovie(e, movieId,userId){
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch('http://localhost:3030/data/likes',{
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization':user.accessToken,
        },
        body: JSON.stringify({
            movieId
        })
    });
    detailsPage(movieId);
}
