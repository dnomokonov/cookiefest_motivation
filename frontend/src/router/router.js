import { createRouter, createWebHistory} from 'vue-router'
import home from '../views/Home.vue'
import profile from '../views/Profile.vue'
import rating from '../views/Rating.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile,
    },
    {
        path: '/rating',
        name: 'rating',
        component: rating,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
}) 

export default router;