import axios, { AxiosResponse } from "axios";
import store from "@/store";
import handleAPIEndpoint from "@/util/OfflineDemoHandler";

function get(endpoint: string): Promise<AxiosResponse<never>> {
  if (store.state.loginState.loggedIn && store.state.loginState.userInfo) {
    if (store.state.loginState.userInfo.id === "demo_user") {
      const response: AxiosResponse<any> = {
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
        data: handleAPIEndpoint("get", endpoint),
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response as AxiosResponse<never>);
        }, Math.random() * 500 + 100);
      });
    }
  }

  return axios.get(`${process.env.VUE_APP_BACKEND_URL}/${endpoint}`, {
    responseType: "json",
  });
}

function post(endpoint: string, data: Record<string, unknown>): Promise<AxiosResponse<never>> {
  if (store.state.loginState.loggedIn && store.state.loginState.userInfo) {
    if (store.state.loginState.userInfo.id === "demo_user") {
      const response: AxiosResponse<any> = {
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
        data: handleAPIEndpoint("post", endpoint, data),
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response as AxiosResponse<never>);
        }, Math.random() * 500 + 100);
      });
    }
  }

  return axios.post(`${process.env.VUE_APP_BACKEND_URL}/${endpoint}`, data, {
    responseType: "json",
  });
}

function put(endpoint: string, data: Record<string, unknown>): Promise<AxiosResponse<never>> {
  return axios.put(`${process.env.VUE_APP_BACKEND_URL}/${endpoint}`, data, {
    responseType: "json",
  });
}

function del(endpoint: string): Promise<AxiosResponse<never>> {
  return axios.delete(`${process.env.VUE_APP_BACKEND_URL}/${endpoint}`);
}

function absolutePath(relativePath: string): string {
  const regEx = /^https?:\/\//;

  if (regEx.test(relativePath)) {
    return relativePath;
  }
  return `${process.env.VUE_APP_BACKEND_URL}/${relativePath}`;
}

export {
  get,
  post,
  put,
  del,
  absolutePath,
};
