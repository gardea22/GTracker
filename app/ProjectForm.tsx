import React from 'react';
import { Project } from './ProjectForm';

type ProjectFormProps = {
  formData: Project;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  loading: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectForm = ({ formData, handleSubmit, handleChange, loading, setShowModal }: ProjectFormProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#2b2b2b] p-8 rounded-xl w-full max-w-lg text-white shadow-lg">
        <h2 className="text-[#4A90E2] text-xl font-semibold text-center mb-4">Add or Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex-1">
              <input name="name" type="text" placeholder="Project Name" required value={formData.name} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
              <select name="type" required value={formData.type} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]">
                <option value="" disabled>Type</option>
                <option value="Testnet">Testnet</option>
                <option value="DePin">DePin</option>
                <option value="Point">Point</option>
                <option value="MiniApp">MiniApp</option>
                <option value="Wallet">Wallet</option>
              </select>
              <select name="chain" required value={formData.chain} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]">
                <option value="" disabled>Chain</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Solana">Solana</option>
                <option value="BNB">BNB</option>
              </select>
            </div>
            <div className="flex-1">
              <select name="status" value={formData.status} onChange={handleChange} required className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]">
                <option value="" disabled>Status</option>
                <option value="Waitlist">Waitlist</option>
                <option value="Early Access">Early Access</option>
                <option value="Active">Active</option>
                <option value="Snapshot">Snapshot</option>
                <option value="Claim">Claim</option>
              </select>
              <input name="cost" type="number" placeholder="Cost" required value={formData.cost} onChange={handleChange} min="0" className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
              <input name="twitter" type="text" placeholder="Twitter" value={formData.twitter} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
              <input name="website" type="text" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full p-3 mt-3 rounded-md bg-[#3b3b3b] text-white text-sm outline-none shadow-inner shadow-[#555]" />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button type="submit" disabled={loading} className="bg-[#4A90E2] text-white font-bold px-5 py-2 rounded-md mr-2">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="bg-[#444] text-white font-bold px-5 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
