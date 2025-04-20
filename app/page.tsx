import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'left', color: '#4A90E2' }}>GTracker</h1>
     
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', width: '30%' }}>
          <h2>Tracker</h2>
          <p>Cek daftar airdrop yang sedang berlangsung.</p>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', width: '30%' }}>
          <h2>Analytics</h2>
          <p>Analisis hasil dan performa airdrop Anda.</p>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', width: '30%' }}>
          <h2>Reminders</h2>
          <p>Dapatkan pengingat untuk tugas penting.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
