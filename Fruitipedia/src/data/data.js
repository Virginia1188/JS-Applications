import { del, get, post, put } from './api.js';

// TODO end points
const endpoints = {
    getAll: '/data/fruits?sortBy=_createdOn%20desc',
    add: '/data/fruits',
    byId: '/data/fruits/',
   
    search: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
    own: (fruitId, userId) =>
    `/data/fruits?where=fruitId%3D%22${fruitId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAll(){
    return get(endpoints.getAll);
}

export async function create({ name,imageUrl, description, nutrition}){
    return post(endpoints.add, { name,imageUrl, description, nutrition});
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function deleteData(id){
    return del(endpoints.byId +id);
}

export async function updateData(id,{ name,imageUrl, description, nutrition}){
    return put(endpoints.byId + id, { name,imageUrl, description, nutrition});
}

// export async function getBuyForUser(productId,userId){
//     return get(endpoints.(productId,userId));
// }

// export async function sendBuys(productId){
//     return post(endpoints.,{productId});
// }

export async function searchProduct(query){
    return get(endpoints.search(query));
}