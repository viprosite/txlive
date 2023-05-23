import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/layoutIndex.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layoutHome",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/homeView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
