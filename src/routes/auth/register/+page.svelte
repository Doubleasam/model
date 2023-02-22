<script lang="ts">
	import { z } from 'zod';
	import { register } from './logic';
	import { registerSchema } from './schema';
	import { AxiosError } from 'axios';
	import toast from 'svelte-french-toast';
	import CountryCodeInput from '$lib/components/CountryCodeInput.svelte';
	

	let loading = false;
	let regSuccess = false;
	let errors: any = {};
	let data: any = {
	};
	let items = ['model', 'client', 'hostess', 'coach'];
	let userType = items[1];
	let showDropdown = false;
	let selectedItem = items[1];


	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	function handleItemClick(item: string) {
		selectedItem = item;
		showDropdown = !showDropdown;
		userType = selectedItem;
	}

	const onSubmit = async () => {
		loading = true;
		errors = {};

		try {
			
			registerSchema.parse(data);
			const { confirmPassword, confirmEmail, ...rest } = data;
			
			const result = await register(rest, userType);
			toast.success('Registration successful!!!');
			regSuccess = true;
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
		} finally {
			loading = false;
		}
	};
</script>

<div
	class="text-gray-500 items-center justify-center font-sans w-full max-w-[700px] mx-auto px-3 my-[7em] md:my-[5em] sm:px-[3em] flex flex-col gap-2"
