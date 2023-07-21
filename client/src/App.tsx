// libraries
import React, { useState, useEffect } from "react";
// components
import FormItem from "components/FormItem";
import VinList from "components/VinList";
import Select from "components/Select";
// hooks
import useApp from "hooks/App/app.hooks";
// styles
import "./App.css";

const App = () => {
  const [formValues, setFormValues] = useState<VehicleInfoTypes>({
    version: "",
    equipmentCode: "",
    year: "",
    place: "",
    serialNumber: "",
    vin: "",
    searchSerialNumber: "",
    vinList: [],
  });
  const [places, setplaces] = useState<Array<PlacesTypes>>([]);
  const [equipmentCodes, setEquipmentCodes] = useState<
    Array<EquipmentCodeTypes>
  >([]);
  const {
    getVinList,
    getPlaces,
    getEquipmentCodes,
    getSerialNumber,
    postVinCode,
  } = useApp();

  useEffect(() => {
    getEquipmentCodes().then((equipmentCodes) => {
      setEquipmentCodes(equipmentCodes.data);
      console.log(equipmentCodes);
    });
    getPlaces().then((places) => {
      setplaces(places.data);
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const generateVin = () => {
    const { version, equipmentCode, year, place, serialNumber } = formValues;
    const vin = `${version.padStart(3, "0")}${equipmentCode.padStart(
      3,
      "0"
    )}${year.padStart(2, "0")}1${serialNumber.padStart(6, "0")}${place}`;
    setFormValues({ ...formValues, vin });
  };
  const searchSerialNumber = async () => {
    const { version, equipmentCode, year, place, serialNumber } = formValues;
    const payload = {
      version,
      equipmentCode,
      year,
      serialNumber,
      place,
    };
    getSerialNumber(payload)
      .then((response) => {
        const nextSerialNumber = response.data.serialNumber;
        setFormValues({ ...formValues, searchSerialNumber: nextSerialNumber });
      })
      .catch((err) => {
        alert("Error to Search Serial Number");
      });
  };

  const fetchVinList = async () => {
    getVinList()
      .then((response) => {
        const vinList = response.data;
        setFormValues({ ...formValues, vinList });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addVin = async () => {
    const { vin } = formValues;
    postVinCode({ vin })
      .then((response) => {
        setFormValues({
          ...formValues,
          version: "",
          equipmentCode: "",
          year: "",
          place: "",
          serialNumber: "",
          vin: "",
          searchSerialNumber: "",
        });
        alert("VIN number added successfully!");
        fetchVinList();
      })
      .catch((err) => {
        alert("Error to add VIN Number");
      });
  };

  return (
    <div className="app">
      <h1 className="heading">Vehicle Identification Number (VIN) Generator</h1>
      <div className="form-section">
        <h3 className="form-heading">Generate VIN</h3>
        <FormItem label="Version">
          <input
            type="number"
            name="version"
            value={formValues.version}
            onChange={handleInputChange}
            className="form-input"
          />
        </FormItem>
        <FormItem label="Equipment Code">
          <Select
            name="equipmentCode"
            handleChange={handleInputChange}
            value={formValues.equipmentCode}
            data={equipmentCodes}
          />
        </FormItem>
        <FormItem label="Year of Issue">
          <input
            type="number"
            name="year"
            value={formValues.year}
            onChange={handleInputChange}
            className="form-input"
          />
        </FormItem>
        <FormItem label="Place of Production">
          <Select
            name="place"
            handleChange={handleInputChange}
            value={formValues.place}
            data={places}
          />
        </FormItem>
        <FormItem label="Serial Number">
          <input
            type="number"
            name="serialNumber"
            value={formValues.serialNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </FormItem>
        <button
          disabled={
            !formValues.version ||
            !formValues.equipmentCode ||
            !formValues.year ||
            !formValues.place
          }
          onClick={generateVin}
          className="form-button"
          data-cy="generate"
        >
          Generate
        </button>
        <p className="generated-vin">VIN: {formValues.vin}</p>
      </div>
      <div className="form-section">
        <h3 className="form-heading">Search and Add VIN</h3>
        <FormItem label="Next Serial Number">
          <input
            type="text"
            name="searchSerialNumber"
            value={formValues.searchSerialNumber}
            readOnly
            className="form-input"
          />
        </FormItem>
        <button
          onClick={searchSerialNumber}
          disabled={
            !formValues.version ||
            !formValues.equipmentCode ||
            !formValues.year ||
            !formValues.place
          }
          data-cy="search"
          className="form-button"
        >
          Search
        </button>
        <button
          onClick={addVin}
          disabled={!formValues.vin || !formValues.searchSerialNumber}
          className="form-button"
          data-cy="addVin"
        >
          Add
        </button>
      </div>
      <div className="form-section">
        <h3 className="form-heading">All VIN Numbers</h3>
        <button onClick={fetchVinList} className="form-button">
          Fetch VIN List
        </button>
        <VinList data={formValues.vinList} />
      </div>
    </div>
  );
};

export default App;
