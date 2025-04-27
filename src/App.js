import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import HealthForm from './components/HealthForm';
import HealthTable from './components/HealthTable';
import HealthChart from './components/HealthChart';

const LOCAL_STORAGE_KEY = 'healthData';

function App() {
  const [healthData, setHealthData] = useState(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(healthData));
  }, [healthData]);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const addEntry = (entry) => {
    setHealthData(prev => [entry, ...prev]);
  };

  return (
    <div className="container">
      <div className='header'>
        <h1>Health Metrics Tracker</h1>
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode(prev => !prev)}
          aria-label="Toggle dark/light mode"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />} {/* Use icons for a better visual cue */}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span> {/* Optional text */}
        </button>
      </div>
      <HealthForm onSubmit={addEntry} />
      {healthData.length === 0 ? (
        <p style={{textAlign: 'center'}}>No health data available. Add a new entry above!</p>
      ) : (
        <>
          <HealthChart data={healthData} />
          <HealthTable data={healthData} />
        </>
      )}
    </div>
  );
}

export default App;
