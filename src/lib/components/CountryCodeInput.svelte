<script lang="ts">
	import intlTelInput from 'intl-tel-input';
	import { onMount } from 'svelte';
	export let data: any, errors: any;

	$: code = '+1';
	let number: string = '';
	
	onMount(() => {
		const input = document.querySelector('#Phone-number');
		intlTelInput(input, {
			separateDialCode: true,
			autoPlaceholder: 'aggressive',
			autoHideDialCode: false,
			placeholderNumberType: 'PERSONAL_NUMBER',
			customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
				return 'e.g. ' + selectedCountryPlaceholder;
			}
		});

		input.addEventListener('countrychange', (e) => {
				
			code = e.target.previousSibling.innerText;
			data.phone = code;
			
			
		});
	});

</script>

<div class="flex flex-col gap-2 text-start">
	<input
		type="text"
		id="Phone-number"
		class="border-b outline-none {errors.phone
			? 'border-rose-500'
			: ''} text-gray-900  block w-full pb-1 p-2.5"
		aria-label="Phone Number"
		placeholder = "({code} ) 123-456-789"
		name="phone"
		bind:value={data.phone}
	/>
	<div class="flex-col flex gap-1">
		{#if errors?.phone}
			{#each errors?.phone as phoneError}
				<p class="text-rose-500 text-xs">
					*{phoneError}
				</p>
			{/each}
		{/if}
	</div>
</div>
