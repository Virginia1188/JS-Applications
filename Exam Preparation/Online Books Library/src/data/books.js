import { del, get, post, put } from './api.js';

const endpoints = {
    dashboard: '/data/books?sortBy=_createdOn%20desc',
    byId:'/data/books/',
    create: '/data/books',
    byAutor: (userId)=> `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
};
export async function getAllBooks(){
    return get(endpoints.dashboard);
}

export async function getBookById(id){
    return get(endpoints.byId + id);
}

export async function createBook(data){
    return post(endpoints.create, data);
}

export async function editBook(id, data){
    return put(endpoints.byId + id, data);
}
export async function deleteBook(id){
    return del(endpoints.byId + id);
}

export async function getMyBooks(userId){
    return get(endpoints.byAutor(userId));
}