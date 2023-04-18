<template>
    <div class="inset-0 z-20 bg-black/50 fixed flex" v-if="spinnerVisible" >
        <custom-spinner/>
    </div>
    <custom-dialog v-model:isVisible="dialogVisible">
        <VideoUpdateForm @closeDialog="closeDialog" @updateVideo="updateVideo" :videoId="video.id" :title="video.title" :description="video.description"  :category="video.category" />
    </custom-dialog>
    <div class="h-fit rounded-lg bg-gray-500 gap-4 grid grid-cols-1 lg:grid-cols-2">
        <div>
            <video class="rounded-l-lg w-full focus:outline-none" controls="controls" :poster="video.first_frame_url">
                <source :src="video.video_url">
            </video>
        </div>
        <div class="flex flex-col">
            <div class="flex flex-row-reverse gap-5" v-if="this.$store.state.auth.userId === video.owner.id">
                <span @click="deleteVideo" class="decoration-dashed cursor-pointer">Delete</span>
                <span @click="showDialog" class="decoration-dashed cursor-pointer">Update</span>
            </div>
            <div class="flex justify-between">
                <h1 class="text-xl font-bold">{{ video.title }}</h1>
                <h1>{{ video.created_at }}</h1>
            </div>
            <p @click="$router.push(`/profile/${video.owner.id}`)" class="text-blue-600 hover:underline cursor-pointer font-bold text-xl">
                {{ video.owner.username }}
            </p>
            <p>{{ video.description }}</p>
        </div>
    </div>
</template>

<script>
    import videosAxios from '@/axios/videosAxios'
    import { useToast } from "vue-toastification"
    import VideoUpdateForm from '@/components/VideoUpdateForm.vue'
    const toast = useToast()

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
            async deleteVideo(){
                try{
                    this.spinnerVisible = true
                    await videosAxios.delete(`videos/${this.video.id}/`)
                    this.spinnerVisible = false
                    toast.success("Video was successfully deleted")
                    this.$router.push("/")
                } catch(e) {
                    this.spinnerVisible = false
                    console.log(e)
                }
            }
        }
    }
</script>