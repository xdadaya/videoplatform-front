<template>
    <custom-dialog v-model:isVisible="dialogVisible">
        <AuthForm @closeDialog="closeDialog" />
    </custom-dialog>
    <nav class="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <span @click="$router.push(indexUrl)" class="flex items-center cursor-pointer">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo">
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Videos</span>
            </span>
            <div class="flex md:order-2">
                <custom-button @click="showDialog" v-if="!isAuth"> Authorize &#8658; </custom-button>
                <custom-button @click="logout" v-else> Log out &#8656; </custom-button>
                <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" @click="changeVisibility" aria-hidden="false" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div class="items-center justify-between w-full md:flex md:w-auto md:order-1" :class="{'hidden': hidden}" id="navbar-sticky">
                <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <custom-link @click="$router.push(indexUrl)" :isSelected="currentUrl === indexUrl"> Home </custom-link>
                    </li>
                    <li>
                        <custom-link @click="$router.push(aboutUrl)" :isSelected="currentUrl === aboutUrl"> About </custom-link>
                    </li>
                    <li>
                        <custom-link @click="$router.push(servicesUrl)" :isSelected="currentUrl === servicesUrl"> Services </custom-link>
                    </li>
                    <li v-if="isAuth">
                        <custom-link @click="$router.push(channelUrl)" :isSelected="currentUrl === channelUrl"> Your channel </custom-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import AuthForm from "./AuthForm.vue"
    import { defineComponent } from "vue"
    import { mapState, mapActions } from 'vuex'

    export default defineComponent({
        components: {
            AuthForm
        },
        data() {
            return {
                hidden: true,
                dialogVisible: false,
                indexUrl: '/',
                aboutUrl: '/about',
                servicesUrl: '/services',
                baseChannelUrl: '/profile/'
            }
        },
        methods: {
            changeVisibility(){
                this.hidden = !this.hidden
            },
            showDialog(){
                this.dialogVisible = true
            },
            closeDialog(){
                this.dialogVisible = false
            },
            ...mapActions({
                logout: 'auth/logout'
            }),
        },
        computed: {
            currentUrl(){
                return this.$route.fullPath
            },
            channelUrl(){
                return this.baseChannelUrl + this.userId
            },
            ...mapState({
                isAuth: state => state.auth.isAuth,
                userId: state => state.auth.userId
            })
        },
    })
</script>