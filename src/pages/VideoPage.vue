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
    import axios from 'axios'
    import { useToast } from "vue-toastification"

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
                commentsData: [
                    {
                        text: "Test this comment width and flexibility. ".repeat(20),
                        owner_id: "asdasd-ad-asd-a-das-d", 
                        rating: 2,
                        liked: true, 
                        dislike: false
                    }
                ],
                //commentsData: [],
                commentsPage: 1,
                commentsTotalPages: 1,
                commentsDataLoaded: false,
            }
        },
        methods:{
            async loadVideoData(){
                try{
                    const response = await axios.get(`http://localhost:5100/api/v1/videos/${this.videoData.id}`)
                    this.videoData = response.data
                    this.videoDataLoaded = true
                } catch(e){
                    const toast = useToast()
                    console.log(e)
                    if(e.code === "ERR_NETWORK") toast.error("Server is unavailable")
                }
            },
            async loadCommentsData(){
                try{
                    if(this.commentsPage <= this.commentsTotalPages){
                        const response = await axios.get(`http://localhost:5100/api/v1/videos/${this.videoData.id}/comments?page=${this.commentsPage}`)
                        console.log(response.data.items)
                        this.commentsTotalPages = response.data.total_pages
                        this.commentsPage++
                        //this.commentsData = [...this.commentsData, ...response.data.items]
                    }
                    
                } catch(e){
                    const toast = useToast()
                    console.log(e)
                    if(e.code === "ERR_NETWORK") toast.error("Server is unavailable")
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