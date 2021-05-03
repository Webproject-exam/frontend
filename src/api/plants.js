import axios from './axios';

const fetchAllPlants = () => {
    return axios.get('/plants');
}

const fetchPlant = (id) => {
    return axios.get(`/plants/${id}`);
}

const createPlant = () => {
    return axios.post('/manage/plants');
}

export {
    fetchAllPlants,
    fetchPlant
};