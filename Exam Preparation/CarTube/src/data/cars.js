import { get, post, put, del } from './api.js';

const endpoints = {
    getAll: '/data/cars?sortBy=_createdOn%20desc',
    create: '/data/cars',
    byId: '/data/cars/',
    byUserId: (userId)=> `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    search: (query)=> `/data/cars?where=year%3D${query}`
};

export async function getAllListings() {
    return get(endpoints.getAll);
}

export async function createListing({ brand,model,description,year,imageUrl,price}) {
    return post(endpoints.create,{brand,model,description,year,imageUrl,price });
}
export async function getById(id) {
    return get(endpoints.byId + id);
}
export async function editListing(id, {brand,model,description,year,imageUrl,price}) {
    return put(endpoints.byId + id, {brand,model,description,year,imageUrl,price});
}

export async function deleteListing(id) {
    return del(endpoints.byId + id);
}

export async function myListings(userId) {
    return get(endpoints.byUserId(userId));
}
export async function bySearch(query) {
    return get(endpoints.search(query));
}