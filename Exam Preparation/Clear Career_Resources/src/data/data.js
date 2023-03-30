import { del, get, post, put } from './api.js';

// TODO end points
const endpoints = {

    catalog: '/data/offers?sortBy=_createdOn%20desc',
    add: '/data/offers',
    applications: '/data/applications',
    byId: (id) => `/data/offers/${id}`,
    total: (offerId) =>
      `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    own: (offerId, userId) =>
      `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAll(){
    return get(endpoints.catalog);
}
export async function create({ title, imageUrl, category, description, requirements, salary}){
    return post(endpoints.add, {  title, imageUrl, category, description, requirements, salary });
}
export async function getById(id){
    return get(endpoints.byId(id));
}
export async function deleteData(id){
    return del(endpoints.byId(id));
}
export async function updateData(id,{  title, imageUrl, category, description, requirements, salary }){
    return put(endpoints.byId(id), {  title, imageUrl, category, description, requirements, salary });
}

export async function getAllApplications(offerId){
    return get(endpoints.total(offerId));
}

export async function getUserApplication(offerId, userId){
    return get(endpoints.own(offerId, userId));
}

export async function sendApplication(offerId){
    return post(endpoints.applications, {offerId});
}