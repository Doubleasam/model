import client from '$lib/client';
import type { RegisterType } from '$lib/types/type';
import toast from 'svelte-french-toast'

export const register = async (credentials: RegisterType, userType: string) => {
    const response = await client.post(`/users?userType=${userType}`, credentials);

    if (response.status === 201) {
        toast.success("Registration successful");
        return;
    }

    // if (response.status === 409) {
    //     toast
    // }
    return response.status;
}