import React from 'react';
import { Project } from './types';

type ProjectTableProps = {
  projectList: Project[];
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  toggleCheck: (index: number) => void;
};

const ProjectTable = ({ projectList, handleEdit, handleDelete, toggleCheck }: ProjectTableProps) => {
  return (
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
          projectList.map((project, index) => (
            <tr key={index} className="bg-[#1e1e2f]">
              <td className="border border-[#333] p-2 text-center">{project.name}</td>
              <td className="border border-[#333] p-2">
                <button onClick={() => toggleCheck(index)} className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-colors" style={{
                  backgroundColor: project.checkedUntil && project.checkedUntil > Date.now() ? '#4A90E2' : '#b91c1c', color: 'white',
                }}>
                  {project.checkedUntil && project.checkedUntil > Date.now() ? '✔' : '✘'}
                </button>
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
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProjectTable;
