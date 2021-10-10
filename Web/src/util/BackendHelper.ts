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

export {
  get,
  post,
};
