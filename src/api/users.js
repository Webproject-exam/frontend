// Some code has been taken from https://github.com/carlosvicient/on-campus-tracker/blob/feature/fullstackv1/src/api/users.js
//import axios from 'axios';
import axios from './axios';

// Refresh-token
const tokenRefresh = () => {
    return axios.post('/refresh-token');
};

const tokenRevoke = () => {
    return axios.post('/revoke-token');
}

// Anonymous
const login = (email, password) => {
    return axios.post('/login', { email, password });
};

const forgot = (email) => {
    return axios.post('/reset_password', email);
}

// Gardeners
const fetchUser = () => {
    return axios.get('/profile');
}

const updateMyProfile = ({ name, surname, password, oldPassword }) => {
    return axios.patch('/profile', { name, surname, password, oldPassword });
}

//Admins
const createUser = ({ name, surname, email, role, password }) => {
    return axios.post('/manage/users', { name, surname, email, role, password });
}

const fetchAllUsers = () => {
    return axios.get('/manage/users');
}

const updateUser = ({ place, selectedUser, name, surname, role, email }) => {
    return axios.patch('/manage/users', { place, selectedUser, name, surname, role, email });
}

const deleteUser = ({ email }) => {
    return axios.delete('/manage/users', { data: { email } });
}

export {
    tokenRefresh,
    tokenRevoke,
    login,
    forgot,
    updateMyProfile,
    createUser,
    fetchUser,
    updateUser,
    deleteUser,
    fetchAllUsers
}
