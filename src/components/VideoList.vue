<template>
    <div v-if="videosLoaded">
        <div v-if="!videosExists" class="text-2xl font-bold mx-auto w-fit">No videos</div>
        <div v-else class="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <VideoInList v-for="video in videos" :key="video.id" :video="video" />
            <div v-intersection="loadMoreVideos" class="h-4 bg-red-500" />
        </div>
    </div>
    <custom-spinner v-else />
</template>

<script>
    import axios from 'axios'
    import { useToast } from 'vue-toastification'
    import VideoInList from './VideoInList.vue'
    export default {
        components: {
            VideoInList
        },
        data(){
            return{
                pageNumber: 1,
                totalPages: 1,
                videosLoaded: false,
                videos: []
            }
        },
        methods: {
            async loadMoreVideos(){
                if(this.pageNumber <= this.totalPages){
                    try{
                        const response = await axios.get(`http://localhost:5100/api/v1/videos?page=${this.pageNumber}`)
                        this.videos = [...this.videos, ...response.data.items]
                        this.totalPages = response.data.total_pages
                        this.pageNumber++
                    } catch(e){
                        console.log(e)
                        const toast = useToast()
                        toast.error("Error loading videos")
                    } finally {
                        this.videosLoaded = true
                    }
                }
            }
        },
        computed:{
            videosExists(){
                return this.videos.length > 0
            }
        },
        async mounted(){
            await this.loadMoreVideos()
        }
    }
</script>