import React, { useState } from 'react';

function HealthForm({ onSubmit }) {
  const [metric, setMetric] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!metric || isNaN(value)) return;

    onSubmit({
      id: Date.now(),
      metric,
      value: parseFloat(value),
      timestamp: new Date().toISOString()
    });

    setMetric('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Metric (e.g., Step Count)"
        value={metric}
        onChange={e => setMetric(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default HealthForm;
