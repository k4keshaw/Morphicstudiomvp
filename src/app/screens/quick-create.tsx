import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Sparkles,
  Download,
  Image as ImageIcon,
  Video,
  Settings,
  ChevronDown,
  ArrowUp,
  Wand2,
  Aperture,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { QuickCreateCanvas } from "../components/quick-create/quick-create-canvas";
import { QuickCreateSidebar } from "../components/quick-create/quick-create-sidebar";
import { QuickCreateProperties } from "../components/quick-create/quick-create-properties";

export function QuickCreate() {
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [model, setModel] = useState("Nano");
  const [quality, setQuality] = useState("2K");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [style, setStyle] = useState("Default");
  const [variations, setVariations] = useState(1);
  const [enhancePrompt, setEnhancePrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col bg-[#0f0f0f] overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 border-b border-white/10 bg-[#1a1a1a] flex items-center justify-between px-5 flex-shrink-0">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <input
            type="text"
            defaultValue="Untitled Quick Create"
            className="bg-transparent border-none outline-none text-sm font-medium focus:bg-white/5 px-2 py-1 rounded"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 hover:bg-white/10 text-gray-400"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            className="h-8 bg-white text-black hover:bg-gray-200"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <QuickCreateSidebar />

        {/* Center Canvas */}
        <QuickCreateCanvas 
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        {/* Right Properties Panel - Only visible when image is selected */}
        {selectedImage && (
          <QuickCreateProperties 
            imageId={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>

      {/* Floating Prompt Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Prompt Input */}
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-start gap-3">
              <Aperture className="w-5 h-5 text-gray-500 mt-2" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Imagine..."
                className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Options Bar */}
          <div className="px-5 pb-4 flex items-center gap-3 flex-wrap">
            {/* Media Type */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
              {mediaType === "image" ? (
                <ImageIcon className="w-4 h-4 text-gray-400 group-hover:text-white" />
              ) : (
                <Video className="w-4 h-4 text-gray-400 group-hover:text-white" />
              )}
              <span className="text-sm text-gray-300">{mediaType === "image" ? "Image" : "Video"}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            <div className="h-4 w-px bg-white/10" />

            {/* Model */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <Aperture className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">{model}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {/* Quality */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <span className="text-sm text-gray-300">{quality}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {/* Aspect Ratio */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-sm" />
              </div>
              <span className="text-sm text-gray-300">{aspectRatio}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {mediaType === "video" && (
              <>
                <div className="h-4 w-px bg-white/10" />
                
                {/* Style */}
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Wand2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Style: {style}</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </button>
              </>
            )}

            <div className="h-4 w-px bg-white/10" />

            {/* Enhance Prompt */}
            <button
              onClick={() => setEnhancePrompt(!enhancePrompt)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                enhancePrompt
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/5 text-gray-400"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Enhance</span>
            </button>

            {/* Variations */}
            <div className="flex items-center gap-1 bg-black/30 rounded-lg p-1">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setVariations(num)}
                  className={`w-7 h-7 rounded text-xs font-medium transition-all ${
                    variations === num
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Generate Button */}
            <button className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center transition-colors">
              <ArrowUp className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}