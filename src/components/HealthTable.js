import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const exportToCSV = (data) => {
  const headers = ['Metric', 'Value', 'Timestamp'];
  const rows = data.map(entry => [entry.metric, entry.value, entry.timestamp]);

  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'health_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


function HealthTable({ data, onDelete, onEdit }) {
  const [sortKey, setSortKey] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingId, setEditingId] = useState(null);
  const [editedEntry, setEditedEntry] = useState({});

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder(prev =>
      key === sortKey ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditedEntry({ ...entry });
  };

  const handleEditChange = (field, value) => {
    setEditedEntry(prev => ({ ...prev, [field]: value }));
  };

  const submitEdit = () => {
    onEdit({ ...editedEntry, value: parseFloat(editedEntry.value) });
    setEditingId(null);
  };

  return (
    <div>
      <h3>Entries</h3>
      <button onClick={() => exportToCSV(data)}>Export to CSV</button>
      {sorted.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No health data available.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('metric')}>Metric</th>
                <th onClick={() => handleSort('value')}>Value</th>
                <th onClick={() => handleSort('timestamp')}>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => (
                <tr key={entry.id}>
                  {editingId === entry.id ? (
                    <>
                      <td>
                        <input
                          value={editedEntry.metric}
                          onChange={e => handleEditChange('metric', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editedEntry.value}
                          onChange={e => handleEditChange('value', e.target.value)}
                        />
                      </td>
                      <td>{new Date(entry.timestamp).toLocaleString()}</td>
                      <td>
                        <FaSave
                          onClick={submitEdit}
                          style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }}
                          title="Save Entry"
                        />
                        <FaTimes
                          onClick={() => setEditingId(null)}
                          style={{ cursor: 'pointer', color: 'red' }}
                          title="Cancel Edit"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{entry.metric}</td>
                      <td>{entry.value}</td>
                      <td>{new Date(entry.timestamp).toLocaleString()}</td>
                      <td>
                        <FaEdit
                          onClick={() => startEdit(entry)}
                          style={{ cursor: 'pointer', marginRight: '10px' }}
                          title="Edit Entry"
                        />
                        <FaTrash
                          onClick={() => onDelete(entry.id)}
                          style={{ cursor: 'pointer' }}
                          title="Delete Entry"
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default HealthTable;
