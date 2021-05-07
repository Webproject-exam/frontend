import axios from './axios';

const fetchAllPlants = () => {
    return axios.get('/plants');
}

const fetchPlant = (id) => {
    return axios.get(`/plants/${id}`);
}

const createPlant = (plantObject) => {
    return axios.post('/manage/plants', plantObject);
}

export {
    fetchAllPlants,
    fetchPlant,
    createPlant
};