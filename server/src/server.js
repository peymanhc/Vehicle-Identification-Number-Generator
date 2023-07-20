const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const vinList = [];
const places = [
  {
    name: "Slovenia",
    value: "00",
  },
  {
    name: "Turkey",
    value: "01",
  },
];
const equipmentCodes = [
  {
    name: "Base platform",
    value: "000",
  },
  {
    name: "Bumper",
    value: "014",
  },
  {
    name: "Drum Mulcher",
    value: "037",
  },
  {
    name: "Side Trimmer",
    value: "036",
  },
  {
    name: "Sprayer",
    value: "038",
  },
  {
    name: "Lawn Mower",
    value: "027",
  },
];

app.get("/places", (req, res) => {
  res.send(places);
});
app.get("/equipmentCodes", (req, res) => {
  res.send(equipmentCodes);
});
app.post("/generateVin", (req, res) => {
  const { version, equipmentCode, year, place, serialNumber } = req.body;
  const vin = `${version.toString().padStart(3, "0")}${equipmentCode
    .toString()
    .padStart(3, "0")}${year.toString().padStart(2, "0")}1${serialNumber
    .toString()
    .padStart(6, "0")}${place.toString()}`;
  res.send({ vin });
});

app.post("/search", (req, res) => {
  const { version, equipmentCode, year, place, serialNumber } = req.body;
  if (
    version.toString() === "" ||
    equipmentCode.toString() === "" ||
    year.toString() === "" ||
    place.toString() === ""
  ) {
    res.status(400).send({ message: "Missing required fields" });
  } else {
    const serialNumberStr = serialNumber.toString().padStart(6, "0");
    const vin = `${version.toString().padStart(3, "0")}${equipmentCode
      .toString()
      .padStart(3, "0")}${year
      .toString()
      .substring(2)}1${serialNumberStr}${place.toString()}`;
    res.send({ serialNumber: vin });
  }
});

app.post("/add", (req, res) => {
  const { vin } = req.body;
  vinList.push(vin);
  res.send({ message: "VIN number added successfully" });
});

app.get("/vinList", (req, res) => {
  res.send(vinList);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
