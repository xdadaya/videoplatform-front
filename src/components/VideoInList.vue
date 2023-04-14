<template>
    <div class="flex flex-col gap-2 h-64 bg-gray-100 rounded-lg pb-2 shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl">
        <div @click="$router.push(`/video/${video.id}`)" class="rounded-t-lg h-40 w-full bg-cover bg-center" :style="{backgroundImage: 'url('+video.first_frame_url+')'}">
            <span class=" bg-gray-900 text-white rounded-lg m-1 px-1 py-0.5 text-sm bottom-0 right-0 float-right">
                {{ videoLength }}
            </span>
        </div>
        <div class="flex flex-col mx-2 h-fit">
            <span class="text-md font-bold">{{ video.title }}</span>
            <span class="text-xs text-gray-500">{{ videoDescription }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            video: {
                type: Object,
                default: false
            }
        },
        computed: {
            videoLength(){
                let minutes = Math.floor(this.video.video_length / 60)
                let seconds = this.video.video_length - minutes * 60

                minutes = minutes < 10 ? "0" + minutes : minutes
                seconds = seconds < 10 ? "0" + seconds : seconds

                return `${minutes}:${seconds}`
            },
            videoDescription(){
                return (this.video.description.length > 160) ? this.video.description.slice(0, 160) + "..." : this.video.description
            },
        },
    }
</script>