import client from '$lib/client';

export const confirmEmail = async (token: string) => {
	const response = await client.get(`/users/confirm-email?token=${token}`);
	return response.response;
};
