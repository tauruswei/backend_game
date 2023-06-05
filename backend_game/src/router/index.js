import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import LayoutUser from "@/components/layout-user.vue";
import Login from "../components/login.vue";
import Notfound from "@/components/404";
import adminDash from "@/views/admin/dashboard.vue";
import userDash from "@/views/user/dashboard.vue";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录",
      route: "/login",
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/register.vue"),
    meta: {
      title: "注册",
      route: "/register",
    }
  },
  {
    path: "/password",
    name: "password",
    component: () => import("../components/password.vue"),
    meta: {
      title: "修改密码",
      route: "/password",
    }
  },
  {
    path: "/404",
    name: "404",
    component: Notfound,
    meta: {
      title: "找不到页面",
      route: "/404",
    }
  },
  {
    path: "/plat",
    component: LayoutUser,
    redirect: "/plat/dashboard",
    meta: {
      permission: "admin",
      title: "页面",
      name: "home",
      requireAuth: false,
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: (store.state.role == 0 ? adminDash : userDash),
        meta: {
          route: "/plat/dashboard",
          permission: (store.state.role == 0 ? "admin" : "user"),
          title: "dashboard",
          name: "dashboard",
          requireAuth: true,
        },
      }, {
        path: "staking-rewards",
        name: "staking-rewards",
        component: () => import("../views/admin/staking-rewards.vue"),
        meta: {
          route: "/plat/staking-rewards",
          permission: "admin",
          title: "staking-rewards",
          name: "staking-rewards",
          requireAuth: true,
        },
      }, {
        path: "promotion-rewards",
        name: "promotion-rewards",
        component: () => import("../views/admin/promotion-rewards.vue"),
        meta: {
          route: "/plat/promotion-rewards",
          permission: "admin",
          title: "promotion-rewards",
          name: "promotion-rewards",
          requireAuth: true,
        },
      }, {
        path: "logs",
        name: "logs",
        component: () => import("../views/admin/logs.vue"),
        meta: {
          route: "/plat/logs",
          permission: "admin",
          title: "logs",
          name: "logs",
          requireAuth: true,
        },
      }, {
        path: "blog",
        name: "blog",
        component: () => import("../views/admin/blog.vue"),
        meta: {
          route: "/plat/blog",
          permission: "admin",
          title: "blog",
          name: "blog",
          requireAuth: true,
        },
      }, {
        path: "nfts",
        name: "nfts",
        component: () => import("../views/user/nfts.vue"),
        meta: {
          route: "/plat/nfts",
          permission: "user",
          title: "nfts",
          name: "nfts",
          requireAuth: true,
        },
      }, {
        path: "staking",
        name: "staking",
        component: () => import("../views/user/staking.vue"),
        meta: {
          route: "/plat/staking",
          permission: "user",
          title: "staking",
          name: "staking",
          requireAuth: true,
        },
      }
    ],
  },
  {
    path: "/channel",
    name: "channel",
    component: () => import("../views/user/channel.vue"),
    meta: {
      route: "/channel",
      permission: "user",
      title: "channel",
      name: "channel",
      requireAuth: false,
    },
  },
  {
    path: "/setting",
    component: LayoutUser,
    redirect: "/setting/profile",
    meta: {
      permission: "admin",
      title: "setting",
      name: "setting",
      requireAuth: false,
    },
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/setting/profile.vue"),
        meta: {
          route: "/setting/profile",
          permission: "admin",
          title: "profile",
          name: "profile",
          requireAuth: true,
        },
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    //匹配前往的路由不存在
    from.name
      ? next({
        name: from.name,
      })
      : next("/404"); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  } else {
    document.title = to.meta.title;
    //进入登录页面的时候清除 token
    if (to.path == "/login"|| to.path == "/register") {
      store.commit("setUser", null);
      store.commit("setRole", null);
      store.commit("removeToken", "");
      store.commit("clearRequestToken");
      store.commit("setMetaMask", null);
      sessionStorage.clear();
    }
    if (to.meta.requireAuth) {
      next();
      // 判断该路由是否需要登录权限
      if (store.state.token !== "" && store.state.token !== null) {
          next();
      } else {
        next({
          path: "/login",
        });
      }
    } else {
      next();
    }
  }
});

export default router;