>
	<div class="md:m-5 md:flex items-center gap-3 hidden">
		<img src="/logo.png" class="w-[30px]" alt="Iludate's Logo" />
		<h3 class="md:text-[45px] text-[30px] font-medium text-[#A52921]">iludate-agentur</h3>
	</div>

	<div class="item-1 text-center">
		<h3 class="md:text-[36px] text-[36px] text-[#d2b133] font-bold mb-4">Register</h3>
		<p class="">Welcome to Iludate Agentur</p>
	</div>

	<!-- <div class="item-2 ">
		<div class="border-[3px] p-8 border-[#d2b133] flex flex-col gap-10">
			<div class="flex  flex-col gap-2 text-[16px]">
				<p>
					<strong>Bewerbung</strong>
					Die Bewerbung ebenso wie die Nutzung des Portals ist kostenlos.
				</p>
				<p>
					<strong>Voraussetzungen:</strong>
					Bei uns gibt es keine Registrierungsvorgaben für eine erfolgreiche Bewerbung, außer der Zustimmung
					der AGB und Datenschutz. Wir freuen uns auf viele, tolle Models, Hostessen und Coaches.
				</p>
				<p>
					<strong>Öffnungszeiten: </strong>
					Montag bis Freitag 08:00-12:00 + 13:00 -18:00 Uhr. freuen uns auf viele, tolle Models, Hostessen
					und Coaches.
				</p>
				<p>
					<strong>Kontaktiere uns: </strong>
					Telefonischen Kontakt oder Fragen bitte während den Öffnungszeiten. Für jedes weitere Anliegen
					bitten wir euch unsere Chat Funktion zu nutzen, oder uns eine E-Mail machen. Wir versuchen
					schnellstmöglich auf eure Frage / Anliegen zu antworten.
				</p>
				<p>
					<strong> Für Kunden: </strong>
					Buchungen, Buchungsanfragen und Video Calls können jederzeit getätigt werden.
				</p>
				<p>
					<strong>Profil Daten:</strong>
					Bitte füllt euer Profil so ordentlich und vollständig aus wie möglich. Je ordentlicher das
					Profil ausgefüllt ist, desto schneller erfolgt die Verifizierung.
				</p>
				<p>
					<strong>Profil Check:</strong>
					Die Verifizierung eines neuen Profils kann bis zu zwei 2 Tage dauern.
				</p>
				<p>
					<strong>Bildauswahl</strong>
					Die Bilder sollen authentischen und natürlich wirken. Bitte achte drauf, dass dein Profilbild
					aktuell ist und man dich gut drauf erkennt. Du musst alleine auf den Bildern sein.
					<strong
						>Keine Gruppen Bilder! Kein Ganzkörper Bild als Profilbild! Blick nach vorne!</strong
					>
				</p>
				<p>
					<strong>Sprachen</strong>
					Wir sprechen: Deutsch – Französisch – Englisch
				</p>
			</div>
			<input
				type="button"
				class="bg-[#A52921] py-2 px-3 rounded-3xl text-white"
				value="FAQ"
				aria-label="FAQ"
			/>
		</div>
	</div> -->

	<div class="item-3 w-full font-sans text-gray-500">
		<form
			on:submit|preventDefault={onSubmit}
			class="text-center flex flex-col items-center justify-center "
		>
			<p class="mb-5">Register as:</p>
			<div class="flex {showDropdown ? ' z-[888]' : ''} mb-10 gap-[1.5em] md:gap-[3em]">
				<div>
					<button
						id="myButton"
						class="px-8 py-1 rounded-[3em] bg-[#A52921] text-white "
						type="button">{selectedItem}</button
					>
				</div>

				<div class="relative w-[7em] flex flex-col items-center" on:blur={(e) => console.log(e)}>
					<button
						id="dropdownDefaultButton"
						data-dropdown-toggle="dropdown"
						class="text-[#A52921] bg-white outline-none  rounded-[2em] text-sm px-4 py-1 text-center inline-flex border-2 border-[#A52921] items-center "
						on:click={toggleDropdown}
						type="button"
						>{selectedItem}
						<svg
							class="w-4 h-4 ml-2"
							aria-hidden="true"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/></svg
						></button
					>
					<!-- Dropdown menu -->

					<div
						class:active={showDropdown}
						id="dropdown"
						class="z-10 dropdown absolute mt-[2.1em] hidden bg-white divide-y  divide-gray-100 rounded-[1em] border-2 border-[#A52921] shadow-xl w-[6em] "
					>
						<ul class="py-1 text-sm text-[#A52921]" aria-labelledby="dropdownDefaultButton">
							{#each items as item}
								<li>
									<span
										class="block py-1 rounded-[1px] rounded-t-[2px] hover:text-white hover:bg-[#A52921]"
										on:click={() => handleItemClick(item)}>{item}</span
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-4 w-full">
				<!-- <CountryCodeInput {data} {errors} /> -->

				<div class="flex flex-col gap-2 text-start">
					<input
						type="text"
						id="Email"
						class="border-b  text-gray-900 outline-none {errors.email
							? 'border-b-rose-500'
							: ''} block w-full px-2.5 pb-1 pt-2.5 "
						placeholder="*Email"
						aria-label="Email"
						name="email"
						bind:value={data.email}
					/>
					<div class="flex flex-col gap-1">
						{#if errors?.email}
							{#each errors?.email as email}
								<p class="text-rose-500 text-xs">
									* {email}
								</p>
							{/each}
						{/if}
					</div>
				</div>

				<div class="flex flex-col gap-2 text-start">
					<input
						type="text"
						id="confirmEmail"
						class="{errors.confirmEmail
							? 'border-rose-500'
							: ''} border-b outline-none text-gray-900 bg-transparent  block w-full p-2.5 pb-1"
						placeholder="*Confirm email"
						aria-label="Confirm Email"
						name="confirmEmail"
						bind:value={data.confirmEmail}
					/>
					<div class="flex flex-col gap-1">
						{#if errors?.confirmEmail}
							{#each errors?.confirmEmail as confirmEmailError}
								<p class="text-rose-500 text-xs">
									* {confirmEmailError}
								</p>
							{/each}
						{/if}
					</div>
				</div>

				<div class=" flex flex-col gap-2 text-start">
					<input
						type="password"
						id="password"
						class="{errors.password
							? 'border-rose-500'
							: ''} border-b outline-none text-gray-900 block w-full p-2.5 pb-1"
						placeholder="*Password"
						name="password"
						aria-label="Password"
						bind:value={data.password}
					/>
					<div class="flex flex-col gap-1">
						{#if errors?.password}
							{#each errors?.password as passwordError}
								<p class="text-rose-500 text-xs">
									* {passwordError}
								</p>
							{/each}
						{/if}
					</div>
				</div>

				<div class="flex flex-col text-start gap-2">
					<input
						type="password"
						id="confirm_passwordF"
						class="{errors.confirmPassword
							? 'border-rose-500'
							: ''} border-b outline-none text-gray-900 block w-full p-2.5 pb-1"
						name="confirmPassword"
						placeholder="*Confirm password"
						bind:value={data.confirmPassword}
					/>
					<div class="flex flex-col gap-1">
						{#if errors?.confirmPassword}
							{#each errors?.confirmPassword as confirmPasswordError}
								<p class="text-rose-500 text-xs">
									* {confirmPasswordError}
								</p>
							{/each}
						{/if}
					</div>
				</div>
				<div class="mb-3 text-start flex flex-col gap-3">
					<label for="invitation_code" class="text-[#A52921] text-xs"
						>If you got an invitation code please fill in now</label
					>
					<input
						type="text"
						id="invitation_code"
						class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Invitation code(optional)"
					/>
				</div>
				<div class="flex items-start mb-1">
					<div class="flex items-center h-5">
						<input
							id="remember"
							type="checkbox"
							value=""
							class="w-4 h-4 border  rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
						/>
					</div>
					<label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>I agree with the with general terms and condition
					</label>
				</div>
				<div class="flex items-start mb-6">
					<div class="flex items-center h-5">
						<input
							id="agreed-to-general-terms"
							type="checkbox"
							value=""
							class="w-4 h-4 border  rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
						/>
					</div>
					<label
						for="agreed-to-general-terms"
						class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>I agree with the with general terms and condition
					</label>
				</div>
				<button
					type="submit"
					class="text-white bg-[#A52921] focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>{#if loading}
						<iconify-icon icon="line-md:loading-loop" width="20" />{:else}
						Register
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>

{#if regSuccess}
	<div class="w-screen h-screen fixed top-0 z-10 left-0">
		<div class="w-screen h-screen bg-[#0000003e] absolute top-0 left-0" />
		<div class="flex h-screen w-screen bg-white z-[1] relative items-center justify-center md:p-0">
			<div
				class="bg-white h-[800px] w-screen md:h-screen flex flex-col items-center md:justify-center md:mt-0 mt-[15em] z-10 rounded-xl gap-4"
			>
				<h1 class="md:text-[46px] text-[40px] text-[#d2b133] font-bold">Verify Your E-mail</h1>
				<p class="max-w-[500px] text-[13px] text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt numquam quod consequatur
					sunt velit, totam officia illum magni aperiam cum qui deserunt, eligendi incidunt
					voluptatibus voluptatum illo. Possimus, voluptas voluptates.
				</p>

				<button class="mb-6 bg-[#a52921] md:w-[300px] py-2 px-5  mt-8 rounded-[3em] text-white"
					>Send again</button
				>

				<div class="text-center gap-2 flex flex-col items-center max-w-[400px] justify-center">
					<iconify-icon icon="mdi:information" style="color: #a52921;" width="30" height="30" />
					<p class="text-sm text-gray-400">
						Please check your spam folder for the verification email if you do not see it in your
						inbox.
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@media (min-width: 768px) {
		.container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 4fr;
			grid-auto-columns: 1fr 1fr;
			gap: 20px;
			grid-auto-flow: column;
			grid-template-areas:
				'i5 i4'
				'i5 .'
				'. .';
		}

		.item-1 {
			grid-area: i4;
		}

		.item-2 {
			grid-area: i5;
		}

		.item-3 {
			grid-area: 2;
		}
	}

	li:hover {
		cursor: pointer;
		background-color: rgba(255, 255, 255, 0.1);
	}
	/* .dropdown {
		
	} */
	.dropdown.active {
		display: block;
		height: auto;
	}
	.dropdown{
		height: 0;
		overflow: hidden;
		transition: height 1s ease-out;
	}
	.dropdown.active {
        height: auto;
    }
</style>
