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
  checkedUntil?: number;
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
    autoLogo: true,
    logo: ''
  });

  const loadProjectsFromLocalStorage = () => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjectList(JSON.parse(storedProjects));
    }
  };

  const saveProjectsToLocalStorage = (projects: Project[]) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const [tick, setTick] = useState(0);

  useEffect(() => {
    loadProjectsFromLocalStorage();
    const interval = setInterval(() => {
      setTick((t) => t + 1);
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

  const isValidUrl = (url: string) => {
    return url === "" || /^https?:\/\/.+$/.test(url);
  };

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
      saveProjectsToLocalStorage(updatedProjectList);
    } else {
      const newProjectList = [...projectList, formData];
      setProjectList(newProjectList);
      saveProjectsToLocalStorage(newProjectList);
    }

    resetForm();
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
    saveProjectsToLocalStorage(updatedProjectList);
  };

  const toggleCheck = (index: number) => {
    const updated = [...projectList];
    const now = Date.now();
    const project = updated[index];

    if (!project.checkedUntil || now > project.checkedUntil) {
      project.checkedUntil = now + 24 * 60 * 60 * 1000;
    } else {
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

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="font-sans p-4 bg-[#1e1e2f] min-h-screen text-white">
      {/* Konten lainnya sudah rapi, lanjutkan di kanvas */}
    </div>
  );
};

export default Dashboard;
