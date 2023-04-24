<template>
    <custom-dialog  v-model:isVisible="dialogVisible">
        <CommentUpdateForm @closeDialog="closeDialog" @updateComment="updateComment" :commentId="comment.id" :commentText="comment.text" />
    </custom-dialog>
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
        <div class="w-full">
            <div v-if="isCommentOwner" class="w-full flex flex-row-reverse gap-4">
                <span @click="deleteComment" class="decoration-dashed cursor-pointer" title="Delete comment"> <v-icon name="fa-trash-alt" /> </span>
                <span @click="showDialog" class="decoration-dashed cursor-pointer" title="Update comment text"> <v-icon name="bi-pencil-square" /> </span>
            </div>
            <div>
                <div class="flex justify-between items-center">
                    <span @click="$router.push(`/profile/${comment.owner.id}`)" class="text-blue-500 hover:underline cursor-pointer">{{ comment.owner.username }}</span>
                    <span> {{ prettyDate(comment.created_at) }}</span>
                </div>
                {{ comment.text }}
            </div>
        </div>
    </div>
</template>

<script>
    import CommentUpdateForm from '@/components/CommentUpdateForm.vue'
    import videosAxios from '@/axios/videosAxios'
    import { errorHandler } from '@/axios/toastHandler.ts'
    import { mapState } from 'vuex'

    export default {
        components:{
            CommentUpdateForm
        },
        data(){
            return{
                dialogVisible: false
            }
        },
        props:{
            comment:{
                type: Object,
                required: true
            }
        },
        emits:["deleteComment", "updateComment"],
        computed: {
            isCommentOwner(){
                return this.comment.owner.id === this.userId
            },
            ...mapState({   
                userId: state => state.auth.userId,
                accessToken: state => state.auth.accessToken
            })
        },
        methods:{
            showDialog(){
                this.dialogVisible = true
            },
            closeDialog(){
                this.dialogVisible = false
            },
            updateComment(comment){
                this.$emit('updateComment', comment)
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
            async deleteComment(){
                try{
                    await videosAxios.delete(`comments/${this.comment.id}`)
                    this.$emit('deleteComment', this.comment.id)
                } catch(e) {
                    errorHandler(e)
                }
            },
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
                    errorHandler(e)
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
                    errorHandler(e)
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
                    errorHandler(e)
                }
            }
        }
    }
</script>