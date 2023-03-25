import { del, get, post, put } from './api.js';

const endpoints = {
    catalog: '/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    byId: '/data/memes/',
    byUserId: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
};

export async function getAllMemes(){
    return get(endpoints.catalog);
}

export async function createMeme( title, description, imageUrl ){
    return post(endpoints.create, { title, description, imageUrl });
}

export async function getMemeById(id){
    return get(endpoints.byId + id);
}

export async function deleteMeme(id){
    return del(endpoints.byId +id);
}

export async function editMeme(id, title, description, imageUrl){
    return put(endpoints.byId + id,{ title, description, imageUrl });
}

export async function byUserId(userId){
    return get(endpoints.byUserId(userId));
}



