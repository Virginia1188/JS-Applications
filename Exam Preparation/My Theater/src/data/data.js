import { del, get, post, put } from './api.js';

const endpoints = {
    getAll: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    add: '/data/theaters',
    byId: '/data/theaters/',
    like: '/data/likes',
    byUser: (userId)=> `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    total: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    own: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAll(){
    return get(endpoints.getAll);
}
export async function create({ title, date, author, imageUrl, description }){
    return post(endpoints.add, { title, date, author, imageUrl, description });
}
export async function getById(id){
    return get(endpoints.byId + id);
}
export async function deleteData(id){
    return del(endpoints.byId +id);
}
export async function updateData(id,{ title, date, author, imageUrl, description }){
    return put(endpoints.byId + id, { title, date, author, imageUrl, description });
}
export async function getByUser(userId){
    return get(endpoints.byUser(userId));
}

export async function postLikes(theaterId){
    return post(endpoints.like, {theaterId});
}
export async function getAllLikes(theaterId){
    return get(endpoints.total(theaterId));
}
export async function getUserLikes(theaterId, userId){
    return get(endpoints.own(theaterId, userId));
}