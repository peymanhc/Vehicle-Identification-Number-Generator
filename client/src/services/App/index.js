import { get, post } from "../api";

// eslint-disable-next-line
export default {
  getVinList: () =>
    get({
      api: "/vinList",
    }),
  getPlaces: () =>
    get({
      api: "/places",
    }),
  getEquipmentCodes: () =>
    get({
      api: "/equipmentCodes",
    }),
  addVin: (model) =>
    post({
      api: "/add",
      model,
    }),
  searchSerialNumber: (model) =>
    post({
      api: "/search",
      model,
    }),
};
