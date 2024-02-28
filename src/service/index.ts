import { LOGIN_TOKEN } from "@/global/constant";
import { localCache } from "@/utils/cache";
import { BASE_URL, TIME_OUT } from "./config";
import Request from "./request";
// 可以创建很多实例
const cmsRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 在拦截器中给每个成功的请求都加上token
    requestSeccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN);
      if (config.headers && token) {
        //类型缩小
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  }
});
export const request2 = new Request({
  baseURL: "http://codercba.com:1888/airbnb/api/",
  timeout: 8000,
  interceptors: {
    requestSeccessFn: (config) => {
      return config;
    },
    requestFailureFn: (err) => {
      return err;
    },
    responseSeccessFn: (res) => {
      return res;
    },
    responseFailureFn: (err) => {
      return err;
    }
  }
});
export default cmsRequest;
