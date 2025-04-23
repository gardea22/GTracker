"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

type Project = {
  name: string;
  twitterUrl: string;
  websiteUrl: string;
  logoUrl: string;
  useTwitterAvatar: boolean;
  only24h: boolean;
};

const Dashboard = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Project>({
    name: "",
    twitterUrl: "",
    websiteUrl: "",
    logoUrl: "",
    useTwitterAvatar: false,
    only24h: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjectList(JSON.parse(savedProjects));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projectList));
  }, [projectList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const extractUsername = (url: string): string => {
    const match = url.match(/twitter\.com\/([A-Za-z0-9_]+)/);
    return match ? match[1] : "";
  };

  const handleAddProject = () => {
    if (!formData.name || !formData.twitterUrl || !formData.websiteUrl) {
      toast.error("Please fill out all required fields!");
      return;
    }

    setProjectList((prev) => [...prev, formData]);
    setFormData({
      name: "",
      twitterUrl: "",
      websiteUrl: "",
      logoUrl: "",
      useTwitterAvatar: false,
      only24h: false,
    });
    toast.success("Project added!");
  };

  const handleRemoveProject = (index: number) => {
    const updated = [...projectList];
    updated.splice(index, 1);
    setProjectList(updated);
    toast.success("Project removed.");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center">🚀 GTracker Dashboard</h1>

      <div className="space-y-4 border p-4 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold">➕ Add New Project</h2>

        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="twitterUrl"
          placeholder="Twitter URL"
          value={formData.twitterUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="websiteUrl"
          placeholder="Website URL"
          value={formData.websiteUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="logoUrl"
          placeholder="Custom Logo URL (optional)"
          value={formData.logoUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="useTwitterAvatar"
              checked={formData.useTwitterAvatar}
              onChange={handleChange}
            />
            Use Twitter Avatar
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="only24h"
              checked={formData.only24h}
              onChange={handleChange}
            />
            Only Show 24 Hours
          </label>
        </div>
        <button
          onClick={handleAddProject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">📋 Project List</h2>
        {projectList.map((project, index) => {
          const username = extractUsername(project.twitterUrl);
          const avatarSrc =
            project.logoUrl ||
            (project.useTwitterAvatar && username
              ? `/api/twitter-avatar?username=${username}`
              : "/default-avatar.png");

          return (
            <div
              key={`${project.name}-${index}`}
              className="border p-4 rounded-lg flex items-center gap-4 bg-white shadow-sm"
            >
              <Image
                src={avatarSrc}
                alt={`${project.name} logo`}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{project.name}</h3>
                <p className="text-sm text-gray-500">
                  <a
                    href={project.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Twitter
                  </a>{" "}
                  |{" "}
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Website
                  </a>
                </p>
              </div>
              <button
                onClick={() => handleRemoveProject(index)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
