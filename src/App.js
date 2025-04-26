import React, { useState, useEffect } from 'react';
import HealthForm from './components/HealthForm';
import HealthTable from './components/HealthTable';
import HealthChart from './components/HealthChart';

const LOCAL_STORAGE_KEY = 'healthData';

function App() {
  const [healthData, setHealthData] = useState(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(healthData));
  }, [healthData]);

  const addEntry = (entry) => {
    setHealthData(prev => [entry, ...prev]);
  };

  return (
    <div className="container">
      <h1>Health Metrics Tracker</h1>
      <HealthForm onSubmit={addEntry} />
      <HealthChart data={healthData} />
      <HealthTable data={healthData} />
    </div>
  );
}

export default App;
