<script>
const api_url = "http://127.0.0.1:8080";

export default {
    data() {
        return {
            error: false,
            loading: true,
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
    },
    mounted() {
        setTimeout(() => {
            this.processColorSchemes();
        }, 1000);
        //this.processColorSchemes();
    },
};
</script>

<template>
    <div class="h-screen w-full bg-gray-200">
        <div class="w-full h-full flex flex-col sm:items-center justify-center">
            <div class="flex mx-3">
                <div class="bg-white rounded-lg shadow shadow-slate-300 flex-1">
                    <div class="relative w-full">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <i class="fi fi-rr-search w-5 h-5 text-gray-500"></i>
                        </div>
                        <input id="simple-search" type="text" class="bg-gray-50 border border-2 border-r-0 border-gray-200 text-gray-800 text-sm rounded-l-lg sm:rounded-lg outline-none ring-0 focus:ring focus:ring-teal-400/40 block w-full pl-10 p-2.5" placeholder="Search" required />
                    </div>
                </div>
                <div class="flex sm:items-center">
                    <button @click="processColorSchemes()" class="border-2 border-l-0 sm:border-none border-gray-200 bg-teal-500 rounded-r-lg p-2 text-slate-200 shadow-md outline-0 sm:ml-2 sm:rounded-lg focus:ring focus:ring-teal-400/40 hover:shadow-lg hover:bg-teal-600/80 hover:text-slate-50 hover:sm:text-lg">
                        <i class="flex fi fi-rr-refresh"></i>
                    </button>
                </div>
            </div>

            <div class="max-h-[80%]  sm:w-5/6 md:w-4/5 p-3 m-3 sm:m-3 bg-white rounded-xl shadow-lg">
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

                    <div class="flex flex-row items-center rounded-md mb-3">
                        <!-- logo -->
                        <div class="text-teal-700 bg-emerald-50 rounded py-1 px-2 font-major-mono-display-regular relative">
                            <span class="inline sm:hidden">N</span>
                            <span class="hidden sm:inline">c020R5</span>
                        </div>

                        <div class="ml-auto px-0.5 flex flex-row outline outline-1 outline-slate-100 rounded shadow font-major-mono-display-regular">
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
                <!-- data case -->
                <div  class="max-h-[80%] flex-auto overflow-y-auto">

                    <!-- controls -->
                    <!-- <div class="flex flex-row items-center rounded-md mb-3"> -->
                    <!--     <!-1- logo -1-> -->
                    <!--     <div class="text-teal-700 bg-emerald-50 rounded py-1 px-2 font-major-mono-display-regular relative"> -->
                    <!--         <span class="inline sm:hidden">N</span> -->
                    <!--         <span class="hidden sm:inline">c020R5</span> -->
                    <!--     </div> -->

                    <!--     <div class="ml-auto px-0.5 flex flex-row outline outline-1 outline-slate-100 rounded shadow font-major-mono-display-regular"> -->
                    <!--         <button class="px-2.5 py-2 m-1 rounded text-gray-600 hover:bg-slate-100" :class="{ 'text-green-600 bg-teal-300/20': separated }" @click="separated = !separated"> -->
                    <!--             <i v-show="separated" class="flex fi fi-sr-apps"></i> -->
                    <!--             <i v-show="!separated" class="flex fi fi-rr-apps"></i> -->
                    <!--         </button> -->
                    <!--         <button class="px-2.5 py-2 m-1 rounded text-gray-600 hover:bg-slate-100" :class="{ 'text-green-600 bg-teal-300/20': rounded }" @click="rounded = !rounded"> -->
                    <!--             <i v-show="rounded" class="flex fi fi-ss-circle"></i> -->
                    <!--             <i v-show="!rounded" class="flex fi fi-rr-circle"></i> -->
                    <!--         </button> -->
                    <!--         <button class="px-2.5 py-2 m-1 rounded text-gray-600 hover:bg-slate-100" :class="{ 'text-green-600 bg-teal-300/20': showname }" @click="showname = !showname"> -->
                    <!--             <i v-show="showname" class="flex fi fi-sr-label"></i> -->
                    <!--             <i v-show="!showname" class="flex fi fi-rr-label"></i> -->
                    <!--         </button> -->
                    <!--     </div> -->
                    <!-- </div> -->

                    <!-- data -->
                    <!-- <div class=""> -->
                    <!--     <div v-for="scheme in colorSchemes" :key="scheme.id" class="rounded outline outline-1 my-2 px-1 outline-slate-100 hover:shadow-md hover:outline-slate-200 relative"> -->
                    <!--         <h6 class="text-[10px] text-gray-600 font-mono">{{ scheme.name }}</h6> -->
                    <!--         <div class=""> -->
                    <!--             <div v-for="(color, index) in scheme.colors" :key="index"> -->
                    <!--                 {{ color.hex }} -->
                    <!--             </div> -->
                    <!--         </div> -->
                    <!--         <div v-for="scheme in colorSchemes" :key="scheme.id" class="rounded outline outline-1 my-2 px-1 outline-slate-100 hover:shadow-md hover:outline-slate-200 relative"> -->
                    <!--             <h6 class="text-[10px] text-gray-600 font-mono">{{ scheme.name }}</h6> -->
                    <!--             <div class=""> -->
                    <!--                 <div v-for="(color, index) in scheme.colors" :key="index"> -->
                    <!--                     {{ color.hex }} -->
                    <!--                 </div> -->
                    <!--             </div> -->
                    <!--         </div> -->
                    <!--     </div> -->
                    <!-- </div> -->
                    <div class="max-h-[100%]  flex-auto overflow-y-auto">
                        <div class="" v-for="(a,index) in [,,,,,,,,]" :key="index">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo in minima adipisci dignissimos necessitatibus ut sequi ducimus libero, nostrum accusantium!

                        </div>


                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
