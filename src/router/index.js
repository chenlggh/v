import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/book",
        name: "book",
        component: () => import("@/views/IndexView.vue"),
    },
    {
        path: '/',
        name: 'login',
        component: () => import("@/views/LoginView.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("@/views/RegisterView.vue")
    }
]

const router = new VueRouter({
    routes
})

export default router
