import { useNavigate } from "react-router";
import { Zap, Clapperboard, X } from "lucide-react";

interface CreationModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modes = [
  {
    id: "quick",
    icon: Zap,
    title: "Quick Create",
    description: "Generate a single image or short video from a prompt.",
  },
  {
    id: "film",
    icon: Clapperboard,
    title: "Create Film",
    description: "Create a cinematic video using a story workflow.",
  },
];

export function CreationModeModal({ isOpen, onClose }: CreationModeModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleModeSelect = (modeId: string) => {
    // Close modal and navigate to new project
    onClose();
    
    if (modeId === "quick") {
      navigate("/quick-create");
    } else {
      // Create Film mode navigates to full project workspace
      navigate("/project/1/scripts");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full p-8 pointer-events-auto animate-in zoom-in-95 fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Choose Creation Mode</h2>
              <p className="text-sm text-gray-500">Select how you want to create your project</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {modes.map((mode) => {
              const Icon = mode.icon;

              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className="bg-[#0f0f0f] rounded-xl p-8 border-2 border-white/10 transition-all duration-200 text-left group hover:border-white/30 hover:bg-[#151515] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2">{mode.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {mode.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}