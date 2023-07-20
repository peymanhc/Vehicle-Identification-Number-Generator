// libraries
import React, { useState, useEffect } from "react";
// components
import VinList from "./components/VinList";
import Select from "./components/Select";
import AppServices from "./services/App/index";
// styles
import "./App.css";

const App = () => {
  const [formValues, setFormValues] = useState({
    version: "",
    equipmentCode: "",
    year: "",
    place: "",
    serialNumber: "",
    vin: "",
    searchSerialNumber: "",
    vinList: [],
  });

  const [places, setplaces] = useState([]);
  const [equipmentCodes, setEquipmentCodes] = useState([]);

  useEffect(() => {
    AppServices.getEquipmentCodes().then((equipmentCodes) => {
      setEquipmentCodes(equipmentCodes.data);
    });
    AppServices.getPlaces().then((places) => {
      setplaces(places.data);
    });
  }, []);

  const handleInputChange = (e) => {
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
    AppServices.searchSerialNumber(payload)
      .then((response) => {
        const nextSerialNumber = response.data.serialNumber;
        setFormValues({ ...formValues, searchSerialNumber: nextSerialNumber });
      })
      .catch((err) => {
        alert("Error to Search Serial Number");
      });
  };

  const addVin = async () => {
    const { vin } = formValues;
    AppServices.addVin({ vin })
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
      })
      .catch((err) => {
        alert("Error to add VIN Number");
      });
  };

  const fetchVinList = async () => {
    AppServices.getVinList()
      .then((response) => {
        const vinList = response.data;
        setFormValues({ ...formValues, vinList });
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="app">
      <h1 className="heading">Vehicle Identification Number (VIN) Generator</h1>
      <div className="form-section">
        <h3 className="form-heading">Generate VIN</h3>
        <div className="form-row">
          <label className="form-label">Version:</label>
          <input
            type="number"
            name="version"
            value={formValues.version}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label className="form-label">Equipment Code:</label>
          <Select
            name="equipmentCode"
            handleChange={handleInputChange}
            value={formValues.place}
            data={equipmentCodes}
          />
        </div>
        <div className="form-row">
          <label className="form-label">Year of Issue:</label>
          <input
            type="number"
            name="year"
            value={formValues.year}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-row">
          <label className="form-label">Place of Production:</label>
          <Select
            name="place"
            handleChange={handleInputChange}
            value={formValues.place}
            data={places}
          />
        </div>
        <div className="form-row">
          <label className="form-label">Serial Number:</label>
          <input
            type="number"
            name="serialNumber"
            value={formValues.serialNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <button
          disabled={
            !formValues.version ||
            !formValues.equipmentCode ||
            !formValues.year ||
            !formValues.place
          }
          onClick={generateVin}
          className="form-button"
        >
          Generate
        </button>
        <p className="generated-vin">VIN: {formValues.vin}</p>
      </div>
      <div className="form-section">
        <h3 className="form-heading">Search and Add VIN</h3>
        <div className="form-row">
          <label className="form-label">Next Serial Number:</label>
          <input
            type="text"
            name="searchSerialNumber"
            value={formValues.searchSerialNumber}
            readOnly
            className="form-input"
          />
        </div>
        <button
          onClick={searchSerialNumber}
          disabled={
            !formValues.version ||
            !formValues.equipmentCode ||
            !formValues.year ||
            !formValues.place
          }
          className="form-button"
        >
          Search
        </button>
        <button
          onClick={addVin}
          disabled={!formValues.vin || !formValues.searchSerialNumber}
          className="form-button"
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
