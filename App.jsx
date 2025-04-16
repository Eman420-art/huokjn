import { useState } from 'react';

export default function App() {
  const [fuelType, setFuelType] = useState('CNG');
  const [distance, setDistance] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [co2e, setCo2e] = useState(null);

  const emissionFactors = {
    Diesel: { CO2: 2.68, CH4: 0.0001, N2O: 0.0001 },
    Petrol: { CO2: 2.31, CH4: 0.0002, N2O: 0.0001 },
    CNG: { CO2: 2.74, CH4: 0.001, N2O: 0.0001 },
    LPG: { CO2: 1.51, CH4: 0.0001, N2O: 0.0001 },
  };

  const GWP = { CH4: 25, N2O: 298 };

  const calculate = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    if (!d || !e || !fuelType) {
      alert('Please enter valid inputs.');
      return;
    }

    const fuelUsed = d / e;
    const factors = emissionFactors[fuelType];

    const co2 = fuelUsed * factors.CO2;
    const ch4 = fuelUsed * factors.CH4 * GWP.CH4;
    const n2o = fuelUsed * factors.N2O * GWP.N2O;
    const total = co2 + ch4 + n2o;

    setCo2e(total.toFixed(2));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Online Carbon Footprint Calculator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Fuel Type: </label>
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
          <option value="Diesel">Diesel</option>
          <option value="Petrol">Petrol</option>
          <option value="CNG">CNG</option>
          <option value="LPG">LPG</option>
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Distance Travelled (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Fuel Efficiency (km per liter or kg)"
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
        />
      </div>
      <button onClick={calculate}>Calculate Total CO₂e</button>
      {co2e && <p style={{ marginTop: '1rem' }}>Estimated Emissions: {co2e} kg CO₂e</p>}
    </div>
  );
}