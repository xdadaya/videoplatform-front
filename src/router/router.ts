import MainPage from '@/pages/MainPage.vue'
import VideoPage from '@/pages/VideoPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
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
    {
        path: '/profile/:id',
        component: ProfilePage
    },
    {
        path: '/404',
        component: NotFoundPage
    },
]

const router = createRouter({routes, history: createWebHistory()})

export default router