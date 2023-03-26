import { clearUserData, setUserData } from '../utils.js';
import { get, post } from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

// TODO change user object according to project requirments 

export async function login(  username, password ) {
    const result = await post(endpoints.login, { username, password });
    setUserData(result);
}

export async function register(username, password) {
    const result = await post(endpoints.register, { username, password });
    setUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUserData();
}