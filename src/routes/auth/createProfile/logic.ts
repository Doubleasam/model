import client from '$lib/client';
import type { profileType } from '$lib/types/type';
import toast from 'svelte-french-toast';



export const createProfile = async (credentials: profileType) => {
	const response = await client.post('/profile/model', credentials,);
	return response.data;
};

export const checkForProfile = async () => {
	const response = await client.get('/auth/me', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		}
	});

	return response.data;
};
