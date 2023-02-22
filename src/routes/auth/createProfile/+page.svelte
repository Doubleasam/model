<script lang="ts">

	import { Nationalities, Languages, Sports, Hobbies, Hashtags, Countries } from '$lib/utils';
	import MultiSelect from 'svelte-multiselect';
	import z from 'zod';
	import { profileSchema } from './schema';
	import { AxiosError } from 'axios';
	import toast from 'svelte-french-toast';
	import { createProfile, checkForProfile } from './logic';
	import { goto } from '$app/navigation';
	import Selector from '$lib/components/Selector.svelte';
	import type { profileType } from '$lib/types/type';

	let data: profileType = {
		firstName: '',
		lastName: '',
		age: 18,
		gender: '',
		nationality: '',
		height: 163,
		weight: 70,
		hairColor: '',
		country: '',
		city: '',
		sports: [],
		languages: [],
		smoker: false,
		profession: '',
		hobbies: [],
		hashtags: [],
		covidStatus: '',
		acceptVideoCalls: false,
		experience: ''
	};
	let genders = [
		{
			label: 'Male',
			value: 'male'
		},
		{
			label: 'Female',
			value: 'female'
		},
		{
			label: 'Prefer not to say',
			value: 'prefer_not_to_say'
		},
		{
			label: 'Others',
			value: 'others'
		}
	];

	let loading = false;
	let errors: any = {};

	const selectGender = (e: CustomEvent) => {
		data.gender = e.detail.value;
	};
	const selectNationality = (e: CustomEvent) => {
		data.nationality = e.detail.label;
	};
	const selectLanguages = (e: CustomEvent) => {
		if (data.languages.includes(e.detail.label) === false) {
			if (data.languages.length <= 5) {
				data.languages = [...data.languages, e.detail.label];
			}
		}
	};
	const selectCountry = (e: CustomEvent) => {
		data.country = e.detail.label;
	};
	const selectHobbies = (e: CustomEvent) => {
		if (data.hobbies.includes(e.detail.label) === false) {
			if (data.hobbies.length <= 5) {
				data.hobbies = [...data.hobbies, e.detail.label];
			}
		}
	};

	const selectHashtags = (e: CustomEvent) => {
		if (data.hashtags.includes(e.detail.label) === false) {
			if (data.hashtags.length <= 5) {
				data.hashtags = [...data.hashtags, e.detail.label];
			}
		}
	};
	const selectSports = (e: CustomEvent) => {
		if (data.sports.includes(e.detail.label) === false) {
			if (data.sports.length <= 5) {
				data.sports = [...data.sports, e.detail.label];
			}
		}
	};

	const removeHobby = (e: CustomEvent) => {
		data.hobbies = data.hobbies.filter(
			(h) => h != e.detail.target.parentElement.textContent.trim()
		);
	};
	const removeLanguage = (e: CustomEvent) => {
		data.languages = data.languages.filter(
			(h) => h != e.detail.target.parentElement.textContent.trim()
		);
	};
	const removeHashtag = (e: CustomEvent) => {
		data.hashtags = data.hashtags.filter(
			(h) => h != e.detail.target.parentElement.textContent.trim()
		);
	};
	const removeSport = (e: CustomEvent) => {
		data.sports = data.sports.filter((h) => h != e.detail.target.parentElement.textContent.trim());
	};

	const handleSubmit = async () => {
		loading = true;
		errors = {};
		try {
			console.log(data);
			
			profileSchema.parse(data);
			console.log(data)
			const result = await createProfile(data);
		
			toast.success('Profile created successfully');

			const check = await checkForProfile();
			if (check) {
				
				goto('/');
				location.reload()
			}
			
		} catch (e: any) {
			if (e instanceof z.ZodError) {
				errors = e.flatten().fieldErrors
				return;
			}

			if (e instanceof AxiosError) {
				errors.server = e.response?.data.message || 'Ooops, something went wrong';
				toast.error(errors.server);
				return console.log(errors);
			}
			errors.server = 'Ooops, something went wrong';
			toast.error(errors.server);

			return;
		} finally {
			loading = false;
		}
	};
</script>

