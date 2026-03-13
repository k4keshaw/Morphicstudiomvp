import { Outlet, NavLink } from "react-router";
import {
  CreditCard,
  User,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import logo from "figma:asset/bef62a5c6adfaf9bb022e4dac91c5eb3bf5c28fd.png";

export function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0f0f0f]">
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
          <Button className="bg-white text-black hover:bg-gray-200 h-9">
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}