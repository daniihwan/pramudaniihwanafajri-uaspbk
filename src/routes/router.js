import { createRouter, createWebHistory } from "vue-router";
import Menu from "@/views/Menu.vue";
import Laporan from "@/views/Laporan.vue";
import Pesanan from "@/views/Pesanan.vue";
import Keranjang from "@/views/Keranjang.vue";

const routes = [
    {path: '/', name: 'menu', component: Menu},
    {path: '/laporan', name:'laporan', component: Laporan},
    {path: '/pesanan', name:'pesanan', component: Pesanan},
    {path: '/keranjang', name:'keranjang', component: Keranjang}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;