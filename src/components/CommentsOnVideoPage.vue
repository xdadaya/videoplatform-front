<template>
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
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
        methods:{
            loadMoreComments(){
                this.$emit('loadComments')
            }
        }
    }
</script>