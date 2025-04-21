'use client';

import React, { useState, useEffect } from 'react';

type Project = {
  name: string;
  type: string;
  chain: string;
  status: string;
  cost: number;
  twitter: string | "";
  website: string | "";
  checked: boolean;
  checkedAt: number | null;
};

const Home = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Project>({
    name: '',
    type: '',
    chain: '',
    status: '',
    cost: 0,
    twitter: '',
    website: '',
    checked: false,
    checkedAt: null
  });

  // Load dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem('projects');
    if (stored) {
      const data: Project[] = JSON.parse(stored);
      const now = Date.now();
      const updated = data.map(project => {
        if (project.checked && project.checkedAt) {
          const diff = now - project.checkedAt;
          const hours24 = 24 * 60 * 60 * 1000;
          if (diff > hours24) {
            return { ...project, checked: false, checkedAt: null };
          }
        }
        return project;
      });
      setProjectList(updated);
    }
  }, []);

  // Simpan ke localStorage setiap kali projectList berubah
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projectList));
  }, [projectList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'cost' ? +value : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProjectList(prev => [...prev, formData]);
    setFormData({
      name: '',
      type: '',
      chain: '',
      status: '',
      cost: 0,
      twitter: '',
      website: '',
      checked: false,
      checkedAt: null
    });
  };

  const handleToggleCheck = (index: number) => {
    const updatedProjects = [...projectList];
    const now = Date.now();

    if (!updatedProjects[index].checked) {
      updatedProjects[index].checked = true;
      updatedProjects[index].checkedAt = now;
    } else {
      updatedProjects[index].checked = false;
      updatedProjects[index].checkedAt = null;
    }

    setProjectList(updatedProjects);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border" />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="p-2 border" />
        <input name="chain" value={formData.chain} onChange={handleChange} placeholder="Chain" className="p-2 border" />
        <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" className="p-2 border" />
        <input name="cost" type="number" value={formData.cost} onChange={handleChange} placeholder="Cost" className="p-2 border" />
        <input name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Twitter" className="p-2 border" />
        <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-2">Add Project</button>
      </form>

      <table className="w-full border-collapse border border-[#333] text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-[#333] p-2">#</th>
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
                {project.twitter && (
                  <a href={project.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Twitter
                  </a>
                )}
              </td>
              <td className="border border-[#333] p-2">
                {project.website && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Website
                  </a>
                )}
              </td>
              <td className="border border-[#333] p-2">
                <button
                  onClick={() => handleToggleCheck(index)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    project.checked ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                  title={project.checked ? "Checked" : "Unchecked"}
                >
                  {project.checked ? '✔' : 'X'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
