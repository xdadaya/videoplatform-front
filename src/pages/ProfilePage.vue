<template>
    <div v-if="isLoaded" class="mx-auto justify-center items-center w-fit">
        <p> Total comments {{ this.commentsAmount }} </p>
        <p> Avg comments rating {{ this.avgRating }} </p>
        <p> Avg text length of comments {{ this.avgTextLength }} </p>
        <p> Avg comments per video {{ this.avgCommentsPerVideo }} </p>
    </div>
    <div v-else>
        <custom-spinner></custom-spinner>
    </div>
</template>

<script>
    import statsAxios from '@/axios/statsAxios'
    import { useToast } from 'vue-toastification'
    export default {
        data(){
            return{
                userData:{
                    userId: this.$route.params.id,
                    commentsAmount: 0,
                    avgRating: 0,
                    avgTextLength: 0,
                    avgCommentsPerVideo: 0,
                },
                isLoaded: false
            }
        },
        methods:{
            async fetchUserData(){
                try{
                    const response = await statsAxios.get(`stats/${this.userData.userId}`)
                    this.avgCommentsPerVideo = response.data.avg_comments_per_video
                    this.avgRating = response.data.avg_rating
                    this.avgTextLength = response.data.avg_text_length
                    this.commentsAmount = response.data.comments_amount
                    this.isLoaded = true
                } catch(e){
                    const toast = useToast()
                    toast.error("Error loading user data")
                }
            }
        },
        mounted(){
            this.fetchUserData()
        }
    }
</script>