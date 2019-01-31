import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import postJson from './mixins/postJson'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            // this generates a separate chunk (about.[hash].js) for this route
            name: 'about',
            // route level code-splitting
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/About.vue'),
        },
        {
            path: '/gallery',
            component: () => import('./views/BaseGallery.vue'),
            children: [
                {
                    path: '',
                    component: () => import('./views/Gallery.vue'),
                },
                {
                    path: ':id',
                    component: () => import('./views/FullscreenImageView.vue'),
                },
            ],
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('./views/Blog.vue'),
        },
        {
            path: '/newsletter',
            name: 'newsletter',
            component: () => import('./views/Newsletter.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue'),
            meta: {
                guest: true,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue'),
            meta: {
                guest: true,
            },
        },
        {
            path: '/dashboard',
            name: 'userboard',
            component: () => import('./views/UserBoard.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/Admin.vue'),
            meta: {
                requiresAuth: true,
                requiresAdmin: true,
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        postJson('/authenticate', {}, false).then(({user}) => {
            const requestingAdmin = to.matched.some(record => record.meta.requiresAdmin)
            if (user) {
                router.app.$store.commit('receiveUser', user)
            }
            if (user && (!requestingAdmin || (requestingAdmin && user.isAdmin))) {
                next()
            } else if (user && requestingAdmin) {
                router.app.$root.$emit('requireAdmin')
            } else {
                next({
                    path: '/login',
                    params: {nextUrl: to.fullPath},
                })
            }
        })
    } else {
        next()
    }
})

export default router
