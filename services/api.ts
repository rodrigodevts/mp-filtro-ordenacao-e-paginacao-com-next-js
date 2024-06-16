import Axios from 'axios';

const api = Axios.create({
	baseURL: 'https://apis.codante.io/api/orders-api'
});

export { api };
