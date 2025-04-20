import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'left', color: '#4A90E2' }}>GTracker</h1>
     
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const AirdropFormPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Tombol Lingkaran */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#4A90E2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <FaPencilAlt size={24} color="white" />
      </button>

      {/* Form Popup */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            left: "0",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            width: "300px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Tambah Airdrop</h3>
          <input
            type="text"
            placeholder="Nama Airdrop"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="date"
            placeholder="Tanggal Klaim"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: "#4A90E2",
              color: "white",
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Simpan
          </button>
        </div>
      )}
    </div>
  );
};

export default AirdropFormPopup;
