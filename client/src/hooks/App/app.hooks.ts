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
  function getSerialNumber(model: SearchSerialNumberRequest) {
    return AppServices.searchSerialNumber(model);
  }
  function postVinCode(model: AddVinRequest) {
    return AppServices.addVin(model);
  }

  return {
    getVinList,
    getPlaces,
    getEquipmentCodes,
    getSerialNumber,
    postVinCode
  };
}

export default useApp;
