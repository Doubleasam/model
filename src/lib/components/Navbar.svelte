<script lang="ts">
	import { goto } from "$app/navigation";
	import {profileStore} from '$lib/store/store'
	

	
 

//   async function handleTranslateButtonClick() {
//     await initialize();
//   }

	let showNav = false;
	let loggedIn = false;

	function toggleNav() {
		showNav = !showNav;
	}

	function logOut(){

		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		goto('/auth/login');
		location.reload()
	}

	
	
</script>

<div
	class="bg-white w-screen items-center md:h-[55px] py-2 flex shadow fixed top-0 left-0 z-[8888]"
>
	<nav
		class="max-w-[1024px] {!showNav
			? 'h-[50px]'
			: 'screen'} md:p-0 lg:gap-0 px-3 w-full mx-auto flex items-center justify-between flex-wrap"
	>
		<a href="/"
			><div class="flex text-[#A52921] items-center gap-3 justify-center">
				<img src="/logo.png" class="w-[35px]" alt="" />
				<h1 class="font-[Inter] md:text-[36px] text-[25px] font-bold">iludate-agentur</h1>
			</div></a
		>

		{#if showNav}
			<button on:click={toggleNav}>
				<iconify-icon icon="material-symbols:close-rounded" width="30" height="30" />
			</button>
		{:else}
			<button class="flex item-center justify-center md:hidden" on:click={toggleNav}>
				<iconify-icon icon="system-uicons:menu-hamburger" width="50" height="40" />
			</button>
		{/if}
		<ul class="md:flex gap-5 items-center text-[13px] hidden">
			<li><a href="/">Start</a></li>
			<li><a href="/">Info</a></li>
			<li><a href="/">Honorar</a></li>
			<li><a href="/">Select</a></li>
			<li><a href="/">Video Call</a></li>
			<li><a href="/">Contact Us</a></li>
			<li><a href="/">News</a></li>
		</ul>
		<div class="md:flex cursor-pointer hidden gap-4 items-center text-[13px]">
			<div class="flex gap-2">
				<span class="text-[#A52921]">EN</span>
				<span>DE</span>
			</div>

				{#if $profileStore}
					<button on:click={logOut} class="px-6 py-1 border rounded-3xl" >Logout</button>
					{:else}
					<a href="/auth/login" class="px-6 py-1 border rounded-3xl">Login</a>
					{/if}
		</div>

		{#if showNav}
			<div
				class="px-[2em] w-screen h-auto transition-all items-right mt-8 text-base bg-white flex  flex-col gap-10"
			>
				<ul class="flex gap-8 items-start flex-col  ">
					<li><a href="/">Start</a></li>
					<li><a href="/">Info</a></li>
					<li><a href="/">Honorar</a></li>
					<li><a href="/">Select</a></li>
					<li><a href="/">Video Call</a></li>
					<li><a href="/">Contact Us</a></li>
					<li><a href="/">News</a></li>
				</ul>
				<div class="flex gap-8 items-start flex-col">
					<div class="flex  gap-4">
						<span>EN</span>
						<span>DE</span>
					</div>

					{#if $profileStore}
					<button on:click={logOut} class="px-6 py-1 border rounded-3xl" >Logout</button>
					{:else}
					<a href="/auth/login" on:click={toggleNav} class="px-6 py-1 border rounded-3xl">Login</a>
					{/if}
				</div>
			</div>
		{/if}
	</nav>
</div>

<style>

	/* @media(max-width: 1000px){
        h1{
            font-size: 20px;
        }
        img{
            height: 30px;
        }
        nav{
            padding-inline: 10px;
        }
    } */

	li {
		position: relative;
		display: inline-block;
	}
	li::before {
		content: '';
		display: block;
		width: 0;
		height: 2px;
		background-color: #a52921;
		position: absolute;
		bottom: 0;
		left: 0;
		transition: width 0.3s ease-in-out;
	}

	li:hover::before {
		width: 100%;
	}
</style>
