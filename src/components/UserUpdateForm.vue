<template>
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="updateUser">
        <h4 class="text-center text-3xl font-bold"> Update username </h4>
        <div class="my-8">
            <custom-input type="text" v-focus v-model="newUsername" placeholder="Username" required />
        </div>
        <custom-button type="submit" v-if="!processingRequest"> Update </custom-button>
        <custom-button v-else disabled><custom-spinner class="w-5 h-5"/></custom-button>
    </form>
</template>

<script>
    import { useToast } from 'vue-toastification';
    import usersAxios from '@/axios/usersAxios'
    import { errorHandler } from '@/axios/toastHandler.ts'

    const toast = useToast()
    
    export default {
        data(){
            return{
                processingRequest: false,
                newUsername: this.username
            }
        },
        props:{
            username:{
                type: String,
                required: true
            }
        },
        methods:{
            async updateUser(){
                try{
                    this.processingRequest = true
                    const response = await usersAxios.put(`users/me`, {username: this.newUsername})
                    this.$emit("updateUsername", response.data)
                    this.$emit("closeDialog")
                } catch(e){
                    errorHandler(e)
                } finally{
                    this.processingRequest = false
                }
            }
        }
    }
</script>