<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AxiosError } from 'axios';
	import toast from 'svelte-french-toast';
	import { confirmEmail } from './logic';
	const token = $page.params.token;
     

	let loading = false;
	let errors: any = {};

	const handleSubmit = async () => {
		try {
			const result = await confirmEmail(token);
			if (result.status === 200) {
				toast.success('Verification successful');
                    goto('/auth/login');
               } 
		} catch (e: any) {
			if (e instanceof AxiosError) {
				errors.server = e.response?.data.message || 'Ooops, something went wrong';
				toast.error(errors.server);
				return;
			}
			errors.server = 'Ooops, something went wrong';
			toast.error(errors.server);
			return;
		} finally {
			loading = false;
		}
	};
</script>

<div class="w-screen h-screen flex items-center justify-center relative">
	{#if loading}
		<div
			class="h-screen w-screen flex-col flex justify-center items-center absolute bg-[#6f616095]"
		>
			<iconify-icon icon="line-md:loading-loop" width="100" height="500" />
		</div>
	{/if}
	<div class="flex-col flex h-screen justify-center items-center gap-[1em] md:gap-[2em]">
		<h1 class="md:text-[35px] font-bold text-[25px]">Click to verify your e-mail</h1>
		<button
			class="bg-[#A52921] px-[6em] py-4 rounded-3xl text-white text-xl"
			on:click={handleSubmit}>Confirm</button
		>
	</div>
</div>
