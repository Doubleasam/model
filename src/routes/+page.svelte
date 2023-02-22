<script lang="ts">
    import { profileStore } from "$lib/store/store";
	import { AxiosError } from "axios";
	import { onMount } from "svelte";
	import toast from "svelte-french-toast";
	import { checkForProfile } from "./logic";

$: profileObj = $profileStore;
   
    
</script>
<div class="flex items-center justify-center h-screen">


{#if profileObj }
<div class=" div flex flex-col items-center justify-center md:flex-row md:gap-[3em] gap-8 border-2 border-[#00000027] p-8 md:px-[2em] md:py-[5em]">
    
    <div class="w-full relative flex flex-col gap-10 md:items-start items-center">
    
        <div class="flex gap-3 md:gap-5 w-full md:flex-row flex-col items-center justify-center">
            <img src="/logo.png" class=" w-[50px] " alt="iludate-agentur's logo">
            <h1 class="text-[35px] font-medium text-[#A52921]">iludate-agentur</h1>
        </div>
        <div class="flex gap-3">
            <div class="flex flex-col items-center  text-sm">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 20 20"><path fill="#a52921" d="M13 10a3 3 0 1 1-6 0c0-.171.018-.338.049-.5H6v3.997c0 .278.225.503.503.503h6.995a.503.503 0 0 0 .502-.503V9.5h-1.049c.031.162.049.329.049.5zm-3 2a2 2 0 1 0-.001-4.001A2 2 0 0 0 10 12zm2.4-4.1h1.199a.301.301 0 0 0 .301-.3V6.401a.301.301 0 0 0-.301-.301H12.4a.301.301 0 0 0-.301.301V7.6c.001.165.136.3.301.3zM10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 0 0 9.6 9.6a9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 10 .4zm5 13.489C15 14.5 14.5 15 13.889 15H6.111C5.5 15 5 14.5 5 13.889V6.111C5 5.5 5.5 5 6.111 5h7.778C14.5 5 15 5.5 15 6.111v7.778z"/></svg>

             <p class="text-[10px] font-black">Instagram</p>
             <p>@janedoe</p>
           </div>
           <div class="flex flex-col items-center  text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 20 20"><path fill="#a52921" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zm2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443v1.581z"/></svg>

             <p class="text-[10px] font-black">Facebook</p>
             <p>Jane Doe</p>
           </div>
           <div class="flex flex-col items-center text-sm">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 496 512"><path fill="#a52921" d="M248 8C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8zm169.5 338.9c-3.5 8.1-18.1 14-44.8 18.2c-1.4 1.9-2.5 9.8-4.3 15.9c-1.1 3.7-3.7 5.9-8.1 5.9h-.2c-6.2 0-12.8-2.9-25.8-2.9c-17.6 0-23.7 4-37.4 13.7c-14.5 10.3-28.4 19.1-49.2 18.2c-21 1.6-38.6-11.2-48.5-18.2c-13.8-9.7-19.8-13.7-37.4-13.7c-12.5 0-20.4 3.1-25.8 3.1c-5.4 0-7.5-3.3-8.3-6c-1.8-6.1-2.9-14.1-4.3-16c-13.8-2.1-44.8-7.5-45.5-21.4c-.2-3.6 2.3-6.8 5.9-7.4c46.3-7.6 67.1-55.1 68-57.1c0-.1.1-.2.2-.3c2.5-5 3-9.2 1.6-12.5c-3.4-7.9-17.9-10.7-24-13.2c-15.8-6.2-18-13.4-17-18.3c1.6-8.5 14.4-13.8 21.9-10.3c5.9 2.8 11.2 4.2 15.7 4.2c3.3 0 5.5-.8 6.6-1.4c-1.4-23.9-4.7-58 3.8-77.1C183.1 100 230.7 96 244.7 96c.6 0 6.1-.1 6.7-.1c34.7 0 68 17.8 84.3 54.3c8.5 19.1 5.2 53.1 3.8 77.1c1.1.6 2.9 1.3 5.7 1.4c4.3-.2 9.2-1.6 14.7-4.2c4-1.9 9.6-1.6 13.6 0c6.3 2.3 10.3 6.8 10.4 11.9c.1 6.5-5.7 12.1-17.2 16.6c-1.4.6-3.1 1.1-4.9 1.7c-6.5 2.1-16.4 5.2-19 11.5c-1.4 3.3-.8 7.5 1.6 12.5c.1.1.1.2.2.3c.9 2 21.7 49.5 68 57.1c4 1 7.1 5.5 4.9 10.8z"/></svg>

             <p class="text-[10px] font-black">Snapchat</p>
             <p>@janedoe</p>
           </div>

        </div>
    </div>
    <div class="flex flex-col gap-5 md:items-start items-center">
        <div class="flex gap-4 items-center ">
             <h1 class="flex flex-col text-xs gap-2 font-black">Name <span class="font-medium text-[25px]">{profileObj.profile.firstName} </span></h1>

        <h1 class="flex flex-col text-xs gap-2 font-black">Surname <span class="font-medium text-[25px]">{profileObj.profile.lastName} </span></h1>
        </div>
        <h1 class="flex flex-col text-xs gap-3 justify-center font-black">Email: <span class="font-medium text-[25px]">{profileObj.email}</span></h1>
    </div>
</div>

{:else}
<p class="text-4xl relative text-center">Welcome to <span class="text-[#A52921]">iludate-agentur</span></p>
{/if}</div>

<style>

</style>