import { del, get, post, put } from './api.js';


const endpoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    add: '/data/albums',
    byId: '/data/albums/',
    bySearch: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`
   
};

export async function getAll(){
    return get(endpoints.getAll);
}

export async function create({ name, imgUrl, price, releaseDate, artist, genre, description }){
    return post(endpoints.add, { name, imgUrl, price, releaseDate, artist, genre, description });
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function deleteData(id){
    return del(endpoints.byId +id);
}

export async function updateData(id,{ name, imgUrl, price, releaseDate, artist, genre, description }){
    return put(endpoints.byId + id, { name, imgUrl, price, releaseDate, artist, genre, description });
}

export async function getSearch(query){
    return get(endpoints.bySearch(query));
}
