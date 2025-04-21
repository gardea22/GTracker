'use client';

import { useEffect, useState } from 'react';

type Project = {
  name: string;
  type: string;
  chain: string;
  status: string;
  cost: number;
  twitter: string;
  website: string;
  checkedAt?: number; // waktu terakhir dicheck
};

export default function GTracker() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Project>({
    name: '',
    type: '',
    chain: '',
    status: '',
    cost: 0,
    twitter: '',
    website: '',
    checkedAt: 0, // default X
  });

  // Cek apakah masih dalam 24 jam setelah dicek
  const isChecked = (checkedAt?: number) => {
    if (!checkedAt) return false;
    const now = Date.now();
    return now - checkedAt < 24 * 60 * 60 * 1000;
  };

  // Toggle check
  const toggleCheck = (index: number) => {
    const updatedProjectList = [...projectList];
    const project = updatedProjectList[index];
    if (isChecked(project.checkedAt)) {
      project.checkedAt = 0;
    } else {
      project.checkedAt = Date.now();
    }
    setProjectList(updatedProjectList);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'cost' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProjectList((prevList) => [...prevList, formData]);
    setFormData({
      name: '',
      type: '',
      chain: '',
      status: '',
      cost: 0,
      twitter: '',
      website: '',
      checkedAt: 0, // reset
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GTracker</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="chain"
          placeholder="Chain"
          value={formData.chain}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={formData.cost}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="twitter"
          placeholder="Twitter"
          value={formData.twitter}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          Add Project
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#333] text-sm">
          <thead>
            <tr className="bg-[#111] text-white">
              <th className="border border-[#333] p-2">No</th>
              <th className="border border-[#333] p-2">Name</th>
              <th className="border border-[#333] p-2">Type</th>
              <th className="border border-[#333] p-2">Chain</th>
              <th className="border border-[#333] p-2">Status</th>
              <th className="border border-[#333] p-2">Cost</th>
              <th className="border border-[#333] p-2">Twitter</th>
              <th className="border border-[#333] p-2">Website</th>
              <th className="border border-[#333] p-2">Check</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project, index) => (
              <tr key={index} className="text-center">
                <td className="border border-[#333] p-2">{index + 1}</td>
                <td className="border border-[#333] p-2">{project.name}</td>
                <td className="border border-[#333] p-2">{project.type}</td>
                <td className="border border-[#333] p-2">{project.chain}</td>
                <td className="border border-[#333] p-2">{project.status}</td>
                <td className="border border-[#333] p-2">${project.cost}</td>
                <td className="border border-[#333] p-2">
                  <a href={project.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Twitter
                  </a>
                </td>
                <td className="border border-[#333] p-2">
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Website
                  </a>
                </td>
                <td className="border border-[#333] p-2 text-center">
                  <button
                    onClick={() => toggleCheck(index)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isChecked(project.checkedAt)
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isChecked(project.checkedAt) ? '✓' : 'X'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
