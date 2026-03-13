import { Outlet, NavLink, useLocation } from "react-router";
import {
  CreditCard,
  User,
  Plus,
  Search,
  Home,
  Star,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import logo from "figma:asset/bef62a5c6adfaf9bb022e4dac91c5eb3bf5c28fd.png";
import { useState } from "react";
import { CreationModeModal } from "./creation-mode-modal";

const workspaceItems = [
  { path: "/", label: "All Projects", icon: Home },
  { path: "/private", label: "Private", icon: User },
  { path: "/favorites", label: "Favorites", icon: Star },
  { path: "/shared", label: "Shared with me", icon: Users },
];

const learningItems = [
  { path: "/learn", label: "Learn", icon: BookOpen },
  { path: "/tutorials", label: "Tutorials", icon: GraduationCap },
  { path: "/docs", label: "Documentation", icon: FileText },
];

export function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-screen flex flex-col overflow-hidden bg-[#0f0f0f]">
        <CreationModeModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />

        {/* Top Header */}
        <header className="h-14 border-b border-white/5 bg-[#1a1a1a] flex items-center justify-between px-5 gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img src={logo} alt="Morphic Studio" className="h-7" />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full h-9 bg-white/5 border border-white/10 rounded px-3 pl-9 text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-colors"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Credits */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10">
              <CreditCard className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm font-medium">2,450</span>
              <span className="text-xs text-gray-500">credits</span>
            </div>

            {/* Create New Story Button */}
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-white text-black hover:bg-gray-200 h-9"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Story
            </Button>

            {/* User */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 cursor-pointer transition-colors">
                <User className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <aside
            className={`border-r border-white/5 bg-[#1a1a1a] flex flex-col transition-all duration-300 ${
              isCollapsed ? "w-16" : "w-56"
            }`}
          >
            {/* Toggle Button */}
            <div className="p-2 border-b border-white/5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`w-full h-8 flex items-center justify-center hover:bg-white/10 transition-all ${
                  isCollapsed ? "px-0" : "justify-start px-2"
                }`}
              >
                {isCollapsed ? (
                  <Home className="w-4 h-4" />
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    <span className="text-xs">Collapse</span>
                  </>
                )}
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
              {/* Workspace Section */}
              <div className="space-y-0.5">
                {!isCollapsed && (
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide px-2 mb-2">
                    Workspace
                  </p>
                )}
                {workspaceItems.map((item) => {
                  const Icon = item.icon;
                  const navLinkContent = (
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded transition-all ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                        } ${isCollapsed ? "justify-center" : ""}`
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.label}</span>}
                    </NavLink>
                  );

                  if (isCollapsed) {
                    return (
                      <Tooltip key={item.path}>
                        <TooltipTrigger asChild>
                          <div>{navLinkContent}</div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-[#2a2a2a] border-white/10">
                          <p className="text-xs">{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <div key={item.path}>{navLinkContent}</div>;
                })}
              </div>

              {/* Learning Section */}
              <div className="space-y-0.5">
                {!isCollapsed && (
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide px-2 mb-2">
                    Learning
                  </p>
                )}
                {learningItems.map((item) => {
                  const Icon = item.icon;
                  const navLinkContent = (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded transition-all ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                        } ${isCollapsed ? "justify-center" : ""}`
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{item.label}</span>}
                    </NavLink>
                  );

                  if (isCollapsed) {
                    return (
                      <Tooltip key={item.path}>
                        <TooltipTrigger asChild>
                          <div>{navLinkContent}</div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-[#2a2a2a] border-white/10">
                          <p className="text-xs">{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <div key={item.path}>{navLinkContent}</div>;
                })}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}