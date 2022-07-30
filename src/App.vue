<script>
// const api_url = "http://127.0.0.1:8080";
// lt --port 8080 --subdomain colorschemeapi
const api_url = "http://colorschemeapi.loca.lt";
// http://colorschemeapi.loca.lt

export default {
    data() {
        return {
            debugcc: true,
            error: false,
            loading: false,
            colorSchemes: [],
            separated: false,
            rounded: false,
            showname: false,
        };
    },
    methods: {
        async getData() {
            const data = await fetch(api_url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .catch((error) => console.error(error));
            return data;
        },
        async processColorSchemes() {
            this.loading = true;
            const data = await this.getData();
            if (data.result == "success") {
                this.colorSchemes = data.data;
                this.loading = false;
            } else {
                console.log("error");
                this.error = true;
            }
        },
        clickSync() {
            if (this.loading) {
                return;
            }
            this.loading = true;
            setTimeout(() => {
                this.processColorSchemes();
            }, 1000);
            //this.processColorSchemes();

        },
        getForegrund(color){

            let red = parseInt(color.substr(1,2), 16); // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
            let green = parseInt(color.substr(3,2), 16);
            let blue = parseInt(color.substr(5,2), 16);
            if ((red*0.299 + green*0.587 + blue*0.114) > 186) 
                return '#000000'
            else 
                return '#ffffff'
        }
    },
    mounted() {
        // this.clickSync();
    },
};
</script>

<template>

    <div class="h-full py-12 bg-gray-100">
        <div class="flex flex-col justify-center h-full sm:items-center">

            <!-- search -->
            <div class="flex mx-3 mb-3 sm:mx-0">
                <!-- input setup-->
                <div class="flex-1">
                    <!-- icon -->
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i class="w-5 h-5 text-gray-500 fi fi-rr-search"></i>               
                        </div>
                        <input type="text" class="block p-2.5 pl-10 text-sm text-gray-800 border border-r-0 rounded-l-lg shadow outline-none border-slate-300  ring-0 focus:ring focus:ring-teal-400/40 sm:rounded-lg sm:border-r w-full transition-shadow hover:shadow-lg duration-500" placeholder="Search" required />
                    </div>

                </div>
                <!-- button --> 
                <div class="flex sm:items-center sm:ml-2">
                    <button type="button" @click="clickSync()" class="p-2 bg-teal-500 border border-l-0 rounded-r-lg shadow outline-none border-slate-300 sm:rounded-lg sm:border-l transition duration-300" :class="{'hover:shadow-lg hover:bg-teal-600 focus:ring focus:ring-teal-400/40':!loading, 'bg-teal-500/70 animate-pulse pointer-events-none':loading}"  :disable="loading"> 

                        <i  class="flex text-lg text-zinc-50 fi fi-rr-refresh" :class="{'animate-spin':loading}"></i>
                    </button>
                </div>

            </div>
            <!-- data -->
            <div class="flex max-h-full px-2 sm:p-2 sm:w-5/6">

                <div class="w-full h-full min-h-[10rem]  bg-white border rounded-lg border-slate-200 hover:shadow-md transition-shadow duration-300 p-2">

                    <!-- success case -->
                    <div v-if="!loading && colorSchemes.length != 0 && !error"
                        class="flex flex-col h-full">
                        <!-- tools -->
                        <div  class="flex mb-2">
                            <!-- left logo -->
                            <div class="flex px-2.5 text-teal-700 rounded bg-emerald-50 font-major-mono-display-regular">
                                <span class="my-auto">N<span class="hidden sm:inline">c020R5</span></span>
                            </div>

                            <!-- right tools -->
                            <div class="ml-auto px-0.5 flex flex-row outline outline-1 outline-slate-100 rounded shadow-sm font-major-mono-display-regular">
                                <button class="px-2.5 py-2 m-1 rounded text-gray-600 hover:bg-slate-100" :class="{ 'text-green-600 bg-teal-300/20': separated }" @click="separated = !separated">
                                    <i v-show="separated" class="flex fi fi-sr-apps"></i>
                                    <i v-show="!separated" class="flex fi fi-rr-apps"></i>
                                </button>
                                <button class="px-2.5 py-2 m-1 rounded text-gray-600 hover:bg-slate-100" :class="{ 'text-green-600 bg-teal-300/20': rounded }" @click="rounded = !rounded">
                                    <i v-show="rounded" class="flex fi fi-ss-circle"></i>
                                    <i v-show="!rounded" class="flex fi fi-rr-circle"></i>
                                </button>
                                <button class="px-2.5 py-2 m-1 rounded text-gray-600 hover:bg-slate-100" :class="{ 'text-green-600 bg-teal-300/20': showname }" @click="showname = !showname">
                                    <i v-show="showname" class="flex fi fi-sr-label"></i>
                                    <i v-show="!showname" class="flex fi fi-rr-label"></i>
                                </button>
                            </div>

                        </div>

                        <!-- colorschemes -->
                        <div class="h-full p-2 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                            <div v-for="(item,index) in colorSchemes" :key="index"
                                class="relative py-2 group"
                            >
                                <div class="absolute invisible w-full group-hover:visible bg-neutral-50/60 md:visible md:relative" :class="{'hidden':!showname}">
                                    <span class="px-2 font-mono text-gray-800 capitalize" >{{item.name}}</span>
                                </div>

                                <div class="grid grid-flow-col" :class="{'gap-0.5':separated}">
                                    <div v-for="(colorItem, colorIndx) in item.colors" :key="colorIndx"
                                        class="flex h-20 hover:px-4 transition-all duration-300"  :class="{'rounded':rounded}"
                                        :style="{'background-color': colorItem.hex}"
                                    >
                                        <span class="m-auto select-none" style="writing-mode: vertical-lr; transform: rotate(180deg);" :style="{'color': getForegrund(colorItem.hex)}">
                                            {{colorItem.hex}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <!-- cases -->
                    <div v-else class="flex items-center justify-center h-full">

                        <!-- error case -->
                        <div v-if="error">
                            <div class="text-center text-red-500/60">
                                <h1 class="text-2xl font-bold">Error</h1>
                                <p class="text-md">Something went wrong :c.</p>
                            </div>
                        </div>
                        <!-- loading case -->
                        <div v-else-if="loading" class="flex justify-center">
                            <div class="lds-ellipsis">
                                <div class="bg-teal-400 shadow"></div>
                                <div class="bg-teal-400 shadow"></div>
                                <div class="bg-teal-400 shadow"></div>
                                <div class="bg-teal-400 shadow"></div>
                            </div>
                        </div>

                        <!-- empty case -->
                        <div v-else-if="colorSchemes.length == 0">
                            <div class="text-center text-gray-500">
                                <h1 class="text-2xl font-bold">No color schemes found yet</h1>
                                <p class="text-md">Please try again later or feed this.</p>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>

    </div>

    <!-- ---------------------------------------------------------------------------------------------- -->


</template>

<style>
html,
body,
#app {
    height: 100%;
}
* {
    outline: silver solid 1px !important;
}
</style>

<style scoped>
/* try use all screen */

/*Loader*/
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    /*background: #cef;*/
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
0% {
    transform: scale(0);
}
100% {
    transform: scale(1);
}
}
@keyframes lds-ellipsis3 {
0% {
    transform: scale(1);
}
100% {
    transform: scale(0);
}
}
@keyframes lds-ellipsis2 {
0% {
    transform: translate(0, 0);
}
100% {
    transform: translate(24px, 0);
}
}
</style>
