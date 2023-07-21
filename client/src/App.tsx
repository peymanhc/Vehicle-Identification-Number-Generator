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
    yearOfIssue: "",
    placeOfProduction: "",
    serialNumber: "",
    vin: "",
    searchSerialNumber: "",
    vinList: [],
  });
  const [places, setplaces] = useState<Array<PlacesTypes>>([]);
  const [equipmentCodes, setEquipmentCodes] = useState<
    Array<EquipmentCodeTypes>
  >([]);
  const { getVinList, getPlaces, getEquipmentCodes, postVinCode } = useApp();

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
  
  useEffect(() => {
    getEquipmentCodes().then((equipmentCodes) => {
      setEquipmentCodes(equipmentCodes.data);
    });
    getPlaces().then((places) => {
      setplaces(places.data);
    });
    fetchVinList();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: `${e.target.value}` });
  };
  const handleInputChange = (e: any) => {
    const val = +e.target.value;
    const max = e.target.max;
    const maxLength = e.target.max;
    const newVal =
      val < max ? val : parseInt(val.toString().substring(0, maxLength));
    setFormValues({ ...formValues, [e.target.name]: `${newVal}` });
  };
  const generateVin = () => {
    const {
      version,
      equipmentCode,
      yearOfIssue,
      placeOfProduction,
      serialNumber,
    } = formValues;
    const vin = `${version.padStart(3, "0")}${equipmentCode.padStart(
      3,
      "0"
    )}${yearOfIssue.padStart(2, "0")}1${serialNumber.padStart(
      6,
      "0"
    )}${placeOfProduction}`;
    setFormValues({ ...formValues, vin });
  };

  const addVin = async () => {
    postVinCode(formValues)
      .then((response) => {
        setFormValues({
          ...formValues,
          version: "",
          equipmentCode: "",
          yearOfIssue: "",
          placeOfProduction: "",
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
            max={3}
            name="version"
            value={formValues.version}
            onChange={handleInputChange}
            className="form-input"
          />
        </FormItem>
        <FormItem label="Equipment Code">
          <Select
            name="equipmentCode"
            handleChange={handleSelectChange}
            value={formValues.equipmentCode}
            data={equipmentCodes}
          />
        </FormItem>
        <FormItem label="Year of Issue">
          <input
            type="number"
            name="yearOfIssue"
            max={2}
            value={formValues.yearOfIssue}
            onChange={handleInputChange}
            className="form-input"
          />
        </FormItem>
        <FormItem label="Place of Production">
          <Select
            name="placeOfProduction"
            handleChange={handleSelectChange}
            value={formValues.placeOfProduction}
            data={places}
          />
        </FormItem>
        <FormItem label="Serial Number">
          <input
            type="number"
            max={6}
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
            !formValues.yearOfIssue ||
            !formValues.placeOfProduction
          }
          onClick={generateVin}
          className="form-button"
          data-cy="generate"
        >
          Generate
        </button>
        <p className="generated-vin">VIN: {formValues.vin}</p>
      </div>
      <button
        onClick={addVin}
        disabled={!formValues.vin}
        className="form-button"
        data-cy="addVin"
      >
        Add VIN
      </button>
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
