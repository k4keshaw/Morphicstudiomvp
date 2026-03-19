import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Download,
  Play,
  ZoomIn,
  ZoomOut,
  Lock,
  Sparkles,
  Video,
  Image as ImageIcon,
  X,
  MousePointer,
  Hand,
  Save,
  Film,
  Eye,
  EyeOff,
  Layers,
  Droplets,
  Move,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface SceneNode {
  id: string;
  type: 'scene';
  title: string;
  description: string;
  scriptContent: string;
  duration: number;
  position: { x: number; y: number };
  sceneNumber: number;
  thumbnail: string;
  hasImage: boolean;
  hasVideo: boolean;
  opacity: number;
  scale: number;
  rotation: number;
  positionX: number;
  positionY: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  visible: boolean;
  locked: boolean;
  startTime: number; // Add start time for timeline
}

type CanvasNode = SceneNode;

const initialNodes: CanvasNode[] = [
  {
    id: 'scene-1',
    type: 'scene',
    sceneNumber: 1,
    title: "Command Center",
    description: "Wide establishing shot of futuristic space station",
    scriptContent: "INT. SPACE STATION - COMMAND CENTER - DAY\n\nThe vast command center hums with activity. Holographic displays flicker with data streams.",
    duration: 8,
    startTime: 0,
    position: { x: 100, y: 150 },
    thumbnail: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400",
    hasImage: true,
    hasVideo: true,
    opacity: 100,
    scale: 100,
    rotation: 0,
    positionX: 0,
    positionY: 0,
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    visible: true,
    locked: false,
  },
  {
    id: 'scene-2',
    type: 'scene',
    sceneNumber: 2,
    title: "Sarah at Console",
    description: "Close-up of Commander Sarah Chen studying readings",
    scriptContent: "COMMANDER SARAH CHEN stands at the central console.\n\nSARAH\n(to herself)\nThis doesn't make any sense...",
    duration: 6,
    startTime: 8,
    position: { x: 500, y: 150 },
    thumbnail: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400",
    hasImage: true,
    hasVideo: false,
    opacity: 100,
    scale: 100,
    rotation: 0,
    positionX: 0,
    positionY: 0,
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    visible: true,
    locked: false,
  },
  {
    id: 'scene-3',
    type: 'scene',
    sceneNumber: 3,
    title: "Marcus Arrives",
    description: "Tech Officer Marcus rushes over with tablet",
    scriptContent: "TECH OFFICER MARCUS rushes over.\n\nMARCUS\nCommander, you need to see this.",
    duration: 7,
    startTime: 14,
    position: { x: 900, y: 150 },
    thumbnail: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400",
    hasImage: false,
    hasVideo: false,
    opacity: 100,
    scale: 100,
    rotation: 0,
    positionX: 0,
    positionY: 0,
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    visible: true,
    locked: false,
  },
];

