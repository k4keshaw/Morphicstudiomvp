import { Link } from "react-router";
import { Button } from "../components/ui/button";
import {
  Plus,
  FileText,
  FolderOpen,
  Clock,
  Play,
  MoreHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    name: "Sci-Fi Adventure",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    scenes: 12,
    duration: "4m 32s",
    status: "In Progress",
    lastEdited: "2 hours ago",
    progress: 65,
  },
  {
    id: 2,
    name: "Mystery Thriller",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    scenes: 8,
    duration: "3m 10s",
    status: "Draft",
    lastEdited: "1 day ago",
    progress: 30,
  },
  {
    id: 3,
    name: "Fantasy Epic",
    thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
    scenes: 15,
    duration: "6m 45s",
    status: "In Progress",
    lastEdited: "3 hours ago",
    progress: 80,
  },
  {
    id: 4,
    name: "Urban Documentary",
    thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    scenes: 6,
    duration: "2m 18s",
    status: "Completed",
    lastEdited: "5 days ago",
    progress: 100,
  },
  {
    id: 5,
    name: "Horror Short",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    scenes: 10,
    duration: "3m 52s",
    status: "In Progress",
    lastEdited: "12 hours ago",
    progress: 45,
  },
  {
    id: 6,
    name: "Romance Drama",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    scenes: 9,
    duration: "3m 28s",
    status: "Draft",
    lastEdited: "3 days ago",
    progress: 20,
  },
  {
    id: 7,
    name: "Action Thriller",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    scenes: 14,
    duration: "5m 12s",
    status: "In Progress",
    lastEdited: "6 hours ago",
    progress: 55,
  },
  {
    id: 8,
    name: "Comedy Sketch",
    thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
    scenes: 7,
    duration: "2m 45s",
    status: "Completed",
    lastEdited: "2 weeks ago",
    progress: 100,
  },
];

export function Dashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-full">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Start Section - Compact */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Quick Start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button className="bg-[#1a1a1a] border border-white/10 rounded p-3 hover:border-white/20 hover:bg-[#202020] transition-all text-left group flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold">Create New Story</h3>
                <p className="text-xs text-gray-600">Start with AI assistance</p>
              </div>
            </button>

            <button className="bg-[#1a1a1a] border border-white/10 rounded p-3 hover:border-white/20 hover:bg-[#202020] transition-all text-left group flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                <FileText className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold">Import Script</h3>
                <p className="text-xs text-gray-600">Upload screenplay</p>
              </div>
            </button>

            <button className="bg-[#1a1a1a] border border-white/10 rounded p-3 hover:border-white/20 hover:bg-[#202020] transition-all text-left group flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                <FolderOpen className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold">Blank Project</h3>
                <p className="text-xs text-gray-600">Empty workspace</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Recent Projects
            </h2>
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex items-center gap-0.5 bg-[#1a1a1a] border border-white/10 rounded p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white/10 text-white"
                      : "text-gray-500 hover:text-gray-400"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-white/10 text-white"
                      : "text-gray-500 hover:text-gray-400"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {projects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}/scripts`}>
                  <div className="bg-[#1a1a1a] border border-white/10 rounded overflow-hidden hover:border-white/20 transition-all group cursor-pointer">
                    {/* Compact Thumbnail */}
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-2 left-2">
                        <div
                          className={`px-1.5 py-0.5 rounded text-xs font-medium backdrop-blur-sm ${
                            project.status === "Completed"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : project.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                          }`}
                        >
                          {project.status}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {project.status === "In Progress" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Compact Project Info */}
                    <div className="p-2.5">
                      <h3 className="font-semibold text-xs truncate mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{project.scenes} scenes</span>
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{project.lastEdited}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="bg-[#1a1a1a] border border-white/10 rounded overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2.5 border-b border-white/5 bg-white/5">
                <div className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Project Name
                </div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">
                  Scenes
                </div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Duration
                </div>
                <div className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Status
                </div>
                <div className="col-span-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Last Edited
                </div>
              </div>

              {/* Table Rows */}
              {projects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}/scripts`}>
                  <div className="grid grid-cols-12 gap-4 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    {/* Name with Thumbnail */}
                    <div className="col-span-5 flex items-center gap-2.5">
                      <div className="relative w-12 h-8 rounded overflow-hidden bg-black flex-shrink-0">
                        <img
                          src={project.thumbnail}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{project.name}</p>
                      </div>
                    </div>

                    {/* Scenes */}
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="text-sm text-gray-400">{project.scenes}</span>
                    </div>

                    {/* Duration */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-400">{project.duration}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex items-center">
                      <div
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          project.status === "Completed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : project.status === "In Progress"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>

                    {/* Last Edited */}
                    <div className="col-span-1 flex items-center">
                      <span className="text-sm text-gray-500 truncate">{project.lastEdited}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}