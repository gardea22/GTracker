'use client';

import React, { useState } from 'react';

type Project = {
  name: string;
  type: string;
  chain: string;
  status: string;
  cost: number;
};

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);

  const [formData, setFormData] = useState<Project>({
    name: '',
    type: '',
    chain: '',
    status: '',
    cost: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProjectList([...projectList, formData]);
    setFormData({ name: '', type: '', chain: '', status: '', cost: 0 });
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cost' ? parseFloat(value) : value,
    }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px', backgroundColor: '#1e1e2f', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>GTracker</h1>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
          <button onClick={() => setShowModal(true)} style={circleButtonStyle}>
              +
          </button>
        </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
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
          {projectList.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ ...tdStyle, textAlign: 'center' }}>
              </td>
            </tr>

      
          ) : (
            projectList.map((project, index) => (
              <tr key={index}>
                <td style={tdStyle}>{project.name}</td>
                <td style={tdStyle}>{project.type}</td>
                <td style={tdStyle}>{project.chain}</td>
                <td style={tdStyle}>✔️</td>
                <td style={tdStyle}>{project.status}</td>
                <td style={tdStyle}>${project.cost}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Modal */}
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ color: '#4A90E2', textAlign: 'center' }}>Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Name Project" required style={inputStyle} value={formData.name} onChange={handleChange} />
              <input name="type" type="text" placeholder="Type" required style={inputStyle} value={formData.type} onChange={handleChange} />
              <input name="chain" type="text" placeholder="Chain" required style={inputStyle} value={formData.chain} onChange={handleChange} />
              <input name="status" type="text" placeholder="Status" required style={inputStyle} value={formData.status} onChange={handleChange} />
              <input name="cost" type="number" placeholder="Cost" required style={inputStyle} value={formData.cost} onChange={handleChange} />
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button type="submit" style={submitStyle}>Simpan</button>
                <button onClick={() => setShowModal(false)} style={cancelStyle}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
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
  padding: '8px 16px',
  borderRadius: '4px',
  marginRight: '10px',
  cursor: 'pointer',
};

const cancelStyle: React.CSSProperties = {
  backgroundColor: '#555',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const circleButtonStyle: React.CSSProperties = {
  backgroundColor: '#4A90E2',
  color: 'white',
  border: '5px',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};



export default Dashboard;

