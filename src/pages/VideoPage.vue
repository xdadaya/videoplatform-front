<template>
    <div class="p-2 m-4 md:m-10">
        <custom-dialog  v-model:isVisible="dialogVisible">
            <CommentForm @closeDialog="closeDialog" @addComment="insertComment" :videoId="videoData.id" />
        </custom-dialog>

        <VideoOnPage :video="videoData" v-if="videoDataLoaded" />
        <custom-spinner v-else />

        <custom-button @click="showDialog">Add comment</custom-button>
        <CommentsOnVideoPage v-if="commentsDataLoaded" :comments="commentsData" @commentIntersection="loadCommentsData" @deleteComment="deleteComment" @updateComment="updateComment" />
        <custom-spinner v-else />
    </div>
</template>

<script>
    import VideoOnPage from '@/components/VideoOnPage.vue'
    import CommentsOnVideoPage from '@/components/CommentsOnVideoPage.vue'
    import CommentForm from '@/components/CommentForm.vue'
    import videosAxios from '@/axios/videosAxios'
    import { useToast } from "vue-toastification"

    const toast = useToast()
    
    export default {
        components:{
            VideoOnPage,
            CommentsOnVideoPage,
            CommentForm
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
                dialogVisible: false,
            }
        },
        methods:{
            showDialog(){
                this.dialogVisible = true
            },
            closeDialog(){
                this.dialogVisible = false
            },
            insertComment(comment){
                this.commentsData = [comment, ...this.commentsData]
            },
            deleteComment(commentId){
                this.commentsData = this.commentsData.filter(comment => comment.id !== commentId)
            },
            updateComment(comment){
                const temp = [...this.commentsData]
                this.commentsData = [...temp.map(elem => (elem.id===comment.id) ? comment : elem)]
            },
            async loadVideoData(){
                try{
                    const response = await videosAxios.get(`videos/${this.videoData.id}`)
                    this.videoData = response.data
                } catch(e){
                    toast.error("Error loading video data")
                } finally {
                    this.videoDataLoaded = true
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