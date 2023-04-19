<template>
    <div class="mx-auto justify-center items-center w-fit my-10">
        <div class="p-5" v-if="statsLoaded && userLoaded" >
            <h1 class="text-3xl mx-auto w-fit font-bold">{{ this.username }}</h1>
            <div class="my-5">
                <p> Total comments: {{ this.commentsAmount }} </p>
                <p> Average comments rating: {{ this.avgRating }} </p>
                <p> Average length of comments: {{ this.avgTextLength }} </p>
                <p> Average comments per video: {{ this.avgCommentsPerVideo }} </p>
            </div>
        </div>
        <UserSkeleton v-else />
    </div>
    
</template>

<script>
    import statsAxios from '@/axios/statsAxios'
    import usersAxios from '@/axios/usersAxios'
    import { errorHandler } from '@/axios/toastHandler.ts'
    import UserSkeleton from '@/components/Skeletons/UserSkeleton.vue'

    export default {
        data(){
            return{
                userData:{
                    userId: this.$route.params.id,
                },
                statsLoaded: false,
                userLoaded: false,
            }
        },
        components:{
            UserSkeleton
        },
        methods:{
            async fetchUserData(){
                try{
                    const response = await usersAxios.get(`users/user/${this.userData.userId}`)
                    this.username = response.data.username
                    this.userLoaded = true
                } catch(e){
                    errorHandler(e)
                }
            },
            async fetchUserStatistics(){
                try{
                    const response = await statsAxios.get(`stats/${this.userData.userId}`)
                    this.avgCommentsPerVideo = response.data.avg_comments_per_video
                    this.avgRating = response.data.avg_rating
                    this.avgTextLength = response.data.avg_text_length
                    this.commentsAmount = response.data.comments_amount
                    this.statsLoaded = true
                } catch(e){
                    errorHandler(e)
                }
            }
        },
        mounted(){
            this.fetchUserStatistics()
            this.fetchUserData()
        }
    }
</script>