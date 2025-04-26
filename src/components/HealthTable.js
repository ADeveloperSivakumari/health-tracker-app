import React, { useState } from 'react';

function HealthTable({ data }) {
  const [sortOrder, setSortOrder] = useState('desc');

  const sorted = [...data].sort((a, b) =>
    sortOrder === 'asc' ? a.value - b.value : b.value - a.value
  );

  return (
    <div>
      <h3>Entries</h3>
      <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
        Sort by Value ({sortOrder})
      </button>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(entry => (
            <tr key={entry.id}>
              <td>{entry.metric}</td>
              <td>{entry.value}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HealthTable;
