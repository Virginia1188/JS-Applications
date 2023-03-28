import { del, get, post, put } from './api.js';

// TODO end points
const endpoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc',
    add: '/data/albums',
    byId: '/data/albums/',
    sendLike: '/data/likes',
    allLikes: (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    likesForUser: (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAll() {
    return get(endpoints.getAll);
}
export async function create({ singer, album, imageUrl, release, label, sales }) {
    return post(endpoints.add, { singer, album, imageUrl, release, label, sales });
}
export async function getById(id) {
    return get(endpoints.byId + id);
}
export async function deleteProduct(id) {
    return del(endpoints.byId + id);
}
export async function updateProduct(id, { singer, album, imageUrl, release, label, sales }) {
    return put(endpoints.byId + id, { singer, album, imageUrl, release, label, sales });
}

export async function sendLikes(albumId) {
    return post(endpoints.sendLike, { albumId });
}

export async function getAllLikes(albumId) {
    return get(endpoints.allLikes(albumId));
}

export async function getUseerLikes(albumId, userId) {
    return get(endpoints.likesForUser(albumId, userId));
}