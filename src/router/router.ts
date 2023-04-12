import MainPage from '@/pages/MainPage.vue'
import VideoPage from '@/pages/VideoPage.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/video/:id',
        component: VideoPage
    },
]

const router = createRouter({routes, history: createWebHistory()})

export default router