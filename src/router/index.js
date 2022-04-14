
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/findmusic"
    },

    {
        path: "/playlist/:id",
        component: () => import("../components/common/playlist/playlist.vue")
    },
    {
        path: "/findmusic",
        component: () => import("../views/Findmusic/findMusic.vue")
    }, {
        path: "/mymusic",
        component: () => import("../views/mymusic/mymusic.vue")
    }, {
        path: "/myfocus",
        component: () => import("../views/myfocus/myfocus.vue")
    }, {
        path: "/shop",
        component: () => import("../views/shop/shop.vue")
    }, {
        path: "/musicmaker",
        component: () => import("../views/musicMaker/musicmaker.vue")
    }, {
        path: "/downloadapp",
        component: () => import("../views/DownloadAPP/downloadapp.vue")
    },

];

const router = new VueRouter({
    routes
})


export default router;