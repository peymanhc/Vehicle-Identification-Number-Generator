// Hooks

import AppServices from "services/App";

function useApp() {
  function getVinList() {
    return AppServices.getVinList();
  }
  function getPlaces() {
    return AppServices.getPlaces();
  }
  function getEquipmentCodes() {
    return AppServices.getEquipmentCodes();
  }
  function postVinCode(model: AddVinRequest) {
    return AppServices.addVin(model);
  }

  return {
    getVinList,
    getPlaces,
    getEquipmentCodes,
    postVinCode
  };
}

export default useApp;
