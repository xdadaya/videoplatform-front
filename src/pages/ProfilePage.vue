<template>
    <custom-dialog v-model:isVisible="dialogVisible">
        <UserUpdateForm @closeDialog="closeDialog" :username="username" @updateUsername="updateUsername"/>
    </custom-dialog>
    <div class="mx-auto justify-center items-center w-fit my-10">
        <div class="p-5" v-if="statsLoaded && userLoaded" >
            <div v-if="userData.userId === $store.state.auth.userId" class="w-full flex flex-row-reverse gap-4">
                <span @click="deleteUser" class="decoration-dashed cursor-pointer">Delete</span>
                <span @click="showDialog" class="decoration-dashed cursor-pointer">Update</span>
            </div>
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
    import { mapActions } from 'vuex'
    import UserUpdateForm from '@/components/UserUpdateForm.vue'
    export default {
        data(){
            return{
                userData:{
                    userId: this.$route.params.id,
                },
                statsLoaded: false,
                userLoaded: false,
                dialogVisible: false
            }
        },
        components:{
            UserSkeleton,
            UserUpdateForm
        },
        methods:{
            showDialog(){
                this.dialogVisible = true
            },
            closeDialog(){
                this.dialogVisible = false
            },
            updateUsername(user){
                this.username = user.username
            },
            ...mapActions({
                logout: 'auth/logout'
            }),
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
            },
            async deleteUser(){
                try{
                    const response = await usersAxios.delete(`users/me`)
                    this.logout()
                } catch(e){
                    errorHandler(e)
                }
            }
        },
        mounted(){
            if(this.userData.userId==="null") this.$router.push('/404')
            else{
                this.fetchUserStatistics()
                this.fetchUserData()
            }
        }
    }
</script>