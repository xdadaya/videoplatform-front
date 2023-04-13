<template>
    <div class="flex flex-col md:flex-row gap-2 p-4 rounded-lg bg-gray-200 shadow-lg my-2 items-center">
        <div class="w-12 flex justify-center items-center flex-row md:flex-col gap-2">
            <span class="cursor-pointer">
                <v-icon name="md-thumbupalt-round" fill="green" v-if="comment.liked" title="Remove reaction" />
                <v-icon name="md-thumbupalt-outlined" fill="green" v-else title="Like" />
            </span>
            <span class="font-bold">{{ comment.rating }}</span>
            <span class="cursor-pointer">
                <v-icon name="md-thumbdownalt-round" fill="red" v-if="comment.disliked" title="Remove reaction" />
                <v-icon name="md-thumbdownalt-outlined" fill="red" v-else title="Dislike" />
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
    export default {
        props:{
            comment:{
                type: Object,
                required: true
            }
        },
    }
</script>