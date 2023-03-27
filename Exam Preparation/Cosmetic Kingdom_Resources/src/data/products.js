import { del, get, post, put } from './api.js';


const endpoints = {
    getAll: '/data/products?sortBy=_createdOn%20desc',
    create: '/data/products',
    byId: '/data/products/',
    buy:'/data/bought',
    count: (productId)=> `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    countForUser: (productId,userId)=> `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAll(){
    return get(endpoints.getAll);
}

export async function create({ name, imageUrl,  category,  description,  price }){
    return post(endpoints.create, { name, imageUrl,  category,  description,  price });
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function deleteProduct(id){
    return del(endpoints.byId +id);
}

export async function updateProduct(id,{ name, imageUrl,  category,  description,  price }){
    return put(endpoints.byId + id, { name, imageUrl,  category,  description,  price });
}

export async function getBuyForUser(productId,userId){
    return get(endpoints.countForUser(productId,userId));
}

export async function sendBuys(productId){
    return post(endpoints.buy,{productId});
}

export async function countBuys(productId){
    return get(endpoints.count(productId));
}