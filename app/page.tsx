'use client';

import React, { useState, useEffect, useCallback } from 'react';

// Tipe data untuk Project
type Project = {
  name: string;
  type: string;
  chain: string;
  status: string;
  cost: number;
  twitter: string | "";
  website: string | "";
  logo?: string;
  autoLogo?: boolean;
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
    autoLogo: true, // default-nya aktif otomatis
	logo: '', // default aman

  });

  // Fungsi untuk memuat data proyek dari localStorage
  const loadProjectsFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjectList(JSON.parse(storedProjects));
    }
  };

  // Fungsi untuk menyimpan data proyek ke localStorage
  const saveProjectsToLocalStorage = (projects: Project[]) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };


	 
const [tick, setTick] = useState(0);

useEffect(() => {
	loadProjectsFromLocalStorage();
	
  const interval = setInterval(() => {
    setTick((t) => t + 1); // trigger re-render tanpa ubah projectList
  }, 1000);
  
  return () => clearInterval(interval);
}, []);


 const resetForm = () => {
  setFormData({
    name: '',
    type: '',
    chain: '',
    status: '',
    cost: 0,
    twitter: '',
    website: '',
    autoLogo: true,
    logo: ''
  });
  setEditingProjectIndex(null);
  setShowModal(false);
  setLoading(false);
};


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

 // Fungsi untuk validasi URL
  const isValidUrl = (url: string) => {
    return url === "" || /^https?:\/\/.+$/.test(url);
  };
  
  
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
      saveProjectsToLocalStorage(updatedProjectList); // Simpan ke localStorage setelah perubahan
    } else {
      // Add new project
      const newProjectList = [...projectList, formData];
      setProjectList(newProjectList);
      saveProjectsToLocalStorage(newProjectList); // Simpan ke localStorage setelah penambahan
    }
	
	resetForm();
	
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
    saveProjectsToLocalStorage(updatedProjectList); // Simpan ke localStorage setelah penghapusan
  };

  const toggleCheck = (index: number) => {
  const updated = [...projectList];
  const now = Date.now();
  const project = updated[index];

  if (!project.checkedUntil || now > project.checkedUntil) {
    // aktifkan check 24 jam
    project.checkedUntil = now + 24 * 60 * 60 * 1000;
  } else {
    // jika sudah check dan diklik lagi, reset jadi belum check
    project.checkedUntil = undefined;
  }

  setProjectList(updated);
  localStorage.setItem('projects', JSON.stringify(updated));
};
  
const getFaviconFromUrl = useCallback((url: string) => {
  try {
    const domain = new URL(url).origin;
    return `${domain}/favicon.ico`;
  } catch {
    return '';
  }
}, []);

const getTimeRemaining = (timestamp?: number) => {
  if (!timestamp) return '';
  const diff = timestamp - Date.now();
  if (diff <= 0) return '';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`;
};

// 👇 Tambahkan ini supaya JSX punya rumah!
export default function Dashboard() {
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
            <th className="border border-[#333] p-2 font-bold w-[300px]">Project</th>
            <th className="border border-[#333] p-2 font-bold w-[80px]">Check</th>
            <th className="border border-[#333] p-2 font-bold">Type</th>
            <th className="border border-[#333] p-2 font-bold">Chain</th>
            <th className="border border-[#333] p-2 font-bold">Status</th>
            <th className="border border-[#333] p-2 font-bold">Link</th>
            <th className="border border-[#333] p-2 font-bold w-[100px]">Cost</th>
            <th className="border border-[#333] p-2 font-bold">Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

		
		
		
        <tbody>
		  {projectList.length === 0 ? (
            <tr>
              <td colSpan={8} className="border border-[#333] p-2 text-center bg-[#1e1e2f]">
                No projects available
              </td>
            </tr>
          ) : (
		  
		  
{projectList.map((project, index) => {
	
  const isChecked = project.checkedUntil && Date.now() < project.checkedUntil;
  const timeLeft = getTimeRemaining(project.checkedUntil);

  return (
    <tr key={index} className="bg-[#1e1e2f]">
      {/* Nama + Logo */}
      <td className="border border-[#333] p-2">
        <div className="flex items-center gap-2">
          {project.website && (
            <img
              src={project.autoLogo ? getFaviconFromUrl(project.website) : project.logo || '/default-avatar.png'}
              alt={`${project.name} logo`}
              className="w-6 h-6 rounded-full object-contain"
              onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
            />
          )}
          <span>{project.name}</span>
        </div>
      </td>

      {/* Check 24 jam */}
      <td className="border border-[#333] p-2">
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => toggleCheck(index)}
            title="Toggle Check 24h"
            className={`text-lg ${isChecked ? 'text-green-400' : 'text-red-400'}`}
          >
            {isChecked ? '✅' : '❌'}
          </button>
          {isChecked && <span className="text-sm text-gray-400">{timeLeft}</span>}
        </div>
      </td>

      {/* Info dasar */}
      <td className="border border-[#333] p-2 text-center">{project.type}</td>
      <td className="border border-[#333] p-2 text-center">{project.chain}</td>
      <td className="border border-[#333] p-2 text-center">{project.status}</td>

      {/* Link sosial */}
      <td className="border border-[#333] p-2 text-center">
        {project.twitter && (
          <a href={project.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
            <div className="w-5 h-5 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white text-sm">X</div>
          </a>
        )}
        {project.website && (
          <a href={project.website} target="_blank" rel="noopener noreferrer" className="ml-2" title="Website">
            <div className="w-5 h-5 rounded-full bg-[#00BFFF] flex items-center justify-center text-white text-sm">🌐</div>
          </a>
        )}
      </td>

      {/* Cost */}
      <td className="border border-[#333] p-2 text-center">${project.cost}</td>

      {/* Action Button */}
      <td className="border border-[#333] p-2 text-center space-x-2">
        <button
          onClick={() => handleEdit(index)}
          className="text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(index)}
          className="text-red-500 hover:text-red-400 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
})}

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
                    <option value="" disabled>Chain</option>
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
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
                  >
                    <option value="" disabled>Status</option>
                    <option value="Waitlist">Waitlist</option>
                    <option value="Early Access">Early Access</option>
                    <option value="Active">Active</option>
                    <option value="Snapshot">Snapshot</option>
                    <option value="Claim">Claim</option>
                    <option value="End">End</option>
                  </select>
                  <input
                    name="cost"
                    type="number"
                    placeholder="Cost"
                    required
                    value={formData.cost}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
                  />
                  <input
                    name="twitter"
                    type="text"
                    placeholder="Twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
                  />
                  <input
                    name="website"
                    type="text"
                    placeholder="Website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
                  />
				  
				  
				<div className="mt-3 flex items-center gap-2">
				<input
					type="checkbox"
					checked={formData.autoLogo}
					onChange={(e) => setFormData((prev) => ({ ...prev, autoLogo: e.target.checked }))}
				/>
				<label className="text-sm">Ambil logo otomatis dari website</label>
				</div>
				{!formData.autoLogo && (
				<input
					type="text"
					name="logo"
					placeholder="Logo URL (https://...)"
					value={formData.logo}
					onChange={handleChange}
					className="w-full p-3 mt-2 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
				/>
				)}

				  
				  
                </div>
              </div>
              <div className="mt-6 text-center">
                <button type="submit" disabled={loading} className="bg-[#4A90E2] text-white font-bold px-5 py-2 rounded-md mr-2">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
	  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="bg-[#444] text-white font-bold px-5 py-2 rounded-md">
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