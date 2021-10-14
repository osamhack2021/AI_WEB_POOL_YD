import axios, { AxiosResponse } from "axios";

function get(endpoint: string): Promise<AxiosResponse<never>> {
  return axios.get(`${process.env.VUE_APP_BACKEND_URL}/${endpoint}`, {
    responseType: "json",
  });
}

function post(endpoint: string, data: Record<string, unknown>): Promise<AxiosResponse<never>> {
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
