<template>
    <div class="rounded-md shadow-sm mx-auto w-fit" role="group">
        <button :class="{'bg-gray-600 :hover:bg-gray-600': loginDisabled}" class="focus:ring-0 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-l-lg text-sm px-4 py-2 text-center mr-3 md:mr-0" @click="switchForm" title="Switch to login">
            Login
        </button>
        <button :class="{'bg-gray-600 :hover:bg-gray-600': registerDisabled}" class="focus:ring-0 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-r-lg text-sm px-4 py-2 text-center mr-3 md:mr-0" @click="switchForm" title="Switch to registration">
            Registration
        </button>
    </div>
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="login" v-if="!loginDisabled">
        <h4 class="text-center text-3xl font-bold"> Login </h4>
        <div class="my-8">
            <custom-input type="text" v-focus v-model="loginData.username" placeholder="Username" @keyup.enter="login" required />
            <custom-input type="password" v-model="loginData.password" placeholder="Password" @keyup.enter="login" required />
        </div>
        <custom-button @click="login" v-if="!processingRequest"> Log in </custom-button>
        <custom-button v-else disabled><custom-spinner class="w-5 h-5"/></custom-button>
    </form>  
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="register" v-if="!registerDisabled">
        <h4 class="text-center text-3xl font-bold"> Register </h4>
        <div class="my-8">
            <custom-input type="text" v-focus v-model="registerData.username" placeholder="Username" @keyup.enter="register" required />
            <custom-input type="password" v-model="registerData.password" placeholder="Password" @keyup.enter="register" required />
            <custom-input type="password" v-model="registerData.repeat_password" placeholder="Repeat password" @keyup.enter="register" required />
        </div>
        <custom-button @click="register" v-if="!processingRequest"> Sign up </custom-button>
        <custom-button v-else disabled><custom-spinner class="w-5 h-5"/></custom-button>
    </form>  
</template>

<script>
import { defineComponent } from 'vue'
import { useToast } from 'vue-toastification'
import { mapActions } from 'vuex'
import CustomButton from './UI/CustomButton.vue'

export default defineComponent({
  components: { CustomButton },
    data() {
        return {
            processingRequest: false,
            currentForm: "login",
            loginData: {
                username: '',
                password: ''
            },
            registerData: {
                username: '',
                password: '',
                repeat_password: ''
            }
        }
    },
    methods: {
        switchForm(){
            this.currentForm = this.currentForm === "register" ? "login" : "register"
        },
        async login(){
            this.processingRequest = true
            const isResultSuccess = await this.loginStore(this.loginData)
            this.loginData.password = ""
            this.processingRequest = false
            if(isResultSuccess) {
                this.loginData.username = ""
                this.$emit('closeDialog')
            }
        },
        async register(){
            if(this.registerData.password !== this.registerData.repeat_password){
                const toast = useToast()
                toast.error("Password doesn't match")
                return
            }
            this.processingRequest = true
            const isResultSuccess = await this.registerStore(this.registerData)
            this.processingRequest = false
            this.loginData.password = ""
            this.loginData.repeat_password = ""
            if(isResultSuccess) {
                this.loginData.username = ""
                this.$emit('closeDialog')
            }
        },
        ...mapActions({
            loginStore: 'auth/login',
            registerStore: 'auth/register'
        }),
    },
    computed:{
        loginDisabled(){
            return this.currentForm === "register"
        },
        registerDisabled(){
            return this.currentForm === "login"
        }
    }
})
</script>