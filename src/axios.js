import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://application-manager-d6253.firebaseio.com/'
});

export default instance;