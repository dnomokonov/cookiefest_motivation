import { createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Rating from '../views/Rating.vue'
import Login from '../views/Login.vue'
import Singup from '../views/Singup.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/rating',
        name: 'rating',
        component: Rating,
    },
    {
        path: '/auth/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/auth/singup',
        name: 'singup',
        component: Singup,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
}) 

export default router;