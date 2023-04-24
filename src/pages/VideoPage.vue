<template>
    <div class="p-2 m-4 md:m-10">
        <custom-dialog v-model:isVisible="dialogVisible">
            <CommentForm @closeDialog="closeDialog" @addComment="insertComment" :videoId="videoData.id" />
        </custom-dialog>

        <VideoOnPage :video="videoData" v-if="videoDataExists" @updateVideo="updateVideo" />
        <VideoSkeleton v-else />

        <div class="flex justify-center items-center my-6 gap-40">
            <div>Sort: <custom-select v-model="selectedSort" :options="selectOptions" /></div>
            <custom-button @click="showDialog" class="px-10">Add comment</custom-button>
            
        </div>
        <CommentsOnVideoPage v-if="commentsDataExists" :comments="commentsData" @commentIntersection="loadCommentsData" @deleteComment="deleteComment" @updateComment="updateComment" />
        <div v-else> <CommentSkeleton v-for="i in 5" :key="i" /> </div>
    </div>
</template>

<script>
    import VideoOnPage from '@/components/VideoOnPage.vue'
    import VideoSkeleton from '@/components/Skeletons/VideoSkeleton.vue'
    import CommentSkeleton from '@/components/Skeletons/CommentSkeleton.vue'
    import CommentsOnVideoPage from '@/components/CommentsOnVideoPage.vue'
    import CommentForm from '@/components/CommentForm.vue'
    import videosAxios from '@/axios/videosAxios'
    import { useToast } from "vue-toastification"

    const toast = useToast()
    
    export default {
        components:{
            VideoOnPage,
            CommentsOnVideoPage,
            CommentForm,
            VideoSkeleton,
            CommentSkeleton
        },
        data(){
            return{
                videoData: {
                    id: this.$route.params.id,
                },
                videoDataExists: false,
                commentsData: [],
                commentsPage: 1,
                commentsTotalPages: 1,
                commentsDataExists: false,
                dialogVisible: false,
                selectOptions: [
                    {value: 'created_at', name: 'By creating date ascending'},
                    {value: '-created_at', name: 'By creating date descending'}
                ],
                selectedSort: 'created_at'
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
            updateVideo(newVideo){
                this.videoData = newVideo
            },
            async loadVideoData(){
                try{
                    const response = await videosAxios.get(`videos/${this.videoData.id}`)
                    this.videoData = response.data
                    this.videoDataExists = true
                } catch(e){
                    if(e.response.status == 404) this.$router.push('/404')
                    toast.error(e.response.data.detail)
                }
            },
            async loadCommentsData(){
                try{
                    if(this.commentsPage <= this.commentsTotalPages){
                        const response = await videosAxios.get(`videos/${this.videoData.id}/comments?page=${this.commentsPage}&sort=${this.selectedSort}`)
                        this.commentsTotalPages = response.data.total_pages
                        this.commentsPage++
                        this.commentsData = [...this.commentsData, ...response.data.items]
                        this.commentsDataExists = true
                    }
                } catch(e){
                    console.log(e)
                    toast.error(e.response.data.detail)
                }
            }
        },
        mounted(){
            this.loadVideoData()
            this.loadCommentsData()
        },
        watch: {
            async selectedSort(newValue) {
                this.selectedValue = newValue
                this.commentsPage = 1
                this.commentsTotalPages = 1
                this.commentsDataExists = false
                this.commentsData = []
                await this.loadCommentsData()
            },
        },
    }
</script>