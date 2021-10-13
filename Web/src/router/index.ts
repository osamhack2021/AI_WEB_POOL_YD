import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LandingPage from "@/pages/landing/LandingPage.vue";
import LandingLoginView from "@/pages/landing/LandingLoginView.vue";
import LandingRegisterView from "@/pages/landing/LandingRegisterView.vue";
import MyPage from "@/pages/account/MyPage.vue";
import PostViewPage from "@/pages/post/PostViewPage.vue";
import PostComposerPage from "@/pages/post/PostComposerPage.vue";
import MainFeedPage from "@/pages/feed/MainFeedPage.vue";
import DiscoverPage from "@/pages/feed/DiscoverPage.vue";
import PoolPage from "@/pages/pool/PoolPage.vue";
import PoolFeedPage from "@/pages/pool/PoolFeedPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
    meta: {
      appBarHide: true,
    },
    children: [
      {
        path: "",
        name: "landing-login",
        component: LandingLoginView,
        meta: {
          appBarHide: true,
        },
      },
      {
        path: "/register",
        name: "landing-register",
        component: LandingRegisterView,
        meta: {
          appBarHide: true,
        },
      },
    ],
  },

  /* Feed related routes */
  {
    path: "/feed",
    name: "feed",
    component: MainFeedPage,
  },
  {
    path: "/discover",
    name: "discover",
    component: DiscoverPage,
  },

  /* Account related routes */
  {
    path: "/me",
    name: "mypage",
    component: MyPage,
    meta: {
      appBarElevateOnScroll: true,
    },
  },
  {
    path: "/me/:id",
    name: "mypage-id",
    component: MyPage,
    meta: {
      appBarElevateOnScroll: true,
    },
  },

  /* Article related routes */
  {
    path: "/post/:id",
    name: "post-id",
    component: PostViewPage,
  },

  {
    path: "/composer",
    name: "Create post page",
    component: PostComposerPage,
  },

  /* "POOL" related routes */
  {
    path: "/pool",
    name: "pool",
    component: PoolFeedPage,
  },
  {
    path: "/pool/:id",
    name: "pool-id",
    component: PoolPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
