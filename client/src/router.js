import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            // this generates a separate chunk (about.[hash].js) for this route
            name: 'about',
            // route level code-splitting
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/About.vue')
        },
        {
            path: '/gallery',
            component: () => import('./views/BaseGallery.vue'),
            children: [
                {
                    path: '',
                    component: () => import('./views/Gallery.vue')
                },
                {
                    path: ':id',
                    component: () => import('./views/SingleImage.vue'),
                }
            ],
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('./views/Blog.vue')
        },
        {
            path: '/newsletter',
            name: 'asd',
            component: () => import('./views/Newsletter.vue')
        }
    ]
})
