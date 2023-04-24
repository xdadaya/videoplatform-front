<template>
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="addComment">
        <h4 class="text-center text-3xl font-bold"> Add comment </h4>
        <div class="my-8">
            <custom-input type="text" v-focus v-model="text" placeholder="Comment text" required />
        </div>
        <custom-button type="submit" v-if="!processingRequest"> Add </custom-button>
        <custom-button v-else disabled><custom-spinner class="w-5 h-5"/></custom-button>
    </form>
</template>

<script>
    import videosAxios from '@/axios/videosAxios'
    import { errorHandler } from '@/axios/toastHandler.ts'

    export default {
        data(){
            return{
                text: ''
            }
        },
        props:{
            videoId:{
                type: String,
                required: true
            },
            updateComment:{
                type: Object,
                required: false
            }
        },
        methods:{
            async addComment(){
                try{
                    this.processingRequest = true
                    const response = await videosAxios.post(`videos/${this.videoId}/comment/`, {text: this.text})
                    this.$emit('addComment', response.data)
                    this.$emit('closeDialog')
                } catch(e){
                    errorHandler(e)
                } finally{
                    this.processingRequest = false
                }
            }
        }
    }
</script>