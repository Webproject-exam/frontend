import axios from './axios';

const fetchAllPlants = () => {
    return axios.get('/plants');
}

const fetchPlant = (id) => {
    return axios.get(`/plants/${id}`);
}

export {
    fetchAllPlants,
    fetchPlant
};