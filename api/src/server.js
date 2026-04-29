const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let energyData = {
  voltage: 220,
  current: 2.5,
  power: 550,
  dailyKwh: 4.8,
  cost: 1200,
};

app.get("/", (req, res) => {
  res.send("Xolarie Smart Home EMS API is running");
});

app.get("/api/energy/current", (req, res) => {
  res.json(energyData);
});

app.post("/api/energy/simulate", (req, res) => {
  const { voltage, current } = req.body;

  const power = voltage * current;

  energyData = {
    voltage,
    current,
    power,
    dailyKwh: Number(((power * 24) / 1000).toFixed(2)),
    cost: Number((((power * 24) / 1000) * 250).toFixed(2)),
  };

  res.json(energyData);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`EMS API running on http://localhost:${PORT}`);
});