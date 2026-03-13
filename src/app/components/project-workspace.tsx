import { Outlet, NavLink, useParams, Link } from "react-router";
import {
  FileText,
  Video,
  Download,
  ArrowLeft,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

const projectNavItems = [
  { path: "scripts", label: "Script Editor", icon: FileText },
  { path: "editor", label: "Video Editor", icon: Video },
  { path: "exports", label: "Export", icon: Download },
];

// Mock project data - in real app, this would come from API/state
const projectData: Record<string, { name: string; status: string }> = {
  "1": { name: "Sci-Fi Adventure", status: "In Progress" },
  "2": { name: "Mystery Thriller", status: "Draft" },
  "3": { name: "Fantasy Epic", status: "In Progress" },
};

export function ProjectWorkspace() {
  const { projectId } = useParams();
  const project = projectData[projectId || "1"] || { name: "Project", status: "Unknown" };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-screen flex flex-col overflow-hidden bg-[#0f0f0f]">
        {/* Project Header */}
        <header className="h-14 border-b border-white/5 bg-[#1a1a1a] flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">Projects</span>
              </Button>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <h1 className="text-sm font-semibold">{project.name}</h1>
              <p className="text-xs text-gray-500">{project.status}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Share
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Project Sidebar */}
          <aside className="w-56 border-r border-white/5 bg-[#1a1a1a] flex flex-col">
            <div className="p-3 border-b border-white/5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
                Workspace
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
              {projectNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={`/project/${projectId}/${item.path}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded transition-all ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-[#0f0f0f]">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}