<template>
    <div class="flex flex-col md:flex-row gap-2 p-4 rounded-lg bg-gray-200 shadow-lg my-2 items-center">
        <div class="w-12 flex justify-center items-center flex-row md:flex-col gap-2">
            <span class="cursor-pointer">
                <v-icon name="md-thumbupalt-round" @click="unlike" fill="green" v-if="comment.liked" title="Remove reaction" />
                <v-icon name="md-thumbupalt-outlined" @click="like" fill="green" v-else title="Like" />
            </span>
            <span class="font-bold">{{ comment.rating }}</span>
            <span class="cursor-pointer">
                <v-icon name="md-thumbdownalt-round" @click="unlike" fill="red" v-if="comment.disliked" title="Remove reaction" />
                <v-icon name="md-thumbdownalt-outlined" @click="dislike" fill="red" v-else title="Dislike" />
            </span>
        </div>
        <div>
            <p @click="$router.push(`/profile/${comment.owner_id}`)" class="text-blue-500 hover:underline cursor-pointer">
                Author
            </p>
            {{ comment.text }}
        </div>
    </div>
</template>

<script>
    import videosAxios from '@/axios/videosAxios'
    import { useToast } from "vue-toastification"
    import { mapState } from 'vuex'

    const toast = useToast()
    export default {
        props:{
            comment:{
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapState({
                accessToken: state => state.auth.accessToken
            })
        },
        methods:{
            async like(){
                try{
                    const response = await videosAxios.post(`comments/${this.comment.id}/like/`)
                    this.comment.liked = true
                    this.comment.rating += 1
                    if (this.comment.disliked){
                        this.comment.rating += 1
                        this.comment.disliked = false
                    }
                } catch(e){
                    toast.error(e.response.data.detail)
                }
            },
            async dislike(){
                try{
                    const response = await videosAxios.post(`comments/${this.comment.id}/dislike/`)
                    this.comment.disliked = true
                    this.comment.rating -= 1
                    if (this.comment.liked){
                        this.comment.rating -= 1
                        this.comment.liked = false
                    }
                } catch(e){
                    toast.error(e.response.data.detail)
                }
            },
            async unlike(){
                try{
                    const response = await videosAxios.delete(`comments/${this.comment.id}/unlike/`)
                    if(this.comment.liked){
                        this.comment.liked = false
                        this.comment.rating -= 1
                    }
                    if(this.comment.disliked){
                        this.comment.disliked = false
                        this.comment.rating += 1
                    }
                } catch(e){
                    toast.error(e.response.data.detail)
                }
            }
        }
    }
</script>