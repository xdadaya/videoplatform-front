<template>
    <div class="p-2 m-4 md:m-10">
        <VideoOnPage :video="videoData" v-if="videoDataLoaded" />
        <custom-spinner v-else />

        <CommentsOnVideoPage v-if="commentsDataLoaded" :comments="commentsData" @loadMoreComments="loadMoreComments"/>
        <custom-spinner v-else />
    </div>
</template>

<script>
    import VideoOnPage from '@/components/VideoOnPage.vue'
    import CommentsOnVideoPage from '@/components/CommentsOnVideoPage.vue'
    import videosAxios from '@/axios/videosAxios'
    import { useToast } from "vue-toastification"

    const toast = useToast()
    
    export default {
        components:{
            VideoOnPage,
            CommentsOnVideoPage
        },
        data(){
            return{
                videoData: {
                    id: this.$route.params.id,
                },
                videoDataLoaded: false,
                commentsData: [],
                commentsPage: 1,
                commentsTotalPages: 1,
                commentsDataLoaded: false,
            }
        },
        methods:{
            async loadVideoData(){
                try{
                    const response = await videosAxios.get(`videos/${this.videoData.id}`)
                    this.videoData = response.data
                    this.videoDataLoaded = true
                } catch(e){
                    toast.error("Error loading video data")
                }
            },
            async loadCommentsData(){
                try{
                    if(this.commentsPage <= this.commentsTotalPages){
                        const response = await videosAxios.get(`videos/${this.videoData.id}/comments?page=${this.commentsPage}`)
                        this.commentsTotalPages = response.data.total_pages
                        this.commentsPage++
                        this.commentsData = [...this.commentsData, ...response.data.items]
                    }
                    
                } catch(e){
                    toast.error("Error loading comments data")
                } finally {
                    this.commentsDataLoaded = true
                }
            }
        },
        mounted(){
            this.loadVideoData()
            this.loadCommentsData()
        }
    }
</script>