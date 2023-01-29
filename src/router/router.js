import { createRouter, createWebHistory } from "vue-router"
import MainPage from "@/pages/MainPage";
import usersPosts from "@/pages/usersPosts";
// import ourWorks from "@/pages/ourWorks.vue";
import ourWorksWithX from "@/pages/ourWorksWithX";
import reportDoc_uuid from "@/pages/reportDoc_uuid";
import AuthPage from "@/pages/AuthPage";
import myAccount from "@/pages/myAccount";

const routes =  [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/reports',
        component: ourWorksWithX
    },
    {
        path: '/works',
        component: usersPosts
    },
    {
        path: '/reports/:id',
        component: reportDoc_uuid
    },
    // {
    //     path: '/store',
    //     component: ourWorksWithX
    // },
    {
        path: '/auth',
        component: AuthPage
    },
    {
        path: '/:id',
        component: myAccount
    },
    
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;