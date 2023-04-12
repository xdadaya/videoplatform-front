<template>
    <div class="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <VideoInList v-for="i in videoCount" :key="i" :video="testVideo">
            {{ i }}
        </VideoInList>
    </div>
    <div v-intersection="loadMoreVideos" class="h-4 bg-red-500"></div>
</template>

<script>
    import VideoInList from './VideoInList.vue'
    export default {
        components: {
            VideoInList
        },
        data(){
            return{
                videoCount: 10,
                pageNumber: 1,
                totalPages: 10,
                testVideo: {
                    id: 1,
                    title: "Test video title",
                    description: "Vestibulum ut venenatis massa, nec porta odio. Donec sit amet nisi quis nunc congue imperdiet et id risus. Donec cursus diam vel libero aliquet dignissim. Pellentesque efficitur gravida tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sollicitudin sagittis vulputate. Cras porttitor dui est, at vulputate ex dictum vel. Phasellus consequat est non augue blandit, nec suscipit ex iaculis.",
                    first_frame_url: "https://www.learntotrade.com.ph/assets-lttph/uploads/2016/04/video-preview-pic.jpg",
                    video_url: "https://joy1.videvo.net/videvo_files/video/free/2014-05/large_watermarked/Futuristic_3D_Numbers_Countdown_Seconds__Videvo_preview.mp4",
                    video_length: 61
                }
            }
        },
        methods: {
            loadMoreVideos(){
                if(this.pageNumber < this.totalPages){
                    this.pageNumber += 1
                    this.videoCount += 10
                }
            }
        }
    }
</script>