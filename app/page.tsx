import React, { useState } from 'react';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini kamu bisa ambil data form dan masukkan ke tabel
    alert("Data submitted!");
    setShowModal(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#1e1e2f', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ textAlign: 'left', color: '#4A90E2' }}>GTracker</h1>

      <button onClick={() => setShowModal(true)} style={buttonStyle}>
        + Add Project
      </button>

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

      {/* Modal */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ color: '#4A90E2' }}>Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name Project" required style={inputStyle} />
              <input type="text" placeholder="Type" required style={inputStyle} />
              <input type="text" placeholder="Chain" required style={inputStyle} />
              <input type="text" placeholder="Status" required style={inputStyle} />
              <input type="number" placeholder="Cost" required style={inputStyle} />
              <div style={{ marginTop: '10px' }}>
                <button type="submit" style={submitStyle}>Submit</button>
                <button onClick={() => setShowModal(false)} style={cancelStyle}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 'bold',
  border: '1px solid #333',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#2c2c3c',
  color: '#ffffff',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #333',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#1e1e2f',
  color: '#ffffff',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#4A90E2',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#2c2c3c',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  color: 'white',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginTop: '10px',
  borderRadius: '4px',
  border: '1px solid #555',
  backgroundColor: '#1e1e2f',
  color: 'white',
};

const submitStyle: React.CSSProperties = {
  backgroundColor: '#4A90E2',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  marginRight: '10px',
  cursor: 'pointer',
};

const cancelStyle: React.CSSProperties = {
  backgroundColor: '#555',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Dashboard;