<div class="max-w-[600px] mx-auto md:px-0 px-3 flex flex-col gap-[1.5em]">
	<div class="w-full text-center">
		<h1 class="text-[#D2B133] text-[46px] font-bold ">Create Profile</h1>
		<p class="text-lg text-gray-500">*Required Field</p>
	</div>
	<form
		on:submit|preventDefault={handleSubmit}
		class="font-sans text-gray-500 w-full mx-auto p-6"
	>
		<div class="flex flex-col gap-8 items-center justify-center w-full mb-[3em]">
			<label
				for="dropzone-file"
				class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						aria-hidden="true"
						class="w-10 h-10 mb-3 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
						/></svg
					>
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold"
							>Drop your images here or <span class="text-[#A52921]">browse </span>
						</span>
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						SVG, PNG, JPG or GIF (MAX. 800x400px)
					</p>
				</div>
				<input id="dropzone-file" disabled type="file" class="hidden" />
			</label>
			<p class="text-center w-[320px]">Please upload at least 4 photos max 8 photos</p>
		</div>

		<div class="relative mb-6 ">
			<input
				type="name"
				id="name"
				name="name"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133]  placeholder-shown:border-b-2 py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				placeholder=" "
				bind:value={data.firstName}
				autocomplete="off"
			/>
			<label
				for="name"
				class="absolute left-0 -top-4 text-xs text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-500 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>*Name</label
			>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.firstName}
					<span class="text-rose-500 text-xs">
						{errors.firstName}
					</span>
				{/if}
			</div>
		</div>

		<div class="relative mb-6 ">
			<input
				type="text"
				id="lastName"
				name="lastName"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133]  placeholder-shown:border-b-2 py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				placeholder=" "
				bind:value={data.lastName}
				autocomplete="off"
			/>
			<label
				for="lastName"
				class="absolute left-0 -top-4 text-xs text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-500 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>*Surname</label
			>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.lastName}
					<span class="text-rose-500 text-xs">
						{errors.lastName}
					</span>
				{/if}
			</div>
		</div>

		<div class="relative mb-6 ">
			<input
				type="number"
				id="age"
				name="age"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133]  placeholder-shown:border-b-2 py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				placeholder=" "
				bind:value={data.age}
				autocomplete="off"
			/>
			<label
				for="age"
				class="absolute left-0 -top-4 text-xs text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-500 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>*Age</label
			>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.age}
					<span class="text-rose-500 text-xs">
						{errors.age}
					</span>
				{/if}
			</div>
		</div>

		<div class="mb-6">
			<Selector
				options={genders}
				name="Gender"
				placeholder="Select Gender"
				on:selected={selectGender}
			/>
			{#if errors.gender}
				<p class="text-rose-500 text-xs">{errors.gender}</p>
			{/if}
		</div>

		<div class="mb-6 w-full">
			<Selector
				options={Nationalities}
				name="Nationality"
				placeholder="Select Nationality"
				on:selected={selectNationality}
			/>
			{#if errors.nationality}
				<p class="text-rose-500 text-xs">{errors.nationality}</p>
			{/if}
		</div>

		<div class="relative mb-6 ">
			<input
				type="number"
				id="height"
				name="height"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133]  placeholder-shown:border-b-2 py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				placeholder=" "
				min={150}
				bind:value={data.height}
				autocomplete="off"
			/>
			<label
				for="height"
				class="absolute left-0 -top-4 text-xs text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-500 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>*Height(cm)</label
			>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.height}
					<span class="text-rose-500 text-xs">
						{errors.height}
					</span>
				{/if}
			</div>
		</div>

		<div class="relative mb-6 ">
			<input
				type="number"
				id="weight"
				name="weight"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133]  placeholder-shown:border-b-2 py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				placeholder=" "
				min={40}
				bind:value={data.weight}
				autocomplete="off"
			/>
			<label
				for="weight"
				class="absolute left-0 -top-4 text-xs text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-500 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>*Weight(kg)</label
			>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.weight}
					<span class="text-rose-500 text-xs">
						{errors.weight}
					</span>
				{/if}
			</div>
		</div>

		<div class="mb-6 w-full">
			<Selector
				options={Languages}
				name="languages"
				placeholder="Select Languages"
				on:selected={selectLanguages}
				selectMultiple={true}
				maxSelectable={5}
				on:remove={(e) => removeLanguage(e)}
			/>
			{#if errors.languages}
				<p class="text-rose-500 text-xs">{errors.languages}</p>
			{/if}
		</div>

		<div class="mb-6 w-full">
			<Selector
				options={Countries}
				name="country"
				placeholder="Select Country"
				on:selected={selectCountry}
			/>
			{#if errors.country}
				<p class="text-rose-500 text-xs">{errors.country}</p>
			{/if}
		</div>

		<div class="relative mb-6 ">
			<input
				type="city"
				id="city"
				name="city"
				class="w-full placeholder-shown:border-gray-200 border-b-2 border-[#D2B133] rounded-none py-1 outline-none focus:outline-none focus:border-[#D2B133] focus:border-b-2 transition-colors peer"
				placeholder=" "
				bind:value={data.city}
				autocomplete="off"
			/>
			<label
				for="city"
				class="absolute left-0 -top-4 text-xs text-[#D2B133] text-medium
				peer-placeholder-shown:text-gray-500 cursor-text peer-focus:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-[#D2B133] transition-all"
				>*City</label
			>
			<div class="flex flex-col gap-2 mt-2">
				{#if errors.city}
					<span class="text-rose-500 text-xs">
						{errors.city}
					</span>
				{/if}
			</div>
		</div>

		<div class="mb-6 w-full">
			<Selector
				options={Hobbies}
				name="hobbies"
				placeholder="Select Hobbies"
				on:selected={selectHobbies}
				selectMultiple={true}
				maxSelectable={5}
				on:remove={(e) => removeHobby(e)}
			/>
			{#if errors.hobbies}
				<p class="text-rose-500 text-xs">{errors.hobbies}</p>
			{/if}
		</div>
		<!-- <div>
		<p>Category:</p>

		<select
			id="small"
			class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option selected>Model</option>
			<option value="Hostess">Hostess</option>

			<option value="Coach">Coach</option>
		</select>
	</div> -->

		<!-- <div>
		<label for="honorarium">Honorar:</label>
		<input type="number" id="honorarium" name="honorarium" min="0" step="1" />
		<span>$ /hour</span>
	</div> -->

		<div class="flex w-full justify-between items-center border-b-2 mb-6">
			<label for="video-call">Smoker</label>
			<label class="switch">
				<label class="relative inline-flex items-center cursor-pointer">
					<input type="checkbox" value={data.smoker} class="sr-only peer" />
					<div
						class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"
					/>
				</label>
			</label>
		</div>

		<div class="mb-6 w-full">
			<Selector
				options={Hashtags}
				name="Hashtags"
				placeholder="Select Hashtags"
				on:selected={selectHashtags}
				selectMultiple={true}
				maxSelectable={5}
				on:remove={(e) => removeHashtag(e)}
			/>
			{#if errors.hashtags}
				<p class="text-rose-500 text-xs">{errors.hashtags}</p>
			{/if}
		</div>

		<div class="flex w-full items-center justify-between mb-6 border-b-2">
			<label for="hair-select">Hair</label>
			<select id="hair-select" class="bg-white px-1 outline-none" name="hair-color" bind:value={data.hairColor} >
				<option value="black">Black</option>
				<option value="brown">Brown</option>
				<option value="blonde">Blonde</option>
				<option value="red">Red</option>
				<option value="gray">Gray</option>
				<option value="other">Other</option>
			</select>
		</div>

		<div class="mb-6 w-full">
			<Selector
				options={Sports}
				name="Sports"
				placeholder="Select Sports"
				on:selected={selectSports}
				selectMultiple={true}
				maxSelectable={5}
				on:remove={(e) => removeSport(e)}
			/>
			{#if errors.sports}
				<p class="text-rose-500 text-xs">{errors.sports}</p>
			{/if}
		</div>

		<div class="w-full flex items-center justify-between border-b-2 mb-6">
			<label for="profession-select">Profession</label>
			<select
				id="profession-select"
				class="bg-white px-1 outline-none border-none"
				name="profession"
				bind:value={data.profession}
			>
				<option value="Model">Model</option>
				<option value="teacher">Teacher</option>
				<option value="engineer">Engineer</option>
				<option value="doctor">Doctor</option>
				<option value="lawyer">Lawyer</option>
				<option value="other">Others</option>
			</select>
		</div>

		<div class="flex w-full justify-between border-b-2  items-center mb-6">
			<label for="covid19">COVID-19 :</label>
			<select id="covid19" class="bg-white outline-none" bind:value={data.covidStatus} name="covid19">
				<option value="negative">negative</option>
				<option value="positive">positive</option>
				<option value="recovered">recovered</option>
			</select>
		</div>

		<div class="flex w-full justify-between items-center border-b-2 mb-6">
			<label for="video-call">Video Call:</label>
			<label class="switch">
				<label class="relative inline-flex items-center cursor-pointer">
					<input type="checkbox" on:change={(e) => {
						console.log(data.acceptVideoCalls)
					}} bind:checked={data.acceptVideoCalls} class="sr-only peer" />
					<div
						class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-500"
					/>
				</label>
			</label>
		</div>

		<div class="w-full">
			<textarea
				maxlength="1000"
				placeholder="My experiences"
				class="p-2 w-full h-[150px] rounded-lg border-2 "
				bind:value={data.experience}
			/>
			{#if errors.experience}
				<span class="text-xs text-rose-500">{errors.experience}</span>
			{/if}
		</div>

		<button type="submit" class="w-full bg-[#A52921] py-3 rounded-3xl text-white text-lg"
			>{#if loading} <iconify-icon icon="line-md:loading-loop" width="20" />{:else} Submit {/if}</button
		>
	</form>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
