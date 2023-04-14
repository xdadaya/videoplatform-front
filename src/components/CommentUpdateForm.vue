<template>
    <form class="flex flex-col mb-8 max-w-lg mx-auto mt-8" @submit.prevent="updateComment">
        <h4 class="text-center text-3xl font-bold"> Update comment </h4>
        <div class="my-8">
            <custom-input type="text" v-focus v-model="newText" placeholder="Comment text" />
        </div>
        <custom-button type="submit" v-if="!processingRequest"> Update </custom-button>
        <custom-button v-else disabled><custom-spinner class="w-5 h-5"/></custom-button>
    </form>
</template>

<script>
    import { useToast } from 'vue-toastification'
    import videosAxios from '@/axios/videosAxios'

    const toast = useToast()

    export default {
        data(){
            return{
                newText: this.commentText
            }
        },
        props:{
            commentId:{
                type: String,
                required: true,
            },
            commentText:{
                type: String,
                required: true,
            }
        },
        methods:{
            async updateComment(){
                try{
                    this.processingRequest = true
                    const response = await videosAxios.put(`comments/${this.commentId}/`, {text: this.newText})
                    this.$emit('updateComment', response.data)
                    this.$emit('closeDialog')
                } catch(e){
                    toast.error(e.response.data.detail)
                } finally{
                    this.processingRequest = false
                }
            }
        }
    }
</script>