import { del, get, post, put } from './api.js';

// TODO end points
const endpoints = {
    getAll: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    add: '/data/pets',
    byId: '/data/pets/',
    byDonate: '/data/donation',
    allDonations: (petId)=> `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    byUserDonation: (petId,userId)=> `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function getAll(){
    return get(endpoints.getAll);
}
export async function create({ name, breed, age, weight, image }){
    return post(endpoints.add, { name, breed, age, weight, image });
}
export async function getById(id){
    return get(endpoints.byId + id);
}
export async function deletePet(id){
    return del(endpoints.byId +id);
}
export async function updatePet(id,{name, breed, age, weight, image }){
    return put(endpoints.byId + id, { name, breed, age, weight, image  });
}

export async function getAllDonations(petId){
    return get(endpoints.allDonations(petId));
}

export async function sendDonation(petId){
    return post(endpoints.byDonate,{petId});
}

export async function getByUserDonation(petId, userId){
    return get(endpoints.byUserDonation(petId, userId));
}