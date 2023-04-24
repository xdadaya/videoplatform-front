<template>
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="updateVideo">
        <h4 class="text-center text-3xl font-bold"> Update video </h4>
        <div class="my-8">
            <custom-input type="text" v-focus v-model="newTitle" placeholder="Video title" required />
            <custom-input type="text" v-model="newCategory" placeholder="Video category" required />
            <custom-input type="text" v-model="newDescription" placeholder="Video description" required />
        </div>
        <custom-button type="submit" v-if="!processingRequest"> Update </custom-button>
        <custom-button v-else disabled><custom-spinner class="w-5 h-5"/></custom-button>
    </form>
</template>

<script>
    import videosAxios from '@/axios/videosAxios'
    import { errorHandler } from '@/axios/toastHandler.ts'

    export default {
        data(){
            return{
                processingRequest: false,
                newTitle: this.title,
                newDescription: this.description,
                newCategory: this.category
            }
        },
        props:{
            videoId:{
                type: String,
                required: true,
            },
            title:{
                type: String,
                required: true,
            },
            description:{
                type: String,
                required: true,
            },
            category:{
                type: String,
                required: true,
            },
        },
        methods:{
            async updateVideo(){
                try{
                    this.processingRequest = true
                    const data =  {title: this.newTitle, description: this.newDescription, category: this.newCategory}
                    const response = await videosAxios.put(`videos/${this.videoId}/`, data)
                    this.$emit('updateVideo', response.data)
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