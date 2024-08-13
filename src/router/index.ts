import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/file-upload',
            name: 'fileUpload',
            component: () => import('../views/FileUpload.vue'),
        },
        {
            path: '/drag-drop',
            name: 'dragDrop',
            component: () => import('../views/DragDrop.vue'),
        },
    ],
})

export default router
