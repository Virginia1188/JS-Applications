import { del, get, post, put } from './api.js';

const endpoints = {
    getAll: '/data/posts?sortBy=_createdOn%20desc',
    add: '/data/posts',
    byId: '/data/posts/',
    donation: '/data/donations',
    byUser: (userId)=> `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    allDonations: (postId)=> `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    byUserDonations: (postId,userId)=> `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAll(){
    return get(endpoints.getAll);
}
export async function create({ title, description, imageUrl, address, phone }){
    return post(endpoints.add, {title, description, imageUrl, address, phone  });
}
export async function getById(id){
    return get(endpoints.byId + id);
}
export async function deleteProduct(id){
    return del(endpoints.byId +id);
}
export async function updateProduct(id,{ title, description, imageUrl, address, phone  }){
    return put(endpoints.byId + id, { title, description, imageUrl, address, phone  });
}

export async function getMyProducts(userId){
    return get(endpoints.byUser(userId));
}

export async function getAllDonations(postId){
    return get(endpoints.allDonations(postId));
}

export async function userDonate(postId,userId){
    return get(endpoints.byUserDonations(postId,userId));
}

export async function sendDonations(postId){
    return post(endpoints.donation, {postId});
}