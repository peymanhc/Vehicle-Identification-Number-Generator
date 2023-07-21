import { get, post } from "../api";

// eslint-disable-next-line
export default {
  getVinList: () =>
    get({
      api: "/vehicle",
    }),
  getPlaces: () =>
    get({
      api: "/vehicle/place-of-products",
    }),
  getEquipmentCodes: () =>
    get({
      api: "/vehicle/equipment-codes",
    }),
  addVin: (model: AddVinRequest) =>
    post({
      api: "/vehicle",
      model,
    }),
};
