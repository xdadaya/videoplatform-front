<template>
    <div v-if="videosLoaded">
        <div v-if="!videosExists" class="text-2xl font-bold mx-auto w-fit">No videos</div>
        <div v-else class="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <transition-group name="video-list">
                <VideoInList v-for="video in videos" :key="video.id" :video="video" />
            </transition-group>
            <div v-intersection="loadMoreVideos" class="h-4" />
        </div>
    </div>
    <custom-spinner v-else />
</template>

<script>
    import videosAxios from '@/axios/videosAxios'
    import { errorHandler } from '@/axios/toastHandler.ts'

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
                        const response = await videosAxios.get(`videos?page=${this.pageNumber}`)
                        this.videos = [...this.videos, ...response.data.items]
                        this.totalPages = response.data.total_pages
                        this.pageNumber++
                    } catch(e){
                        errorHandler(e)
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

<style scoped>
.video-list-item {
    display: inline-block;
    margin-right: 10px;
}

.video-list-enter-active, .video-list-leave-active {
    transition: all 0.5s ease
}

.video-list-enter-from {
    opacity: 0;
    transform: translateY(-130px);
}

.video-list-leave-to {
    opacity: 0;
    transform: translateY(130px);
}

.video-list-move {
    transition: transform 0.8s ease;
}
</style>