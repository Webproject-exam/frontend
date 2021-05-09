import axios from './axios';

const fetchAllPlants = () => {
    return axios.get('/plants');
}

const fetchPlant = (id) => {
    return axios.get(`/plants/${id}`);
}

const careForPlant = (watering) => {
    return axios.patch(`/plants`, watering);
}

const postponePlant = (id, postponeObject) => {
    return axios.patch(`/plants/${id}`, postponeObject);
}

const createPlant = (plantObject) => {
    return axios.post('/manage/plants', plantObject);
}

const deletePlant = (id) => {
    return axios.delete('/manage/plants', {data: id});
}

export {
    fetchAllPlants,
    fetchPlant,
    careForPlant,
    postponePlant,
    createPlant,
    deletePlant
};