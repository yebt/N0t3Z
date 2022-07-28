<script setup>
// add env just on dev env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
api_url = process.env.API_URL || 'https://node-http-module-dev.up.railway.app';
</script>

<template>
    <div class="h-screen w-full bg-gray-200">
        <div class="w-full h-full flex flex-col items-center justify-center">
            <div class="flex">

                <div class="bg-white rounded-lg shadow shadow-slate-300">
                    <div class="relative w-full">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fi fi-rr-search w-5 h-5 text-gray-500"></i>
                        </div>
                        <input id="simple-search" type="text" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-0 focus:ring-1 focus:ring-emerald-300 block w-full pl-10 p-2.5" placeholder="Search" required />
                    </div>
                </div>
                <div class="flex items-center">
                    <button  class="bg-teal-500 rounded-lg p-2 mx-2 text-slate-200 shadow-md outline-0 focus:ring focus:ring-teal-400/40 hover:shadow-lg hover:bg-teal-600/80 hover:text-slate-50 hover:text-lg">
                        <i class="flex fi fi-rr-refresh"></i>
                    </button>
                </div>
            </div>

            <div class="w-11/12 sm:w-5/6 md:w-4/5 p-3 m-3 bg-white rounded-xl shadow-lg">
            </div>
        </div>
    </div>
</template>

<style scoped></style>
