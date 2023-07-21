import qs from "qs";
import axiosInstance from "./axiosMiddleware";

const endPoint = process.env.REACT_APP_API_KEY;

interface RequestConfig {
  api: string;
  model?: any;
  url?: string;
}

export const post = ({ api, model, url }: RequestConfig) => {
  return axiosInstance.post(`${url ? url : endPoint}${api}`, model);
};

export const get = ({ api, model, url }: RequestConfig) => {
  const test = qs.stringify(model);
  const hasQuestionMark = test !== "" && api[api.length - 1] !== "?";
  return axiosInstance.get(
    `${url ? url : endPoint}${api}${
      test ? `${hasQuestionMark ? "?" : ""}&${test}` : ""
    }`
  );
};

export const deleted = ({ api, model }: RequestConfig) =>
  axiosInstance.delete(`${endPoint}${api}`, {
    data: model,
  });

export const put = ({ api, model }: RequestConfig) =>
  axiosInstance.put(`${endPoint}${api}`, {
    data: model,
  });

export const patch = ({ api, model }: RequestConfig) =>
  axiosInstance.patch(`${endPoint}${api}`, {
    data: model,
  });
