import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'left', color: '#4A90E2' }}>GTracker</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Name Project</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Chain</th>
            <th style={thStyle}>Check</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Example Project</td>
            <td style={tdStyle}>DApp</td>
            <td style={tdStyle}>Ethereum</td>
            <td style={tdStyle}>✔️</td>
            <td style={tdStyle}>Active</td>
            <td style={tdStyle}>$200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Inline style untuk th dan td agar lebih rapi
const thStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f5f5f5',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'left',
};

export default Dashboard;
