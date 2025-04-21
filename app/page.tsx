"use client";
import { useState } from "react";

type Project = {
  name: string;
  cost: number;
  twitter: string;
  website: string;
  checked: boolean;
};

export default function Home() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    name: "",
    cost: 0,
    twitter: "",
    website: "",
    checked: false,
  });

  const [submitMessage, setSubmitMessage] = useState<string>("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setSubmitMessage(""); // clear message saat buka modal baru
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.cost || !newProject.twitter || !newProject.website) {
      alert("Semua field harus diisi!");
      return;
    }

    if (!isValidUrl(newProject.twitter) || !isValidUrl(newProject.website)) {
      alert("URL Twitter dan Website tidak valid!");
      return;
    }

    setProjectList((prev) => [...prev, newProject]);
    setNewProject({
      name: "",
      cost: 0,
      twitter: "",
      website: "",
      checked: false,
    });
    setShowPopup(false);
    setSubmitMessage("✅ Proyek berhasil ditambahkan!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Project Dashboard</h1>

        {/* Submit Message */}
        {submitMessage && <div className="mb-4 text-green-600">{submitMessage}</div>}

        <button
          onClick={togglePopup}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Project
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Add New Project</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={newProject.name}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="cost"
                  value={newProject.cost}
                  onChange={handleChange}
                  placeholder="Cost"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="url"
                  name="twitter"
                  value={newProject.twitter}
                  onChange={handleChange}
                  placeholder="Twitter Link"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="url"
                  name="website"
                  value={newProject.website}
                  onChange={handleChange}
                  placeholder="Website Link"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={togglePopup}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Cost</th>
              <th className="border p-2">Twitter</th>
              <th className="border p-2">Website</th>
              <th className="border p-2">Check</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project) => (
              <tr key={project.name}>
                <td className="border p-2">{project.name}</td>
                <td className="border p-2">${project.cost}</td>
                <td className="border p-2">
                  <a href={project.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Twitter
                  </a>
                </td>
                <td className="border p-2">
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Website
                  </a>
                </td>
                <td className="border p-2 text-center">{project.checked ? "✔️" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
