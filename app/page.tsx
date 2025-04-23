"use client";

import { useEffect, useState } from "react";
import { Dashboard } from "@/components/dashboard";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function Home() {
  const projects = useLiveQuery(() => db.projects.toArray(), []);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    setIsLoading(true);
    const { hostname } = new URL(inputValue);

    await db.projects.add({
      name: hostname,
      url: inputValue,
      logo: `https://www.google.com/s2/favicons?sz=64&domain_url=${inputValue}`,
      createdAt: new Date(),
    });

    setInputValue("");
    setIsLoading(false);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="url"
            placeholder="https://example.com"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
      <Dashboard projects={projects || []} />
    </main>
  );
}
