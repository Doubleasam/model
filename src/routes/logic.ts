import client from "$lib/client";

export const checkForProfile = async () => {
	const response = await client.get('/auth/me');
	return response;
};