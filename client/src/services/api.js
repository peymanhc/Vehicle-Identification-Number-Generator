import qs from "qs";
import axiosInstance from "./axiosMiddleware";

const endPoint = process.env.REACT_APP_API_KEY;


export const post = ({ api, model, headerType, url }) => {
  return axiosInstance.post(
    `${url ? url : endPoint}${api}`,
    model,
    headerType && {
      headers: {
        "content-type": headerType,
      },
    }
  );
};

export const get = ({ api, model, isFormData, url }) => {
  const test = qs.stringify(model);
  const hasQuestionMark = test !== "" && api[api.length - 1] !== "?";
  return axiosInstance.get(
    `${url ? url : endPoint}${api}${
      test ? `${hasQuestionMark ? "?" : ""}&${test}` : ""
    }`
  );
};


export const deleted = ({ api, model, isSocial }) =>
  axiosInstance.delete(`${endPoint}${api}`, {
    data: model,
  });

export const put = ({ api, model, isSocial }) =>
  axiosInstance.put(`${endPoint}${api}`, {
    data: model,
  });

export const patch = ({ api, model, isSocial }) =>
  axiosInstance.patch(`${endPoint}${api}`, {
    data: model,
  });
