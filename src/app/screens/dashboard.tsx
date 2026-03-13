import { Link } from "react-router";
import { Button } from "../components/ui/button";
import {
  Plus,
  FileText,
  FolderOpen,
  Clock,
  Play,
  MoreHorizontal,
} from "lucide-react";

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
];

export function Dashboard() {
  return (
    <div className="min-h-full">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Quick Start Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Quick Start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 hover:border-white/20 hover:bg-[#202020] transition-all text-left group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors">
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-1">Create New Story</h3>
              <p className="text-sm text-gray-500">
                Start from scratch with AI assistance
              </p>
            </button>

            <button className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 hover:border-white/20 hover:bg-[#202020] transition-all text-left group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors">
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-1">Import Script</h3>
              <p className="text-sm text-gray-500">
                Upload an existing screenplay
              </p>
            </button>

            <button className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 hover:border-white/20 hover:bg-[#202020] transition-all text-left group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors">
                <FolderOpen className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-1">Start Blank Project</h3>
              <p className="text-sm text-gray-500">
                Begin with an empty workspace
              </p>
            </button>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Recent Projects
            </h2>
            <Button variant="ghost" size="sm" className="text-xs h-8">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link key={project.id} to={`/project/${project.id}/scripts`}>
                <div className="bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all group cursor-pointer">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm ${
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
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm truncate flex-1">
                        {project.name}
                      </h3>
                      <button 
                        className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span>{project.scenes} scenes</span>
                      <span>•</span>
                      <span>{project.duration}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>Last edited {project.lastEdited}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}