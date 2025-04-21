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
  checkedUntil?: number; // waktu dalam timestamp
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

  // State untuk mengelola urutan penyortiran
  const [sortConfig, setSortConfig] = useState<{ key: keyof Project; direction: 'ascending' | 'descending' }>({
    key: 'name',
    direction: 'ascending',
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  const toggleCheck = (index: number) => {
    const now = Date.now();
    const updatedList = [...projectList];

    const isCurrentlyChecked = updatedList[index].checkedUntil && updatedList[index].checkedUntil! > now;

    if (isCurrentlyChecked) {
      updatedList[index].checkedUntil = 0;
    } else {
      updatedList[index].checkedUntil = now + 24 * 60 * 60 * 1000; // 24 jam ke depan
    }

    setProjectList(updatedList);
  };

  // Fungsi untuk menyortir proyek berdasarkan key dan arah
  const sortedProjectList = [...projectList].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortConfig.direction === 'ascending') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (sortConfig.direction === 'ascending') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }

    return 0;
  });

  // Fungsi untuk mengubah urutan penyortiran
  const handleSortChange = (key: keyof Project) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'ascending' ? 'descending' : 'ascending',
        };
      } else {
        return { key, direction: 'ascending' };
      }
    });
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

      {/* Dropdown untuk memilih kolom sorting */}
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => handleSortChange(e.target.value as keyof Project)}
          className="bg-[#444] text-white p-2 rounded-md"
        >
          <option value="name">Sort by Name</option>
          <option value="type">Sort by Type</option>
          <option value="chain">Sort by Chain</option>
          <option value="status">Sort by Status</option>
          <option value="cost">Sort by Cost</option>
        </select>
      </div>

      {/* Tabel yang menampilkan daftar proyek */}
      <table className="w-full border-collapse mt-2 text-sm">
        <thead>
          <tr className="bg-[#2c2c3c] text-white">
            <th className="border border-[#333] p-2 font-bold w-[300px]">Project</th>
            <th className="border border-[#333] p-2 font-bold w-[80px]">Check</th>
            <th className="border border-[#333] p-2 font-bold">
              Type
              {sortConfig.key === 'type' && (
                <span className="ml-2">{sortConfig.direction === 'ascending' ? '🔽' : '🔼'}</span>
              )}
            </th>
            <th className="border border-[#333] p-2 font-bold">
              Chain
              {sortConfig.key === 'chain' && (
                <span className="ml-2">{sortConfig.direction === 'ascending' ? '🔽' : '🔼'}</span>
              )}
            </th>
            <th className="border border-[#333] p-2 font-bold">
              Status
              {sortConfig.key === 'status' && (
                <span className="ml-2">{sortConfig.direction === 'ascending' ? '🔽' : '🔼'}</span>
              )}
            </th>
            <th className="border border-[#333] p-2 font-bold">
              Link
            </th>
            <th className="border border-[#333] p-2 font-bold w-[100px]">
              Cost
              {sortConfig.key === 'cost' && (
                <span className="ml-2">{sortConfig.direction === 'ascending' ? '🔽' : '🔼'}</span>
              )}
            </th>
            <th className="border border-[#333] p-2 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProjectList.length === 0 ? (
            <tr>
              <td colSpan={8} className="border border-[#333] p-2 text-center bg-[#1e1e2f]">
                No projects available
              </td>
            </tr>
          ) : (
            sortedProjectList.map((project, index) => (
              <tr key={index} className="bg-[#1e1e2f]">
                <td className="border border-[#333] p-2 text-center">{project.name}</td>
                <td className="border border-[#333] p-2 text-center">
                  <input
                    type="checkbox"
                    checked={project.checkedUntil && project.checkedUntil > Date.now()}
                    onChange={() => toggleCheck(index)}
                  />
                </td>
                <td className="border border-[#333] p-2 text-center">{project.type}</td>
                <td className="border border-[#333] p-2 text-center">{project.chain}</td>
                <td className="border border-[#333] p-2 text-center">{project.status}</td>
                <td className="border border-[#333] p-2 text-center">
                  <a href={project.twitter} target="_blank" className="text-blue-500">
                    Twitter
                  </a>
                </td>
                <td className="border border-[#333] p-2 text-center">{project.cost}</td>
                <td className="border border-[#333] p-2 text-center">
                  <button onClick={() => handleEdit(index)} className="text-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(index)} className="text-red-500 ml-2">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-center text-xl font-bold mb-4">{editingProjectIndex !== null ? 'Edit' : 'Add'} Project</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Type
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Chain
                <input
                  type="text"
                  name="chain"
                  value={formData.chain}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Status
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Cost
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Twitter
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Website
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md"
                />
              </label>
              <div className="mt-4 flex justify-center gap-4">
                <button type="submit" className="bg-[#4A90E2] text-white px-4 py-2 rounded-md">
                  {loading ? 'Processing...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
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
