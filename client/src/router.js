import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

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
                    component: () => import('./views/SingleImage.vue'),
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
                is_admin: true,
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath},
            })
        } else {
            const user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.isAdmin) {
                    next()
                } else {
                    next({name: 'userboard'})
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({name: 'userboard'})
        }
    } else {
        next()
    }
})

export default router;
