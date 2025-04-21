import { useState } from "react";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [projectList, setProjectList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    chain: "",
    status: "",
    cost: "",
    twitter: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi penambahan proyek ke daftar
    setTimeout(() => {
      setProjectList([...projectList, formData]);
      setLoading(false);
      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        type: "",
        chain: "",
        status: "",
        cost: "",
        twitter: "",
        website: "",
      });
    }, 1000);
  };

  const handleEdit = (project) => {
    setFormData(project);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedList = projectList.filter((_, i) => i !== index);
    setProjectList(updatedList);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Project Dashboard</h1>
      
      {/* Daftar proyek */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Cost</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project, index) => (
              <tr key={index} className="bg-gray-700 text-white">
                <td className="px-6 py-3">{project.title}</td>
                <td className="px-6 py-3">{project.description}</td>
                <td className="px-6 py-3">{project.type}</td>
                <td className="px-6 py-3">{project.status}</td>
                <td className="px-6 py-3">{project.cost}</td>
                <td className="px-6 py-3">
                  <button onClick={() => handleEdit(project)} className="text-blue-500 mx-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-500 mx-2">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button untuk membuka modal */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-6 bg-[#4A90E2] text-white px-6 py-3 rounded-md w-full max-w-sm font-semibold"
      >
        Add Project
      </button>

      {/* Modal untuk menambahkan atau mengedit proyek */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#2D2D2D] p-6 rounded-md w-96">
            <h2 className="text-white text-xl mb-4">{formData.title ? "Edit Project" : "Add Project"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                type="text"
                placeholder="Title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              />
              <textarea
                name="description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              ></textarea>
              <input
                name="type"
                type="text"
                placeholder="Type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              />
              <input
                name="chain"
                type="text"
                placeholder="Chain"
                required
                value={formData.chain}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              />
              <input
                name="status"
                type="text"
                placeholder="Status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              />
              <input
                name="cost"
                type="number"
                placeholder="Cost"
                required
                value={formData.cost}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              />
              <input
                name="twitter"
                type="text"
                placeholder="Twitter Link"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              />
              <input
                name="website"
                type="text"
                placeholder="Website Link"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 mb-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]"
              />

              <div className="mt-4 flex justify-center gap-4">
                <button type="submit" className="bg-[#4A90E2] text-white px-6 py-3 rounded-md w-full max-w-sm font-semibold" disabled={loading}>
                  {loading ? "Saving..." : "Save Project"}
                </button>
                <button onClick={() => setShowModal(false)} className="bg-[#FF0000] text-white px-6 py-3 rounded-md w-full max-w-sm font-semibold">
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
