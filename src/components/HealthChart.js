import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function HealthChart({ data }) {
  const today = new Date().toISOString().split('T')[0];
  const filtered = data.filter(item =>
    item.timestamp.startsWith(today)
  );

  const chartData = filtered.map(item => ({
    name: new Date(item.timestamp).toLocaleTimeString(),
    value: item.value
  }));

  return (
    <div>
      <h3>Today’s Metric Trends</h3>
      <LineChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default HealthChart;