export function VideoEditor() {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<CanvasNode | null>(nodes[0]);
  const [tool, setTool] = useState<'select' | 'pan'>('select');
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [showExportModal, setShowExportModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const totalDuration = nodes.reduce((acc, n) => acc + n.duration, 0);

  // Scroll Zoom (simple scroll without Ctrl)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      setZoom(prev => Math.max(25, Math.min(200, prev + delta)));
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (tool === 'select') {
      e.stopPropagation();
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        setSelectedNode(node);
        setCurrentTime(node.startTime);
        setDraggingNode(nodeId);
        setDragOffset({
          x: e.clientX - node.position.x * (zoom / 100) - pan.x,
          y: e.clientY - node.position.y * (zoom / 100) - pan.y,
        });
      }
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (tool === 'pan' || e.button === 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNode && tool === 'select') {
      const node = nodes.find(n => n.id === draggingNode);
      if (node) {
        const newX = (e.clientX - pan.x - dragOffset.x) / (zoom / 100);
        const newY = (e.clientY - pan.y - dragOffset.y) / (zoom / 100);
        
        setNodes(nodes.map(n => 
          n.id === draggingNode 
            ? { ...n, position: { x: newX, y: newY } }
            : n
        ));
      }
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
    setIsPanning(false);
  };

  const addSceneNode = () => {
    const maxScene = Math.max(...nodes.map(n => n.sceneNumber), 0);
    const lastStartTime = nodes[nodes.length - 1]?.startTime + nodes[nodes.length - 1]?.duration || 0;
    const newScene: SceneNode = {
      id: `scene-${Date.now()}`,
      type: 'scene',
      sceneNumber: maxScene + 1,
      title: `Scene ${maxScene + 1}`,
      description: "New scene description...",
      scriptContent: "NEW SCENE\n\nScene content from script editor...",
      duration: 5,
      startTime: lastStartTime,
      position: { x: 100 + nodes.length * 400, y: 150 },
      thumbnail: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400",
      hasImage: false,
      hasVideo: false,
      opacity: 100,
      scale: 100,
      rotation: 0,
      positionX: 0,
      positionY: 0,
      blur: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      visible: true,
      locked: false,
    };
    setNodes([...nodes, newScene]);
  };

  const updateNodeProperty = <K extends keyof SceneNode>(
    nodeId: string,
    property: K,
    value: SceneNode[K]
  ) => {
    setNodes(nodes.map(n => 
      n.id === nodeId ? { ...n, [property]: value } : n
    ));
    if (selectedNode?.id === nodeId) {
      setSelectedNode({ ...selectedNode, [property]: value } as SceneNode);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-white/10 bg-[#1a1a1a] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold">Video Timeline</h1>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs text-gray-500">Sci-Fi Adventure</span>
        </div>

        {/* Minimal Icon Toolbar */}
        <div className="flex items-center gap-1">
          {/* Tool Selection */}
          <div className="flex items-center gap-0.5 bg-black/30 rounded-lg p-1 mr-2">
            <button
              onClick={() => setTool('select')}
              className={`p-2 rounded transition-all ${
                tool === 'select' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
              title="Select (V)"
            >
              <MousePointer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTool('pan')}
              className={`p-2 rounded transition-all ${
                tool === 'pan' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
              title="Pan (H)"
            >
              <Hand className="w-4 h-4" />
            </button>
          </div>

          {/* Add Scene */}
          <button
            onClick={addSceneNode}
            className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Add Scene"
          >
            <Film className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Actions */}
          <button
            className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Save"
          >
            <Save className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="px-3 py-2 rounded bg-white text-black hover:bg-gray-200 text-xs font-medium transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Video Preview Window - Always Visible */}
          <div className="h-72 border-b border-white/10 bg-black flex flex-col">
            {/* Preview Display */}
            <div className="flex-1 flex items-center justify-center relative">
              {selectedNode ? (
                <img 
                  src={selectedNode.thumbnail} 
                  alt="Preview" 
                  className="max-h-full max-w-full object-contain"
                  style={{
                    opacity: selectedNode.opacity / 100,
                    transform: `scale(${selectedNode.scale / 100}) rotate(${selectedNode.rotation}deg)`,
                    filter: `blur(${selectedNode.blur}px) brightness(${selectedNode.brightness}%) contrast(${selectedNode.contrast}%) saturate(${selectedNode.saturation}%)`,
                  }}
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                    <Film className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-600">No scene selected</p>
                </div>
              )}

              {/* Scene Info Overlay */}
              {selectedNode && (
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                  <p className="text-xs text-white font-semibold">{selectedNode.title}</p>
                  <p className="text-xs text-gray-400">Scene {selectedNode.sceneNumber}</p>
                </div>
              )}
            </div>

            {/* Timeline & Controls */}
            <div className="bg-[#1a1a1a] border-t border-white/10 p-4">
              {/* Timeline Bar */}
              <div className="mb-3 relative">
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  {/* Timeline segments */}
                  <div className="absolute inset-0 flex">
                    {nodes.map((node, index) => (
                      <div
                        key={node.id}
                        className={`h-full transition-all cursor-pointer ${
                          selectedNode?.id === node.id ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        style={{ 
                          width: `${(node.duration / totalDuration) * 100}%`,
                        }}
                        onClick={() => {
                          setSelectedNode(node);
                          setCurrentTime(node.startTime);
                        }}
                      />
                    ))}
                  </div>
                  {/* Playhead */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                    style={{ left: `${(currentTime / totalDuration) * 100}%` }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                {/* Time markers */}
                <div className="flex justify-between mt-1 text-xs text-gray-500 font-mono">
                  {nodes.map((node, index) => (
                    <span key={node.id} style={{ width: `${(node.duration / totalDuration) * 100}%` }}>
                      {formatTime(node.startTime)}
                    </span>
                  ))}
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={() => {
                    const prevNode = nodes[Math.max(0, (selectedNode ? nodes.indexOf(selectedNode) - 1 : 0))];
                    if (prevNode) {
                      setSelectedNode(prevNode);
                      setCurrentTime(prevNode.startTime);
                    }
                  }}
                  className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white hover:bg-gray-200 text-black transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button 
                  onClick={() => {
                    const nextNode = nodes[Math.min(nodes.length - 1, (selectedNode ? nodes.indexOf(selectedNode) + 1 : 0))];
                    if (nextNode) {
                      setSelectedNode(nextNode);
                      setCurrentTime(nextNode.startTime);
                    }
                  }}
                  className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-white/20 mx-1" />
                <span className="text-xs text-gray-400 font-mono">{formatTime(currentTime)} / {formatTime(totalDuration)}</span>
              </div>
            </div>
          </div>

          {/* Canvas Timeline Area */}
          <div className="flex-1 relative">
            {/* Zoom Slider - Bottom Right Corner - Horizontal */}
            <div className="absolute right-4 bottom-4 z-20 bg-[#1a1a1a]/90 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-3">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="25"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-24 h-1"
                  style={{
                    appearance: 'none',
                    background: `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${((zoom - 25) / 175) * 100}%, rgba(255,255,255,0.1) ${((zoom - 25) / 175) * 100}%, rgba(255,255,255,0.1) 100%)`,
                    borderRadius: '2px',
                  }}
                />
                <span className="text-xs text-gray-400 font-mono w-10 text-center">{zoom}%</span>
              </div>
              
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Infinite Canvas */}
            <div
              ref={canvasRef}
              className="w-full h-full relative overflow-hidden"
              style={{
                cursor: tool === 'pan' || isPanning ? 'grab' : 'default',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: `${20 * (zoom / 100)}px ${20 * (zoom / 100)}px`,
                backgroundPosition: `${pan.x}px ${pan.y}px`,
              }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Arrow Connections Between Clips */}
              {nodes.map((node, index) => {
                if (index < nodes.length - 1) {
                  const nextNode = nodes[index + 1];
                  const startX = (node.position.x + 320) * (zoom / 100) + pan.x;
                  const startY = (node.position.y + 140) * (zoom / 100) + pan.y;
                  const endX = nextNode.position.x * (zoom / 100) + pan.x;
                  const endY = (nextNode.position.y + 140) * (zoom / 100) + pan.y;
                  
                  return (
                    <svg key={`arrow-${node.id}`} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                      <defs>
                        <marker
                          id={`arrowhead-${index}`}
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3, 0 6"
                            fill="rgba(255,255,255,0.3)"
                          />
                        </marker>
                      </defs>
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        markerEnd={`url(#arrowhead-${index})`}
                      />
                    </svg>
                  );
                }
                return null;
              })}

              {/* Scene Nodes */}
              {nodes.map((node, index) => {
                const transform = `translate(${node.position.x * (zoom / 100) + pan.x}px, ${node.position.y * (zoom / 100) + pan.y}px) scale(${zoom / 100})`;
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    className={`absolute top-0 left-0 transition-all ${
                      isSelected ? 'z-10' : 'z-0'
                    }`}
                    style={{ 
                      transform, 
                      transformOrigin: 'top left',
                      opacity: node.visible ? 1 : 0.3,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, node.id)}
                  >
                    {/* Scene Storyboard Card */}
                    <div className={`w-80 bg-[#1a1a1a] rounded-lg border-2 overflow-hidden cursor-move ${
                      isSelected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-white/20 hover:border-white/40'
                    } ${node.locked ? 'opacity-75' : ''}`}>
                      {/* Script Reference - Inside Card at Top */}
                      <div className="bg-black/40 border-b border-white/10 px-3 py-2">
                        <p className="text-xs text-gray-400 font-mono leading-tight line-clamp-2">
                          {node.scriptContent}
                        </p>
                      </div>

                      {/* Storyboard Sketch Frame */}
                      <div className="h-44 bg-black relative overflow-hidden border-b border-white/10">
                        <img
                          src={node.thumbnail}
                          alt={node.title}
                          className="w-full h-full object-cover grayscale opacity-80"
                          style={{
                            filter: `blur(${node.blur}px) brightness(${node.brightness}%) contrast(${node.contrast}%) saturate(${node.saturation}%)`,
                          }}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs text-white/90 font-medium leading-tight line-clamp-1">
                            {node.description}
                          </p>
                        </div>
                        
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-white/70">
                          #{node.sceneNumber}
                        </div>

                        <div className="absolute top-2 left-2 flex gap-1">
                          {!node.visible && (
                            <div className="w-6 h-6 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center">
                              <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                          )}
                          {node.locked && (
                            <div className="w-6 h-6 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center">
                              <Lock className="w-3.5 h-3.5 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info Footer */}
                      <div className="px-3 py-2 bg-[#1a1a1a]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {node.title}
                            </p>
                            <p className="text-xs text-gray-500">{node.duration}s • {formatTime(node.startTime)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${node.hasImage ? 'bg-green-500' : 'bg-gray-600'}`} />
                            <span className="text-gray-500">Image</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${node.hasVideo ? 'bg-blue-500' : 'bg-gray-600'}`} />
                            <span className="text-gray-500">Video</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Video Properties */}
        {selectedNode && (
          <aside className="w-80 border-l border-white/10 bg-[#1a1a1a] overflow-auto">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Video Properties</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Layer Controls */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  Layer
                </h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateNodeProperty(selectedNode.id, 'visible', !selectedNode.visible)}
                      className={`flex-1 p-2 rounded text-xs flex items-center justify-center gap-1.5 transition-colors ${
                        selectedNode.visible 
                          ? 'bg-white/10 text-white hover:bg-white/15' 
                          : 'bg-white/5 text-gray-500 hover:bg-white/10'
                      }`}
                    >
                      {selectedNode.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {selectedNode.visible ? 'Visible' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => updateNodeProperty(selectedNode.id, 'locked', !selectedNode.locked)}
                      className={`flex-1 p-2 rounded text-xs flex items-center justify-center gap-1.5 transition-colors ${
                        selectedNode.locked 
                          ? 'bg-white/10 text-white hover:bg-white/15' 
                          : 'bg-white/5 text-gray-500 hover:bg-white/10'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      {selectedNode.locked ? 'Locked' : 'Unlocked'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Transform */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Move className="w-3.5 h-3.5" />
                  Transform
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Opacity</label>
                    <Slider
                      value={[selectedNode.opacity]}
                      onValueChange={(val) => updateNodeProperty(selectedNode.id, 'opacity', val[0])}
                      max={100}
                      className="py-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedNode.opacity}%</div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Scale</label>
                    <Slider
                      value={[selectedNode.scale]}
                      onValueChange={(val) => updateNodeProperty(selectedNode.id, 'scale', val[0])}
                      min={10}
                      max={200}
                      className="py-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedNode.scale}%</div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Rotation</label>
                    <Slider
                      value={[selectedNode.rotation]}
                      onValueChange={(val) => updateNodeProperty(selectedNode.id, 'rotation', val[0])}
                      min={-180}
                      max={180}
                      className="py-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedNode.rotation}°</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">Position X</label>
                      <input
                        type="number"
                        value={selectedNode.positionX}
                        onChange={(e) => updateNodeProperty(selectedNode.id, 'positionX', Number(e.target.value))}
                        className="w-full h-8 bg-white/5 border border-white/10 rounded px-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">Position Y</label>
                      <input
                        type="number"
                        value={selectedNode.positionY}
                        onChange={(e) => updateNodeProperty(selectedNode.id, 'positionY', Number(e.target.value))}
                        className="w-full h-8 bg-white/5 border border-white/10 rounded px-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters & Effects */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5" />
                  Filters & Effects
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Blur</label>
                    <Slider
                      value={[selectedNode.blur]}
                      onValueChange={(val) => updateNodeProperty(selectedNode.id, 'blur', val[0])}
                      max={20}
                      className="py-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedNode.blur}px</div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Brightness</label>
                    <Slider
                      value={[selectedNode.brightness]}
                      onValueChange={(val) => updateNodeProperty(selectedNode.id, 'brightness', val[0])}
                      min={0}
                      max={200}
                      className="py-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedNode.brightness}%</div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Contrast</label>
                    <Slider
                      value={[selectedNode.contrast]}
                      onValueChange={(val) => updateNodeProperty(selectedNode.id, 'contrast', val[0])}
                      min={0}
                      max={200}
                      className="py-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedNode.contrast}%</div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Saturation</label>
                    <Slider
                      value={[selectedNode.saturation]}
                      onValueChange={(val) => updateNodeProperty(selectedNode.id, 'saturation', val[0])}
                      min={0}
                      max={200}
                      className="py-3"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedNode.saturation}%</div>
                  </div>
                </div>
              </div>

              {/* Script Reference */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Script Reference
                </h4>
                <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                  <p className="text-xs text-gray-400 font-mono leading-relaxed whitespace-pre-wrap">
                    {selectedNode.scriptContent}
                  </p>
                </div>
              </div>

              {/* Generation Status */}
              {(!selectedNode.hasImage || !selectedNode.hasVideo) && (
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Generation
                  </h4>
                  <div className="space-y-2">
                    {!selectedNode.hasImage && (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 h-9 text-xs">
                        <ImageIcon className="w-3.5 h-3.5 mr-2" />
                        Generate Image
                      </Button>
                    )}
                    {selectedNode.hasImage && !selectedNode.hasVideo && (
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 h-9 text-xs">
                        <Video className="w-3.5 h-3.5 mr-2" />
                        Generate Video
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Export Modal Overlay */}
      {showExportModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Export Video</h2>
                <p className="text-sm text-gray-500">Configure export settings</p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Resolution</label>
                  <Select defaultValue="1080p">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">720p HD</SelectItem>
                      <SelectItem value="1080p">1080p Full HD</SelectItem>
                      <SelectItem value="2k">2K Ultra HD</SelectItem>
                      <SelectItem value="4k">4K Cinema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Frame Rate</label>
                  <Select defaultValue="30">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 fps (Cinematic)</SelectItem>
                      <SelectItem value="30">30 fps (Standard)</SelectItem>
                      <SelectItem value="60">60 fps (Smooth)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Format</label>
                  <Select defaultValue="mp4">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4 (H.264)</SelectItem>
                      <SelectItem value="mov">MOV (ProRes)</SelectItem>
                      <SelectItem value="webm">WebM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Quality</label>
                  <Select defaultValue="high">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Small File)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Best Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                <h3 className="text-sm font-semibold mb-3">Export Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Duration</span>
                    <span className="text-white font-mono">{formatTime(totalDuration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Scenes</span>
                    <span className="text-white">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rendered Scenes</span>
                    <span className="text-white">{nodes.filter(n => n.hasVideo).length}/{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Size</span>
                    <span className="text-white font-mono">~{Math.round(totalDuration * 2.5)}MB</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <Button className="bg-white text-black hover:bg-gray-200">
                <Download className="w-4 h-4 mr-2" />
                Start Export
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Bar */}
      <div className="h-12 border-t border-white/10 bg-[#1a1a1a] flex items-center px-4 justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>{nodes.length} scenes</span>
          <span>{formatTime(totalDuration)} total</span>
          <span>{nodes.filter(n => n.hasVideo).length}/{nodes.length} rendered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Pan: {Math.round(pan.x)}, {Math.round(pan.y)}</span>
        </div>
      </div>
    </div>
  );
}