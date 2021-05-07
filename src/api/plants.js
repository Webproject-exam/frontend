import axios from './axios';

const fetchAllPlants = () => {
    return axios.get('/plants');
}

const fetchPlant = (id) => {
    return axios.get(`/plants/${id}`);
}

const waterPlant = (id, watering) => {
    return axios.patch(`/plants/${id}`, watering);
}


const createPlant = (plantObject) => {
    return axios.post('/manage/plants', plantObject);
}
export {
    fetchAllPlants,
    fetchPlant,
    waterPlant,
    createPlant
};