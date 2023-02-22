<script lang="ts">
	import { z } from 'zod';
	import { login } from './logic';
	import { loginSchema } from './schema';
	import { AxiosError } from 'axios';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import {profileStore} from '$lib/store/store'
	import { checkForProfile } from './logic';

	let loading = false;
	let errors: any = {};
	let data: any = {};

	const onSubmit = async () => {
		loading = true;
		errors = {};

		
		try {
			loginSchema.parse(data);
			const waitLogin = await login(data);
			toast.success('Login successful')
			 localStorage.setItem('accessToken', waitLogin.accessToken) ;
			localStorage.setItem('refreshToken', waitLogin.refreshToken);

			const checkProfile  = await checkForProfile();

			console.log(checkProfile);
			
			if('profile' in checkProfile.data){
				profileStore.update(profile => profile = checkProfile.data)
				goto('/')
			} else {
				goto('/auth/createProfile')
			};
			
			
		} catch (e: any) {
			if (e instanceof z.ZodError) {
				errors = e.flatten().fieldErrors;
				return;
			}

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

<div class="px-4 mt-[4em]  flex items-center flex-col justify-center gap-8">
	<div class="text-center">
		<h1 class="text-[#D2B133] text-[46px] font-bold mb-4">LOG IN</h1>
		<p>Welcome to Iludate Agentur</p>
	</div>
	<form
		on:submit|preventDefault={onSubmit}
		class="flex flex-col p-5 w-full gap-3 md:gap-5 max-w-[450px] items"
	>
		<div class="relative mb-6 ">
			<input
				type="email"
				id="email"
				name="email"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133]  placeholder-shown:border-b py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				placeholder=" "
				bind:value={data.email}
				autocomplete="off"
			/>
			<label
				for="email"
				class="absolute left-0 -top-4 text-xs text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-600 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>Email</label
			>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.email}
					<span class="text-rose-500 text-xs">
						{errors.email}
					</span>
				{/if}
			</div>
		</div>
		<div class="relative mb-6">
			<input
				type="password"
				id="password"
				name="password"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133]  placeholder-shown:border-b py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				bind:value={data.password}
				autocomplete="off"
				placeholder=" "
			/>
			<label
				for="password"
				class="absolute left-0 -top-4 text-xs 
				text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-600 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>Password</label
			>
			<span class="absolute text-xs right-0 -bottom-2 cursor-pointer">forgot password?</span>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.password}
					<span class="text-rose-500 text-xs">
						{errors.password}
					</span>
				{/if}
			</div>
		</div>

		<div class="flex items-start mb-8">
			<div class="flex items-center h-5">
				<input
					id="remember"
					type="checkbox"
					value=""
					class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
				/>
			</div>
			<label for="remember" class="ml-2 text-sm text-gray-900 dark:text-gray-300">remember me</label
			>
		</div>

		<button
			type="submit"
			class="bg-[#A52921] text-white font-medium rounded-[3em] text-sm w-full sm:w-auto md:px-5 md:py-2.5 py-1.5 text-center"
		>
			{#if loading} <iconify-icon icon="line-md:loading-loop" width="20" />{:else} Log in {/if}
		</button>
		<div class="flex items-center gap-2 justify-center">
			<div class="h-[2px] w-[50%] bg-gray-300" />
			<p class="text-gray-400">or</p>
			<div class="h-[2px] w-[50%] bg-gray-300" />
		</div>

		<a
			href="./register"
			class="hover:bg-[#A52921] text-[#A52921] hover:text-white outline-none font-medium rounded-[3em] text-sm w-full sm:w-auto md:px-5 md:py-2.5 py-1.5 text-center border-[1.5px] border-[#A52921]"
			>Register now</a
		>
	</form>
</div>

<style>
	::-webkit-scrollbar {
  display: none;
}

</style>
