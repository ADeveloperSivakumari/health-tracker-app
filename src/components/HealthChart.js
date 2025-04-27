import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function HealthChart({ data }) {
  const today = new Date().toISOString().split('T')[0];
  const filtered = data.filter(item => item.timestamp.startsWith(today));

  const chartData = filtered.map(item => ({
    name: new Date(item.timestamp).toLocaleTimeString(),
    value: item.value
  }));

  return (
    <div>
      <h3>Today’s Metric Trends</h3>
      {chartData.length === 0 ? (
        <p style={{textAlign: 'center'}}>No health data available for today. Add a new entry above!</p>
      ) : (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      )}
    </div>
  );
}

export default HealthChart;
