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
        component: () => import("@/views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/live",
    name: "live",
    component: Layout,
    redirect: "/live/list",
    children: [
      {
        path: "list",
        name: "liveList",
        component: () => import("@/views/live/liveList.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
