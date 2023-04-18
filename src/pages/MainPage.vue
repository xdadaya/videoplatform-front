<template>
    <custom-dialog v-model:isVisible="dialogVisible">
        <VideoForm @closeDialog="closeDialog" />
    </custom-dialog>
    <div class="flex justify-center items-center my-5">
        <custom-button @click="showDialog" :disabled="!$store.state.auth.isAuth">
            Post video
        </custom-button>
    </div>
    <VideoList />
</template>

<script>
    import VideoList from '@/components/VideoList.vue'
    import VideoForm from '@/components/VideoForm.vue'
    export default {
        data(){
            return{
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
        },
        components: {
            VideoList,
            VideoForm
        },
    }
</script>