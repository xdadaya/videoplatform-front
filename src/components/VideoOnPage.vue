<template>
    <div class="inset-0 z-20 bg-black/50 fixed flex" v-if="spinnerVisible" >
        <custom-spinner/>
    </div>
    <custom-dialog v-model:isVisible="dialogVisible">
        <VideoUpdateForm @closeDialog="closeDialog" @updateVideo="updateVideo" :videoId="video.id" :title="video.title" :description="video.description"  :category="video.category" />
    </custom-dialog>
    <div class="h-fit rounded-lg gap-4 flex flex-col xl:flex-row">
        <div class="w-full xl:w-4/5">
            <video class="rounded-lg w-full focus:outline-none" controls="controls" :poster="video.first_frame_url">
                <source :src="video.video_url">
            </video>
        </div>
        <div class="flex flex-col w-full xl:w-1/5">
            <div class="flex flex-row-reverse gap-5" v-if="this.$store.state.auth.userId === video.owner.id">
                <span @click="deleteVideo" class="decoration-dashed cursor-pointer" title="Delete video"> <v-icon name="fa-trash-alt" /> </span>
                <span @click="showDialog" class="decoration-dashed cursor-pointer" title="Update video data"> <v-icon name="bi-pencil-square" /> </span>
            </div>
            <div class="flex justify-between">
                <h1 class="text-2xl font-bold">{{ video.title }}</h1>
                <h1>{{ prettyDate(video.created_at) }}</h1>
            </div>
            <div>Author's page: <span @click="$router.push(`/profile/${video.owner.id}`)" class="text-blue-600 hover:underline cursor-pointer font-bold text-xl">{{ video.owner.username }}</span></div>
            <p>{{ video.description }}</p>
        </div>
    </div>
</template>

<script>
    import videosAxios from '@/axios/videosAxios'
    import VideoUpdateForm from '@/components/VideoUpdateForm.vue'
    import { errorHandler } from '@/axios/toastHandler.ts'

    export default {
        components:{
            VideoUpdateForm
        },
        data(){
            return{
                spinnerVisible: false,
                dialogVisible: false,
            }
        },
        props:{
            video: {
                type: Object,
                required: true
            }
        },
        methods: {
            showDialog(){
                this.dialogVisible = true
            },
            closeDialog(){
                this.dialogVisible = false
            },
            updateVideo(newVideo){
                this.$emit('updateVideo', newVideo)
            },
            prettyDate(dateString){
                console.log(dateString)
                const date = new Date(dateString);
                const now = new Date();
                const diffInSeconds = Math.floor((now - date) / 1000);

                if (diffInSeconds < 60) {
                    return diffInSeconds + ' seconds ago';
                } else if (diffInSeconds < 3600) {
                    const diffInMinutes = Math.floor(diffInSeconds / 60);
                    return diffInMinutes + ' minutes ago';
                } else if (diffInSeconds < 86400) {
                    const diffInHours = Math.floor(diffInSeconds / 3600);
                    return diffInHours + ' hours ago';
                } else {
                    const diffInDays = Math.floor(diffInSeconds / 86400);
                    return diffInDays + ' days ago';
                }
            },
            async deleteVideo(){
                try{
                    this.spinnerVisible = true
                    await videosAxios.delete(`videos/${this.video.id}/`)
                    this.spinnerVisible = false
                    this.$router.push("/")
                } catch(e) {
                    this.spinnerVisible = false
                    errorHandler(e)
                }
            }
        }
    }
</script>