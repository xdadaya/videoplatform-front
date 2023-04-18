<template>
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" @deleteComment="deleteComment" @updateComment="updateComment" />
    <div v-intersection="loadMoreComments" class="h-10 bg-red-500" />
</template>

<script>
    import Comment from '@/components/Comment.vue'
    export default {
        components:{
            Comment
        },
        props:{
            comments:{
                type: Array,
                required: true
            }
        },
        emits:["commentIntersection", "deleteComment", "updateComment"],
        methods:{
            loadMoreComments(){
                this.$emit('commentIntersection')
            },
            deleteComment(commentId){
                this.$emit('deleteComment', commentId)
            },
            updateComment(comment){
                this.$emit('updateComment', comment)
            }
        }
    }
</script>

<style scoped>
.comment-list-item {
    display: inline-block;
    margin-right: 10px;
}

.comment-list-enter-active, .comment-list-leave-active {
    transition: all 0.5s ease
}

.comment-list-enter-from {
    opacity: 0;
    transform: translateY(-130px);
}

.comment-list-leave-to {
    opacity: 0;
    transform: translateY(130px);
}

.comment-list-move {
    transition: transform 0.8s ease;
}
</style>