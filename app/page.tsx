"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  name: string;
  website: string;
  logoUrl?: string;
}

function extractDomain(url: string): string | null {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (e) {
    return null;
  }
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({ name: "", website: "" });

  const handleAddProject = () => {
    if (!newProject.name || !newProject.website) return;
    const id = Date.now();
    setProjects([...projects, { id, ...newProject }]);
    setNewProject({ name: "", website: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">GTracker Dashboard</h1>

      <div className="flex gap-2 mb-6">
        <Input
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleInputChange}
        />
        <Input
          name="website"
          placeholder="Project Website"
          value={newProject.website}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddProject}>Add Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const domain = extractDomain(project.website);
          const avatarSrc = project.logoUrl ||
            (domain ? `https://unavatar.io/${domain}` : "/default-avatar.png");

          return (
            <Card key={project.id} className="rounded-2xl shadow-md">
              <CardContent className="flex items-center space-x-4 p-4">
                <img
                  src={avatarSrc}
                  alt={project.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-lg">{project.name}</p>
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {project.website}
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
