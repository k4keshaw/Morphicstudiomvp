import { useState } from "react";
import {
  MousePointer2,
  Type,
  Square,
  Circle,
  Star,
  Image as ImageIcon,
  Wand2,
  Copy,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

interface ImageCard {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface QuickCreateCanvasProps {
  selectedImage: string | null;
  onSelectImage: (id: string | null) => void;
}

const initialImages: ImageCard[] = [
  {
    id: "img1",
    src: "https://images.unsplash.com/photo-1640963269654-3fe248c5fba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzMzNTg4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    x: 250,
    y: 150,
    width: 280,
    height: 180,
  },
  {
    id: "img2",
    src: "https://images.unsplash.com/photo-1616397325279-e7bb752d0e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NzMzODk2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    x: 550,
    y: 200,
    width: 280,
    height: 180,
  },
];

const toolbarButtons = [
  { icon: MousePointer2, label: "Select" },
  { icon: Type, label: "Text" },
  { icon: Square, label: "Rectangle" },
  { icon: Circle, label: "Circle" },
  { icon: Star, label: "Star" },
  { icon: ImageIcon, label: "Image" },
  { icon: Wand2, label: "Magic" },
  { icon: Copy, label: "Duplicate" },
  { icon: Trash2, label: "Delete" },
  { icon: MoreHorizontal, label: "More" },
];

export function QuickCreateCanvas({ selectedImage, onSelectImage }: QuickCreateCanvasProps) {
  const [images] = useState<ImageCard[]>(initialImages);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectImage(null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const selectedImageData = images.find(img => img.id === selectedImage);

  return (
    <div
      className="flex-1 relative overflow-hidden bg-[#0f0f0f]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isPanning ? "grabbing" : "default",
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
        backgroundPosition: `${offset.x}px ${offset.y}px`,
      }}
    >
      {/* Canvas Content */}
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {/* Image Cards */}
        {images.map((image) => {
          const isSelected = selectedImage === image.id;

          return (
            <div
              key={image.id}
              className="absolute"
              style={{
                left: image.x,
                top: image.y,
                width: image.width,
                height: image.height,
              }}
            >
              {/* Toolbar - Only show when selected */}
              {isSelected && (
                <div 
                  className="absolute -top-12 left-0 bg-[#2a2a2a] border border-white/20 rounded-lg px-2 py-2 flex items-center gap-1 shadow-xl"
                  style={{ minWidth: "max-content" }}
                >
                  {toolbarButtons.map((tool, idx) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={idx}
                        className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors group"
                        title={tool.label}
                      >
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Image */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectImage(image.id);
                }}
                className={`w-full h-full rounded-lg overflow-hidden cursor-pointer transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    : "hover:ring-2 hover:ring-white/30"
                }`}
              >
                <img
                  src={image.src}
                  alt={`Generated ${image.id}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Helper Text */}
      {images.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Enter a prompt below to generate your first image
            </p>
          </div>
        </div>
      )}
    </div>
  );
}