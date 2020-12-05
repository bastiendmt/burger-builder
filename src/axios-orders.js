import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-b694d-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;