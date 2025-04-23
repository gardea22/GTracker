'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Tipe data untuk Project
type Project = {
  name: string;
  type: string;
  chain: string;
  status: string;
  cost: number;
  twitter: string;
  website: string;
  checkedUntil?: number; // waktu dalam timestamp
  logoUrl?: string;
};

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project>({
    name: '',
    type: '',
    chain: '',
    status: '',
    cost: 0,
    twitter: '',
    website: '',
  });
  const [useTwitterAvatar, setUseTwitterAvatar] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidUrl(formData.twitter) || !isValidUrl(formData.website)) {
      alert("Twitter atau Website URL tidak valid (harus diawali http:// atau https://)");
      setLoading(false);
      return;
    }

    if (formData.cost < 0) {
      alert("Cost tidak boleh kurang dari 0.");
      setLoading(false);
      return;
    }

    if (editingProjectIndex !== null) {
      const updatedProjectList = [...projectList];
      updatedProjectList[editingProjectIndex] = formData;
      setProjectList(updatedProjectList);
    } else {
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
    setEditingProjectIndex(null);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidUrl = (url: string) => {
    return url === '' || /^https?:\/\/.+$/.test(url);
  };

  const handleEdit = (index: number) => {
    setEditingProjectIndex(index);
    setFormData(projectList[index]);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus proyek ini?")) return;
    const updatedProjectList = projectList.filter((_, i) => i !== index);
    setProjectList(updatedProjectList);
  };

  const toggleCheck = (index: number) => {
    const now = Date.now();
    const updatedList = [...projectList];
    const isChecked = updatedList[index].checkedUntil && updatedList[index].checkedUntil! > now;
    updatedList[index].checkedUntil = isChecked ? 0 : now + 24 * 60 * 60 * 1000;
    setProjectList(updatedList);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "gtracker_upload");

    const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
      method: "POST",
      body: formDataUpload,
    });

    const data = await res.json();
    setFormData((prev) => ({ ...prev, logoUrl: data.secure_url }));
  };

  const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const match = url.match(/twitter\.com\/([a-zA-Z0-9_]+)/);
    const username = match?.[1];

    setFormData((prev) => ({
      ...prev,
      twitter: url,
      logoUrl: username ? `/api/twitter-avatar?username=${username}` : prev.logoUrl,
    }));
  };

  return (
    <div className="font-sans p-4 bg-[#1e1e2f] min-h-screen text-white">
      <h1 className="text-center text-[#4A90E2] text-2xl font-bold">GTracker</h1>
      <div className="flex justify-start mb-4">
        <button onClick={() => setShowModal(true)} className="bg-[#4A90E2] text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center">
          +
        </button>
      </div>
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
        <tbody>
          {projectList.length === 0 ? (
            <tr>
              <td colSpan={8} className="border border-[#333] p-2 text-center bg-[#1e1e2f]">
                No projects available
              </td>
            </tr>
          ) : (
            projectList.map((project, index) => {
              const username = project.twitter.match(/twitter\.com\/([a-zA-Z0-9_]+)/)?.[1];
              const avatarSrc = project.logoUrl ||
                (useTwitterAvatar && username ? `/api/twitter-avatar?username=${username}` : "/default-avatar.png");
              return (
                <tr key={index} className="bg-[#1e1e2f]">
                  <td className="border border-[#333] p-2 text-center">
                    <div className="flex items-center gap-3">
                      <Image src={avatarSrc} alt="Twitter Avatar" width={40} height={40} className="rounded-full" />
                      <h2 className="text-lg font-semibold">{project.name}</h2>
                    </div>
                  </td>
                  <td className="border border-[#333] p-2">
                    <div className="flex justify-center items-center">
                      <button onClick={() => toggleCheck(index)} className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                        style={{
                          backgroundColor: project.checkedUntil && project.checkedUntil > Date.now() ? '#4A90E2' : '#b91c1c',
                          color: 'white',
                        }}
                        title={project.checkedUntil && project.checkedUntil > Date.now() ? 'Checked (klik untuk reset)' : 'Not checked (klik untuk centang)'}>
                        {project.checkedUntil && project.checkedUntil > Date.now() ? '✔' : '✘'}
                      </button>
                    </div>
                  </td>
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
                    <button onClick={() => handleEdit(index)} className="text-yellow-400 hover:text-yellow-500">Edit</button>
                    <button onClick={() => handleDelete(index)} className="ml-2 text-red-500 hover:text-red-600">Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#2b2b2b] p-8 rounded-xl w-full max-w-lg text-white shadow-lg">
            <h2 className="text-[#4A90E2] text-xl font-semibold text-center mb-4">{editingProjectIndex !== null ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input name="name" type="text" placeholder="Project Name" required value={formData.name} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm" />
                  <select name="type" required value={formData.type} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm">
                    <option value="" disabled>Type</option>
                    <option value="Testnet">Testnet</option>
                    <option value="DePin">DePin</option>
                    <option value="Point">Point</option>
                    <option value="MiniApp">MiniApp</option>
                    <option value="Wallet">Wallet</option>
                  </select>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm" />
                  <select name="chain" required value={formData.chain} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm">
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
                  <select name="status" value={formData.status} onChange={handleChange} required className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm">
                    <option value="" disabled>Status</option>
                    <option value="Waitlist">Waitlist</option>
                    <option value="Early Access">Early Access</option>
                    <option value="Active">Active</option>
                    <option value="Snapshot">Snapshot</option>
                    <option value="Claim">Claim</option>
                    <option value="End">End</option>
                  </select>
                  <input name="cost" type="number" placeholder="Cost" required value={formData.cost} onChange={handleChange} min="0" className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm" />
                  <input name="twitter" type="text" placeholder="Twitter" value={formData.twitter} onChange={handleTwitterChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm" />
                  <label className="flex items-center gap-2 text-sm mt-3">
                    <input type="checkbox" checked={useTwitterAvatar} onChange={() => setUseTwitterAvatar(!useTwitterAvatar)} />
                    Gunakan gambar dari Twitter?
                  </label>
                  <input name="website" type="text" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm" />
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