import {
  Video,
  Image as ImageIcon,
  Box,
  Frame,
  Scissors,
  MousePointer,
  RectangleHorizontal,
  Maximize2,
  X,
  ChevronDown,
  ArrowUpCircle,
  Download,
} from "lucide-react";
import { Button } from "../ui/button";

interface QuickCreatePropertiesProps {
  imageId: string;
  onClose: () => void;
}

const tools = [
  { icon: Video, label: "Create video" },
  { icon: ImageIcon, label: "Create image" },
  { icon: Box, label: "Create model" },
  { icon: Frame, label: "Use as reference" },
  { icon: Scissors, label: "Auto-segment" },
  { icon: MousePointer, label: "Object selection" },
  { icon: RectangleHorizontal, label: "Region selection" },
  { icon: Maximize2, label: "Resize" },
];

const properties = [
  { label: "Prompt", value: "Enhanced", expanded: true },
  { label: "Type", value: "Image" },
  { label: "Model", value: "Nano Banana 2" },
  { label: "Format", value: "16:9" },
  { label: "Dimensions", value: "2752 × 1536" },
  { label: "Resolution", value: "2K" },
  { label: "Style", value: "Default" },
  { label: "Size", value: "5 MB" },
  { label: "Created", value: "Mar 09, 2026" },
];

export function QuickCreateProperties({ imageId, onClose }: QuickCreatePropertiesProps) {
  return (
    <aside className="w-80 border-l border-white/10 bg-[#1a1a1a] flex flex-col flex-shrink-0 animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h3 className="text-sm font-semibold">Details</h3>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Tools Section */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Tools
            </h4>
          </div>
          <div className="space-y-1">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-gray-300">{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Properties Section */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Properties
            </h4>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {properties.map((prop, idx) => (
              <div key={idx}>
                <div className="text-xs text-gray-500 mb-1">{prop.label}</div>
                {prop.expanded ? (
                  <div className="text-sm text-gray-300 bg-white/5 border border-white/10 rounded px-3 py-2">
                    Morphic enables you to generate, animate, and edit effortlessly using breakthrough visual storytelling.
                  </div>
                ) : (
                  <div className="text-sm text-white">{prop.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upscale Section */}
        <div className="p-4 border-b border-white/10">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-2">
              <ArrowUpCircle className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Upscale</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Download Section */}
        <div className="p-4">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Download</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </aside>
  );
}
