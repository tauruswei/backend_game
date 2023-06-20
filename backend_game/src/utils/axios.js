import axios from "axios";
import router from "../router/index";
import store from "../store/index";
import Qs from "qs";
import { loadingHelper } from "@/utils/loading";

//配置了两个拦截器
axios.defaults.withCredentials = true;
//连后台跨域"/proxy"
//process.env.VUE_APP_URL
axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers["token"] = null;
axios.defaults.timeout = 100000; //超时时间
//axios.defaults.retry = 1;
//axios.defaults.retryDelay = 100000;
//解决重复请求
let pending = []; //声明一个数组用于存储每个请求的取消函数和标识
let removePending = (ever) => {
  for (let p in pending) {
    if (pending[p].u === ever.url + "&" + ever.method) {
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
};
//上传文件boundary不会缺失（transformRequest）
axios.defaults.transformRequest = [
  (data, config) => {
    if (data instanceof FormData) return data;
    switch (config["Content-Type"]) {
      case "application/json": {
        return JSON.stringify(data);
      }
      case "application/merge-patch+json": {
        return JSON.stringify(data);
      }
      case "multipart/form-data": {
        let params = new FormData();
        for (let key in data) {
          params.append(key, data[key]);
        }
        return params;
      }
      default: {
        return Qs.stringify(data);
      }
    }
  },
];
axios.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("TOKEN");
    if (token) {
      config.headers["token"] = token;
    }
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new axios.CancelToken((cancel) => {
      store.commit("pushRequestToken", { cancelToken: cancel });
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      let date = new Date();
      pending.push({
        u: config.url + "&" + config.method + "&" + date.getTime(),
        f: cancel,
      });
    });
    return config;
  },
  (err) => {
    loadingHelper.hide();
    ElNotification.error({
      message: "Sorry, the server failed to respond",
      type: "error",
      position: "bottom-right",
    });
    return Promise.resolve(err);
  }
);
//拦截服务端响应的信息
axios.interceptors.response.use(
  (res) => {
    removePending(res.config);
    //HTTP响应码是200，后端自己定义了500
    if (res.data.code !== 0) {
      loadingHelper.hide();
      //业务逻辑错误(服务器找不到，服务器错误等，http的响应码就不是200了)
      ElNotification.error({
        message: res.data.msg,
        type: "error",
        position: "bottom-right",
      });
      return res.data;
    }
    //返回方法调用的哪里，拿到的就是服务端返回的数据
    return res.data;
  },
  (err) => {
    if(err.code == "ECONNABORTED"){
      console.log(err)
      ElNotification.error({
        message: "Sorry, the server failed to respond in time, please try again later",
        type: "error",
        position: "bottom-right",
      });
      return Promise.reject(err);
    }
    if (err && err.response) {
      loadingHelper.hide();
      let response = err.response;
      if (response.status == 504 || response.status == 404) {
        ElNotification.error({
          message: "Service Unavailable",
          type: "error",
          position: "bottom-right",
        });
      } else if (response.status == 403) {
        //表示权限不足
        ElNotification.error({
          message: "Insufficient Permissions",
          type: "error",
          position: "bottom-right",
        });
        router.replace({
          //跳转到登录页面
          path: "/login",
          query: {
            redirect: router.currentRoute.value.fullPath,
          }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      } else if (response.status == 401) {
        //表示未登录
        ElNotification.error({
          message: "Unauthorized access!", //服务器返回来的信息
          type: "error",
          position: "bottom-right",
        });
        router.replace({
          //跳转到登录页面
          path: "/login",
          query: {
            redirect: router.currentRoute.value.fullPath,
          }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      } else if (response.data.code == 500) {
        ElNotification.error({
          message: response.data.msg,
          type: "error",
          position: "bottom-right",
        });
      } else if (response.status == 500) {
        if (response.data.code) {
          ElNotification.error({
            message: response.data.msg,
            type: "error",
            position: "bottom-right",
          });
        } else {
          ElNotification.error({
            message: response.request.responseText,
            type: "error",
            position: "bottom-right",
          });
        }
      } else {
        if (response.data.code) {
          ElNotification.error({
            message: response.data.msg,
            type: "error",
            position: "bottom-right",
          });
        }
      }
    }
    return Promise.reject(err);
  }
);
//postform请求接口
//表单：let params = new FormData();for(var key in data){params.append(key,data[key]);}
export const postForm = (url, params) => {
  return axios({
    method: "post",
    url: encodeURI(url),
    data: Qs.stringify(params),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
//post请求接口
export const post = (url, params) => {
  return axios({
    method: "post",
    url: encodeURI(url),
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//文件上传接口;
//数据为formdata----后台GetBody获取参数
export const uploadFile = (url, params) => {
  return axios({
    method: "post",
    url: encodeURI(url),
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
//put请求接口
export const put = (url, params) => {
  return axios({
    method: "put",
    url: encodeURI(url),
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//patch请求接口
export const patch = (url, params) => {
  return axios({
    method: "patch",
    url: encodeURI(url),
    data: params,
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
  });
};
//delete请求接口
export const del = (url, params) => {
  return axios({
    method: "delete",
    url: encodeURI(url),
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//get请求接口
export const get = (url, params) => {
  return axios({
    method: "get",
    url: url,
    params: params,
  });
};
