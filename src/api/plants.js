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

const requestCare = (id) => {
    console.log(id);
    return axios.patch('/plants/request', id);
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

const updatePlant = (plantObject) => {
    return axios.patch('/manage/plants', plantObject);
}

const imageUpload = (formData) => {
    return axios.patch('/manage/image-upload', formData);
}

export {
    fetchAllPlants,
    fetchPlant,
    careForPlant,
    requestCare,
    postponePlant,
    createPlant,
    deletePlant,
    updatePlant,
    imageUpload
};