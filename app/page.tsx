'use client';

import React, { useState } from 'react';

// Tipe data untuk Project
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
  const [showModal, setShowModal] = useState(false); // Menyimpan status apakah modal ditampilkan
  const [projectList, setProjectList] = useState<Project[]>([]); // Daftar proyek yang ditambahkan
  const [loading, setLoading] = useState(false); // Menyimpan status apakah data sedang diproses
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null); // Menyimpan indeks proyek yang sedang diedit

  // State untuk menyimpan data inputan form
  const [formData, setFormData] = useState<Project>({
    name: '',
    type: '',
    chain: '',
    status: '',
    cost: 0,
    twitter: '',
    website: '',
  });

  // Fungsi untuk meng-handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi URL Twitter dan Website
    if (!isValidUrl(formData.twitter) || !isValidUrl(formData.website)) {
      alert("Twitter atau Website URL tidak valid (harus diawali http:// atau https://)");
      setLoading(false);
      return;
    }

    // Validasi agar Cost tidak kurang dari 0
    if (formData.cost < 0) {
      alert("Cost tidak boleh kurang dari 0.");
      setLoading(false);
      return;
    }

    if (editingProjectIndex !== null) {
      // Edit existing project
      const updatedProjectList = [...projectList];
      updatedProjectList[editingProjectIndex] = formData;
      setProjectList(updatedProjectList);
    } else {
      // Add new project
      setProjectList([...projectList, formData]);
    }

    setFormData({
      name: '',
      type: '',
      chain: '',
      status: '',
      cost: 0,
      twitter: '',
      website: '',
    });
    setShowModal(false);
    setEditingProjectIndex(null); // Reset editing state
    setLoading(false);
  };

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cost' ? parseFloat(value) : value,
    }));
  };

  // Fungsi untuk validasi URL
  const isValidUrl = (url: string) => {
    return url === "" || /^https?:\/\/.+$/.test(url);
  };

  // Fungsi untuk mengedit proyek
  const handleEdit = (index: number) => {
    setEditingProjectIndex(index);
    setFormData(projectList[index]);
    setShowModal(true);
  };

// Fungsi untuk menghapus proyek (dengan konfirmasi)
const handleDelete = (index: number) => {
  const confirmed = window.confirm("Apakah kamu yakin ingin menghapus proyek ini?");
  if (!confirmed) return;

  const updatedProjectList = projectList.filter((_, i) => i !== index);
  setProjectList(updatedProjectList);
};


  return (
    <div className="font-sans p-4 bg-[#1e1e2f] min-h-screen text-white">
      <h1 className="text-center text-[#4A90E2] text-2xl font-bold">GTracker</h1>

      {/* Tombol untuk menambah proyek */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#4A90E2] text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
        >
          +
        </button>
      </div>

      {/* Tabel yang menampilkan daftar proyek */}
      <table className="w-full border-collapse mt-2 text-sm">
        <thead>
          <tr className="bg-[#2c2c3c] text-white">
            <th className="border border-[#333] p-2 font-bold w-[1000px]">Project</th>
            <th className="border border-[#333] p-2 font-bold">Check</th>
            <th className="border border-[#333] p-2 font-bold">Type</th>
            <th className="border border-[#333] p-2 font-bold">Chain</th>
            <th className="border border-[#333] p-2 font-bold">Status</th>
            <th className="border border-[#333] p-2 font-bold">Link</th>
            <th className="border border-[#333] p-2 font-bold">Cost</th>
            <th className="border border-[#333] p-2 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectList.length === 0 ? (
            <tr>
              <td colSpan={8} className="border border-[#333] p-2 text-center bg-[#1e1e2f]">
                No projects available
              </td>
            </tr>
          ) : (
            projectList.map((project, index) => (
              <tr key={index} className="bg-[#1e1e2f]">
                <td className="border border-[#333] p-2 text-center">{project.name}</td>
                <td className="border border-[#333] p-2 text-center">✔️</td>
                <td className="border border-[#333] p-2 text-center">{project.type}</td>
                <td className="border border-[#333] p-2 text-center">{project.chain}</td>
                <td className="border border-[#333] p-2 text-center">{project.status}</td>
                <td className="border border-[#333] p-2 text-center">
                  {project.twitter && (
                    <a href={project.twitter} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <div className="w-5 h-5 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white text-sm">X</div>
                    </a>
                  )}
                  {project.website && (
                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-block ml-2">
                      <div className="w-5 h-5 rounded-full bg-[#00BFFF] flex items-center justify-center text-white text-sm">🌐</div>
                    </a>
                  )}
                </td>
                <td className="border border-[#333] p-2 text-center">${project.cost}</td>
                <td className="border border-[#333] p-2 text-center">
                  {/* Tombol Edit dan Delete */}
                  <button onClick={() => handleEdit(index)} className="text-yellow-400 hover:text-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(index)} className="ml-2 text-red-500 hover:text-red-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal untuk menambah atau mengedit proyek */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#2b2b2b] p-8 rounded-xl w-full max-w-lg text-white shadow-lg">
            <h2 className="text-[#4A90E2] text-xl font-semibold text-center mb-4">{editingProjectIndex !== null ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">

                  
                  <input name="name" type="text" placeholder="Project Name" required value={formData.name} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  <select
                          name="type"
                          required
                          value={formData.type}
                          onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                          className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
                          >
                          <option value="" disabled>Type</option>
                          <option value="Testnet">Testnet</option>
                          <option value="DePin">DePin</option>
                          <option value="Point">Point</option>
                          <option value="MiniApp">MiniApp</option>
                          <option value="Wallet">Wallet</option>
                  </select>

                  <select
                          name="chain"
                          required
                          value={formData.chain}
                          onChange={(e) => setFormData((prev) => ({ ...prev, chain: e.target.value }))}
                          className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
                          >
                          <option value="" disabled>Pilih Chain</option>
                          <option value="Ethereum">Ethereum</option>
                          <option value="Solana">Solana</option>
                          <option value="BNB">BNB</option>
                          <option value="Base">Base</option>
                          <option value="Polygon">Polygon</option>
                          <option value="OP">OP</option>
                          <option value="Other">Other</option>
                  </select>

                  
                </div>
                <div className="flex-1">
                  <input name="status" type="text" placeholder="Status" required value={formData.status} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  <input name="cost" type="number" placeholder="Cost" required value={formData.cost} onChange={handleChange} min="0" className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  <input name="twitter" type="text" placeholder="Twitter" value={formData.twitter} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  <input name="website" type="text" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                </div>
              </div>
              <div className="mt-6 text-center">
                <button type="submit" disabled={loading} className="bg-[#4A90E2] text-white font-bold px-5 py-2 rounded-md mr-2">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-[#444] text-white font-bold px-5 py-2 rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
