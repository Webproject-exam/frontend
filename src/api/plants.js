import axios from './axios';

const fetchAllPlants = () => {
    return axios.get('/plants');
}

export {
    fetchAllPlants
};