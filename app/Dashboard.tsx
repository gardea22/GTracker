'use client';

import React, { useState } from 'react';
import { Project } from './Types';
import ProjectForm from './ProjectForm';
import ProjectTable from './ProjectTable';

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
    return url === "" || /^https?:\/\/.+$/.test(url);
  };

  const handleEdit = (index: number) => {
    setEditingProjectIndex(index);
    setFormData(projectList[index]);
    setShowModal(true);
  };

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
      updatedList[index].checkedUntil = now + 24 * 60 * 60 * 1000;
    }

    setProjectList(updatedList);
  };

  return (
    <div className="font-sans p-4 bg-[#1e1e2f] min-h-screen text-white">
      <h1 className="text-center text-[#4A90E2] text-2xl font-bold">GTracker</h1>
      <button onClick={() => setShowModal(true)} className="bg-[#4A90E2] text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center">+</button>
      <ProjectTable projectList={projectList} handleEdit={handleEdit} handleDelete={handleDelete} toggleCheck={toggleCheck} />
      {showModal && (
        <ProjectForm 
          formData={formData} 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          loading={loading} 
          setShowModal={setShowModal} 
        />
      )}
    </div>
  );
};

export default Dashboard;
