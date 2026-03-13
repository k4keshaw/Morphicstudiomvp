import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Clapperboard,
  Layout as LayoutIcon,
  Film,
  Video,
  Download,
  Settings as SettingsIcon,
  CreditCard,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import logo from "figma:asset/bef62a5c6adfaf9bb022e4dac91c5eb3bf5c28fd.png";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/scripts", label: "Scripts", icon: FileText },
  { path: "/scenes", label: "Scenes", icon: Clapperboard },
  { path: "/storyboard", label: "Storyboard", icon: LayoutIcon },
  { path: "/animation", label: "Scene Animation", icon: Film },
  { path: "/editor", label: "Video Editor", icon: Video },
  { path: "/exports", label: "Exports", icon: Download },
  { path: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-white/5 bg-[#1a1a1a] flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Morphic Studio" className="h-7" />
        </div>

        <div className="flex items-center gap-5">
          {/* Credits */}
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5">
            <CreditCard className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-sm font-medium">2,450</span>
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium">Alex Morgan</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-56 border-r border-white/5 bg-[#1a1a1a] flex flex-col">
          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
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
  );
}