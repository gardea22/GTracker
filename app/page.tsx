'use client';

import React, { useState } from 'react';

// Tipe data untuk Project
type Project = {
  name: string; // Nama project
  type: string; // Jenis project
  chain: string; // Blockchain yang digunakan
  status: string; // Status proyek (misalnya: aktif, selesai, dll)
  cost: number; // Biaya terkait proyek
  twitter: string | ""; // Link Twitter, bisa kosong jika tidak ada
  website: string | ""; // Link Website, bisa kosong jika tidak ada
};

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false); // Menyimpan status apakah modal ditampilkan
  const [projectList, setProjectList] = useState<Project[]>([]); // Daftar proyek yang ditambahkan
  const [loading, setLoading] = useState(false); // Menyimpan status apakah data sedang diproses

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
    e.preventDefault(); // Mencegah reload halaman saat submit
    setLoading(true); // Mengatur status loading menjadi true

    // Validasi URL Twitter dan Website
    if (!isValidUrl(formData.twitter) || !isValidUrl(formData.website)) {
      alert("Twitter atau Website URL tidak valid (harus diawali http:// atau https://)");
      setLoading(false); // Matikan loading jika URL tidak valid
      return;
    }

    // Validasi agar Cost tidak kurang dari 0
    if (formData.cost < 0) {
      alert("Cost tidak boleh kurang dari 0.");
      setLoading(false); // Matikan loading jika cost kurang dari 0
      return;
    }

    // Menambahkan proyek ke daftar dan reset form
    setProjectList([...projectList, formData]);
    setFormData({
      name: '',
      type: '',
      chain: '',
      status: '',
      cost: 0,
      twitter: '',
      website: '',
    });
    setShowModal(false); // Menutup modal setelah submit
    setLoading(false); // Matikan loading setelah selesai
  };

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Mengambil nama dan nilai dari input
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cost' ? parseFloat(value) : value, // Jika input 'cost', konversi ke float
    }));
  };

  // Fungsi untuk validasi URL (harus diawali dengan http:// atau https://)
  const isValidUrl = (url: string) => {
    return url === "" || /^https?:\/\/.+$/.test(url);
  };

  return (
    <div className="font-sans p-4 bg-[#1e1e2f] min-h-screen text-white">
      <h1 className="text-center text-[#4A90E2] text-2xl font-bold">GTracker</h1>

      {/* Tombol untuk menambah proyek */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => setShowModal(true)} // Menampilkan modal saat tombol diklik
          className="bg-[#4A90E2] text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
        >
          +
        </button>
      </div>

      {/* Tabel yang menampilkan daftar proyek */}
      <table className="w-full border-collapse mt-2 text-sm">
        <thead>
          <tr className="bg-[#2c2c3c] text-white">
            <th className="border border-[#333] p-2 font-bold">Project</th>
            <th className="border border-[#333] p-2 font-bold">Check</th>
            <th className="border border-[#333] p-2 font-bold">Type</th>
            <th className="border border-[#333] p-2 font-bold">Chain</th>
            <th className="border border-[#333] p-2 font-bold">Status</th>
            <th className="border border-[#333] p-2 font-bold">Link</th>
            <th className="border border-[#333] p-2 font-bold">Cost</th>
          </tr>
        </thead>
        <tbody>
          {/* Jika tidak ada proyek */}
          {projectList.length === 0 ? (
            <tr>
              <td colSpan={7} className="border border-[#333] p-2 text-center bg-[#1e1e2f]">
                No projects available
              </td>
            </tr>
          ) : (
            // Menampilkan daftar proyek yang sudah ditambahkan
            projectList.map((project, index) => (
              <tr key={index} className="bg-[#1e1e2f]">
                <td className="border border-[#333] p-2 text-center">{project.name}</td>
                <td className="border border-[#333] p-2 text-center">✔️</td>
                <td className="border border-[#333] p-2 text-center">{project.type}</td>
                <td className="border border-[#333] p-2 text-center">{project.chain}</td>
                <td className="border border-[#333] p-2 text-center">{project.status}</td>
                <td className="border border-[#333] p-2 text-center">
                  {/* Menampilkan link Twitter dan Website jika ada */}
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
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal untuk menambah proyek baru */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#2b2b2b] p-8 rounded-xl w-full max-w-lg text-white shadow-lg">
            <h2 className="text-[#4A90E2] text-xl font-semibold text-center mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">
                  {/* Input untuk nama proyek */}
                  <input name="name" type="text" placeholder="Project Name" required value={formData.name} onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  {/* Input untuk jenis proyek */}
                  <input name="type" type="text" placeholder="Type" required value={formData.type} onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  {/* Input untuk chain (blockchain) */}
                  <input name="chain" type="text" placeholder="Chain" required value={formData.chain} onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                </div>
                <div className="flex-1">
                  {/* Input untuk status proyek */}
                  <input name="status" type="text" placeholder="Status" required value={formData.status} onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  {/* Input untuk biaya proyek */}
                  <input name="cost" type="number" placeholder="Cost" required value={formData.cost} onChange={handleChange}
                    min="0" className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  {/* Input untuk link Twitter */}
                  <input name="twitter" type="text" placeholder="Twitter" value={formData.twitter} onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                  {/* Input untuk link Website */}
                  <input name="website" type="text" placeholder="Website" value={formData.website} onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
                </div>
              </div>
              <div className="mt-6 text-center">
                {/* Tombol submit */}
                <button type="submit" disabled={loading} className="bg-[#4A90E2] text-white font-bold px-5 py-2 rounded-md mr-2">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
                {/* Tombol cancel */}
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
