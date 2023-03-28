import { del, get, post, put } from './api.js';

// TODO end points
const endpoints = {
    getAll: '/data/shoes?sortBy=_createdOn%20desc',
    create: '/data/shoes',
    byId: '/data/shoes/',
    search: (query)=> `/data/shoes?where=brand%20LIKE%20%22${query}%22`,
   
};

export async function getAll(){
    return get(endpoints.getAll);
}

export async function create({ brand, model,  imageUrl,  release,  designer,  value }){
    return post(endpoints.create, {brand, model,  imageUrl,  release,  designer,  value });
}

export async function getById(id){
    return get(endpoints.byId + id);
}

export async function deleteProduct(id){
    return del(endpoints.byId +id);
}

export async function updateProduct(id,{brand, model,  imageUrl,  release,  designer,  value  }){
    return put(endpoints.byId + id, { brand, model,  imageUrl,  release,  designer,  value });
}

export async function byBrandSearch(query){
    return get(endpoints.search(query));
}

// export async function sendBuys(productId){
//     return post(endpoints.buy,{productId});
// }

// export async function countBuys(productId){
//     return get(endpoints.count(productId));
// }