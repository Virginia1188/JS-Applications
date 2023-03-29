import { del, get, post, put } from './api.js';

const endpoints = {
    getAll: '/data/games?sortBy=_createdOn%20desc',
    getNew: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    create: '/data/games',
    byId: '/data/games/',
    getAllComments: (gameId)=> `/data/comments?where=gameId%3D%22${gameId}%22`,
    postComment: '/data/comments',
};

export async function getAll(){
    return get(endpoints.getAll);
}
export async function getNew(){
    return get(endpoints.getNew);
}
export async function create({ title, category, maxLevel, imageUrl, summary  }){
    return post(endpoints.create, { title, category, maxLevel, imageUrl, summary  });
}
export async function getById(id){
    return get(endpoints.byId + id);
}
export async function deleteGame(id){
    return del(endpoints.byId +id);
}
export async function updateGame(id,{ title, category, maxLevel, imageUrl, summary  }){
    return put(endpoints.byId + id, { title, category, maxLevel, imageUrl, summary  });
}
export async function getAllComments(gameId){
    return get(endpoints.getAllComments(gameId));
}

export async function postComment(gameId,comment){
    return post(endpoints.postComment,{gameId, comment});
}

// export async function countBuys(productId){
//     return get(endpoints.count(productId));
// }