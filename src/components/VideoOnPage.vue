<template>
    <div class="h-fit rounded-lg bg-gray-500 gap-4 grid grid-cols-1 lg:grid-cols-2">
        <div>
            <video class="rounded-l-lg w-full focus:outline-none" controls="controls" :poster="video.first_frame_url">
                <source :src="video.video_url">
            </video>
        </div>
        <div>
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
    export default {
        props:{
            video: {
                type: Object,
                required: true
            }
        }
    }
</script>