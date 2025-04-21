'use client';

import React, { useState } from 'react';

type Project = {
  name: string;
  type: string;
  chain: string;
  status: string;
  cost: number;
  twitter: string | "";
  website: string | "";
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
    twitter: '',
    website: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProjectList([...projectList, formData]);
    setFormData({ name: '', type: '', chain: '', status: '', cost: 0, twitter: '', website: '' });
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cost' ? parseFloat(value) : value,
    }));
  };

  
const isValidUrl = (url: string) => {
  return url === "" || /^https?:\/\/.+$/.test(url);
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!isValidUrl(formData.twitter) || !isValidUrl(formData.website)) {
    alert("Twitter atau Website URL tidak valid (harus diawali http:// atau https://)");
    return;
  }

  setProjectList([...projectList, formData]);
  setFormData({ name: '', type: '', chain: '', status: '', cost: 0, twitter: '', website: '' });
  setShowModal(false);
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
            <th style={thStyle}>Project</th>
            <th style={thStyle}>Check</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Chain</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Link</th>
            <th style={thStyle}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {projectList.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ ...tdStyle, textAlign: 'center' }}>
                No projects available
              </td>
            </tr>
          ) : (
            projectList.map((project, index) => (
              <tr key={index}>
                <td style={tdStyle}>{project.name}</td>
                <td style={tdStyle}>✔️</td>
                <td style={tdStyle}>{project.type}</td>
                <td style={tdStyle}>{project.chain}</td>
                <td style={tdStyle}>{project.status}</td>
                <td style={tdStyle}>
                  {project.twitter && (
                    <a
                      href={project.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block' }}
                    >
                      <div style={twitterIconStyle}>X</div>
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', marginLeft: '8px' }}
                    >
                      <div style={websiteIconStyle}>🌐</div>
                    </a>
                  )}
                </td>
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
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <input name="name" type="text" placeholder="Project Name" required style={inputStyle} value={formData.name} onChange={handleChange} />
                  <input name="type" type="text" placeholder="Type" required style={inputStyle} value={formData.type} onChange={handleChange} />
                  <input name="chain" type="text" placeholder="Chain" required style={inputStyle} value={formData.chain} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <input name="status" type="text" placeholder="Status" required style={inputStyle} value={formData.status} onChange={handleChange} />
                  <input name="cost" type="number" placeholder="Cost" required style={inputStyle} value={formData.cost} onChange={handleChange} />
                  <input name="twitter" type="text" placeholder="Twitter" style={inputStyle} value={formData.twitter} onChange={handleChange} />
                  <input name="website" type="text" placeholder="Website" style={inputStyle} value={formData.website} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button type="submit" style={submitStyle}>Submit</button>
                <button type="button" onClick={() => setShowModal(false)} style={cancelStyle}>Cancel</button>
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
  textAlign: 'center',
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
  backgroundColor: '#2b2b2b',
  padding: '30px',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '500px',
  color: 'white',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  marginTop: '12px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#3b3b3b',
  color: 'white',
  fontSize: '14px',
  outline: 'none',
  boxShadow: 'inset 0 0 0 1px #555',
};

const submitStyle: React.CSSProperties = {
  backgroundColor: '#4A90E2',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  marginRight: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const cancelStyle: React.CSSProperties = {
  backgroundColor: '#444',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
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

const twitterIconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#1DA1F2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '14px',
};

const websiteIconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#00BFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '14px',
};

export default Dashboard;
