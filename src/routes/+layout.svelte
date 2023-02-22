<script lang="ts">
	import '../styles/tailwind.css';
	import 'intl-tel-input/build/css/intlTelInput.css';
	import 'iconify-icon';
	import toast, { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/Navbar.svelte';
	import { checkForProfile } from './logic';
	import { AxiosError } from 'axios';
	import { profileStore } from '$lib/store/store';
	import { onMount } from 'svelte';
 

 let profileObj: any = {}
   
    $: profileObj= $profileStore
	const checkUser = async() => {
		let check = await checkForProfile();
		if (check.status === 200) {
			profileStore.set(check.data)
		}else profileStore.set(null)
	}
    
	
    
    const a = async () => {
        await checkUser();
        console.log(profileObj);
    }
   onMount(() => {
     a()
   })
	
	
</script>

<Toaster />

<Navbar />
<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,700&display=swap');
	.iti__flag {
		background-image: url('path/to/flags.png');
	}

	@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
		.iti__flag {
			background-image: url('path/to/flags@2x.png');
		}
	}

	* {
		font-family: 'Montserrat', sans-serif;
	}
</style>
