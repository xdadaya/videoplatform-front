<template>
    <div class="h-fit p-2 m-4 md:m-10 rounded-lg bg-gray-500 gap-4 grid grid-cols-1 lg:grid-cols-2">
        <div>
            <video class="rounded-lg w-full" controls="controls" :poster="testVideo.first_frame_url">
                <source :src="testVideo.video_url">
            </video>
        </div>
        <div>
            <div class="flex justify-between">
                <h1 class="text-lg font-bold">{{ testVideo.title }} {{ testVideo.id }}</h1>
                <p>Two days ago</p>
            </div>
            <p>{{ testVideo.description }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                testVideo: {
                    id: this.$route.params.id,
                    title: "Test video title",
                    description: "Vestibulum ut venenatis massa, nec porta odio. Donec sit amet nisi quis nunc congue imperdiet et id risus. Donec cursus diam vel libero aliquet dignissim. Pellentesque efficitur gravida tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse sollicitudin sagittis vulputate. Cras porttitor dui est, at vulputate ex dictum vel. Phasellus consequat est non augue blandit, nec suscipit ex iaculis.",
                    first_frame_url: "https://www.learntotrade.com.ph/assets-lttph/uploads/2016/04/video-preview-pic.jpg",
                    video_url: "https://joy1.videvo.net/videvo_files/video/free/2014-05/large_watermarked/Futuristic_3D_Numbers_Countdown_Seconds__Videvo_preview.mp4",
                    video_length: 61
                }
            }
        },
    }
</script>