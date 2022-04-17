export const routes = [
    {
        path: "/",
        redirect: "/findmusic"
    },

    {
        path: "/findmusic",
        component: () => import("../views/Findmusic/findMusic.vue"),
        children: [
            {
                path: "/findmusic",
                redirect: "/findmusic/discover"
            },
            {
                path: "/findmusic/discover",
                component: () => import("../views/Findmusic/views/discover/discover.vue")
            },
            {
                path: "/playlist/:id",
                component: () => import("../components/common/playlist/playlist.vue")
            },
        ]
    },
    {
        path: "/mymusic",
        component: () => import("../views/mymusic/mymusic.vue")
    },
    {
        path: "/myfocus",
        component: () => import("../views/myfocus/myfocus.vue")
    },
    {
        path: "/shop",
        component: () => import("../views/shop/shop.vue")
    },
    {
        path: "/musicmaker",
        component: () => import("../views/musicMaker/musicmaker.vue")
    },
    {
        path: "/downloadapp",
        component: () => import("../views/DownloadAPP/downloadapp.vue")
    },

];