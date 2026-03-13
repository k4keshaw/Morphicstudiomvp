import { useState } from "react";
import {
  FileImage,
  Layers as LayersIcon,
} from "lucide-react";

const tabs = [
  { id: "layers", label: "Layers" },
  { id: "assets", label: "Assets" },
];

export function QuickCreateSidebar() {
  const [activeTab, setActiveTab] = useState("layers");

  return (
    <aside className="w-64 border-r border-white/10 bg-[#1a1a1a] flex flex-col flex-shrink-0">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "text-white border-b-2 border-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "layers" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
              <LayersIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">AI Creative Workspace</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm cursor-pointer">
              <FileImage className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">AI Creative Platform</span>
            </div>
          </div>
        )}

        {activeTab === "assets" && (
          <div className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <FileImage className="w-12 h-12 mx-auto mb-3 text-gray-700" />
              <p className="text-sm">No assets yet</p>
              <p className="text-xs mt-1">Generated images will appear here</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
