import client from '$lib/client';
import type { LogInType } from '$lib/types/type';
import toast from "svelte-french-toast";

export const login = async (credentials: LogInType) => {
    const response = await client.post('/auth/login', credentials);
    if (response.data.statusCode === 201) {
        toast.success('Login successful');
    }
    if (response.data.statusCode === 401) {
			toast.success('This user does not exist');
		}
	return response.data;
};

export const checkForProfile = async () => {
    const response = await client.get('/auth/me');

    return response;
}
