import axios from 'axios';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

const client = axios.create({
	baseURL: PUBLIC_API_ENDPOINT,
	withCredentials: true
});
client.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
		
	}
	return config;
});

client.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 &&  !originalRequest._retry ) {
			originalRequest._retry = true;
			const refresh_token = localStorage.getItem('refreshToken');
			if (refresh_token !== null || undefined) {
			const refresh_response = await client.post('/auth/refresh', { refreshToken: `${refresh_token}` });
			const new_access_token = refresh_response.data.accessToken;
			const new_refresh_token = refresh_response.data.refreshToken;
			console.log(refresh_response);
			
			localStorage.setItem('accessToken', new_access_token);
			localStorage.setItem('refreshToken', new_refresh_token);
			client.defaults.headers.common.Authorization = `Bearer ${new_access_token}`;
			return axios(originalRequest);
			}
		
		}
		return Promise.reject(error);
	}
);

export default client;
