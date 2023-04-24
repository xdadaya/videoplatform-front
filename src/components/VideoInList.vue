<template>
    <div class="flex flex-col gap-2 h-64 bg-gray-100 rounded-lg pb-2 shadow-lg hover:scale-105 hover:shadow-xl">
        <div @click="$router.push(`/video/${video.id}`)" class="rounded-t-lg h-40 w-full bg-cover bg-center cursor-pointer" :style="{backgroundImage: 'url('+video.first_frame_url+')'}">
            <span class=" bg-gray-900 text-white rounded-lg m-1 px-1 py-0.5 text-sm bottom-0 right-0 float-right">
                {{ videoLength }}
            </span>
        </div>
        <div class="flex flex-col mx-2 h-fit">
            <div class="flex justify-between items-center flex-row">
                <span class="text-md font-bold">{{ video.title }}</span>
                <span>{{ prettyDate(video.created_at) }}</span>
            </div>
            <span class="text-xs text-gray-500 hover:underline cursor-pointer">{{ video.owner.username }}</span>
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
        methods: {
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
        },
    }
</script>