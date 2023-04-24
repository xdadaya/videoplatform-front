<template>
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="addVideo">
        <h4 class="text-center text-3xl font-bold"> Add video </h4>
        <div class="my-8">
            <custom-input type="text" v-focus v-model="title" placeholder="Video title" required />
            <custom-input type="text" v-model="category" placeholder="Video category" required />
            <custom-input type="text" v-model="description" placeholder="Video description" required />
            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            MP4 (MAX. 800x400px)
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept="video/mp4" @change="fileInput"/>
                    <p v-if="video">Selected file: {{ video.name }}</p>
                </label>
            </div> 
        </div>
        <custom-button type="submit" v-if="!processingRequest"> Add </custom-button>
        <custom-button v-else disabled><custom-spinner class="w-5 h-5"/></custom-button>
    </form>
</template>

<script>
    import { useToast } from 'vue-toastification';
    import videosAxios from '@/axios/videosAxios'

    const toast = useToast()
    
    export default {
        data(){
            return{
                title: '',
                category: '',
                description: '',
                video: null,
                processingRequest: false
            }
        },
        methods:{
            fileInput(event){
                this.video = event.target.files[0];
            },
            verifyVideo(){
                if(this.video.type !== 'video/mp4') {
                    toast.error("Video type is not mp4. Only mp4 is supported")
                    return false
                }
                if(this.video.size > 100000000){
                    toast.error("Video is too big. Compress it or use another one")
                    return false
                }
                return true
            },
            async addVideo(){
                try{
                    this.processingRequest = true
                    if(!this.verifyVideo()) return null
                    const fData = new FormData()
                    fData.append('title', this.title)
                    fData.append('category', this.category)
                    fData.append('description', this.description)
                    fData.append('video', this.video)
                    const response = await videosAxios.post('videos/', fData)
                    this.$emit('closeDialog')
                    this.$router.push(`/video/${response.data.id}`)
                } catch(e){
                    console.log(e)
                } finally {
                    this.processingRequest = false
                }
            }
        }
    }
</script>