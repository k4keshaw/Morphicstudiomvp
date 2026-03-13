import { useState, useRef, useEffect } from "react";
import { Sparkles, Save, ZoomIn, ZoomOut, Hand, MousePointer, Type, Plus, Play, Pause, Volume2, Upload, X, Wand2, Image as ImageIcon, Video as VideoIcon, ArrowUpCircle, Palette, RefreshCw } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { Link } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";

interface SceneNode {
  id: string;
  type: 'scene';
  content: string;
  position: { x: number; y: number };
  sceneNumber: number;
}

interface ImageNode {
  id: string;
  type: 'image';
  position: { x: number; y: number };
  sceneId: string;
  imageUrl: string;
  prompt: string;
  status: 'generating' | 'complete';
}

interface VideoNode {
  id: string;
  type: 'video';
  position: { x: number; y: number };
  imageId: string;
  videoUrl: string;
  prompt: string;
  status: 'generating' | 'complete';
}

interface AudioNode {
  id: string;
  type: 'audio';
  position: { x: number; y: number };
  voiceModel: string;
  isGenerated: boolean;
}

type CanvasNode = SceneNode | ImageNode | VideoNode | AudioNode;

const getSceneColor = (sceneNumber: number) => {
  const colors = [
    { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-300' },
    { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-300' },
    { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-300' },
    { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-300' },
    { bg: 'bg-pink-500/20', border: 'border-pink-500/40', text: 'text-pink-300' },
    { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300' },
  ];
  return colors[(sceneNumber - 1) % colors.length];
};

const initialNodes: CanvasNode[] = [
  {
    id: 'scene-1',
    type: 'scene',
    sceneNumber: 1,
    content: 'INT. SPACE STATION - COMMAND CENTER - DAY\n\nThe vast command center hums with activity. Holographic displays flicker with data streams, casting an ethereal blue glow across the metallic surfaces.',
    position: { x: 100, y: 100 }
  },
  {
    id: 'scene-2',
    type: 'scene',
    sceneNumber: 2,
    content: 'COMMANDER SARAH CHEN (mid-30s, sharp eyes, confident demeanor) stands at the central console, studying the anomaly readings.\n\nSARAH\n(to herself)\nThis doesn\'t make any sense...',
    position: { x: 100, y: 400 }
  },
  {
    id: 'scene-3',
    type: 'scene',
    sceneNumber: 3,
    content: 'TECH OFFICER MARCUS (20s, eager, nervous) rushes over with a tablet.\n\nMARCUS\nCommander, you need to see this. The signal... it\'s not random. It\'s a pattern.',
    position: { x: 100, y: 700 }
  },
  {
    id: 'audio-1',
    type: 'audio',
    position: { x: 600, y: 300 },
    voiceModel: 'elevenlabs',
    isGenerated: false,
  }
];

export function ScriptEditor() {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<CanvasNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'pan'>('select');
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [volume, setVolume] = useState(80);

  // Ctrl+Scroll Zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -25 : 25;
        setZoom(prev => Math.max(25, Math.min(200, prev + delta)));
      }
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
    } else {
      setSelectedNode(null);
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
    const maxScene = Math.max(...nodes.filter(n => n.type === 'scene').map(n => (n as SceneNode).sceneNumber), 0);
    const newScene: SceneNode = {
      id: `scene-${Date.now()}`,
      type: 'scene',
      sceneNumber: maxScene + 1,
      content: 'NEW SCENE\n\nScene description...',
      position: { x: 100, y: 100 + nodes.filter(n => n.type === 'scene').length * 300 }
    };
    setNodes([...nodes, newScene]);
  };

  const generateImage = (sceneId: string) => {
    const scene = nodes.find(n => n.id === sceneId && n.type === 'scene') as SceneNode;
    if (!scene) return;

    const newImage: ImageNode = {
      id: `image-${Date.now()}`,
      type: 'image',
      sceneId: sceneId,
      position: { x: scene.position.x + 450, y: scene.position.y },
      imageUrl: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400',
      prompt: scene.content.substring(0, 200),
      status: 'complete',
    };
    setNodes([...nodes, newImage]);
  };

  const generateVideo = (imageId: string) => {
    const image = nodes.find(n => n.id === imageId && n.type === 'image') as ImageNode;
    if (!image) return;

    const newVideo: VideoNode = {
      id: `video-${Date.now()}`,
      type: 'video',
      imageId: imageId,
      position: { x: image.position.x + 350, y: image.position.y },
      videoUrl: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400',
      prompt: image.prompt,
      status: 'complete',
    };
    setNodes([...nodes, newVideo]);
  };

  const updateNodeContent = (nodeId: string, content: string) => {
    setNodes(nodes.map(n => 
      n.id === nodeId && n.type === 'scene'
        ? { ...n, content }
        : n
    ));
  };

  const getConnectedImage = (sceneId: string) => {
    return nodes.find(n => n.type === 'image' && (n as ImageNode).sceneId === sceneId) as ImageNode | undefined;
  };

  const getConnectedVideo = (imageId: string) => {
    return nodes.find(n => n.type === 'video' && (n as VideoNode).imageId === imageId) as VideoNode | undefined;
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-white/10 bg-[#1a1a1a] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold">Script Editor</h1>
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

          {/* Add Nodes */}
          <button
            onClick={addSceneNode}
            className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Add Scene"
          >
            <Type className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Actions */}
          <button
            className="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Save"
          >
            <Save className="w-4 h-4" />
          </button>
          
          <Link to="/project/1/editor">
            <button
              className="px-3 py-2 rounded bg-white text-black hover:bg-gray-200 text-xs font-medium transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              To Timeline
            </button>
          </Link>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Zoom Slider - Left Corner */}
        <div className="absolute left-4 top-20 z-20 bg-[#1a1a1a] border border-white/10 rounded-lg p-3 flex flex-col items-center gap-2">
          <button
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <div className="h-24 flex items-center">
            <input
              type="range"
              min="25"
              max="200"
              step="25"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-24 -rotate-90"
              style={{
                appearance: 'none',
                background: 'transparent',
              }}
            />
          </div>
          
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <span className="text-xs text-gray-500 font-mono mt-1">{zoom}%</span>
        </div>

        {/* Infinite Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden"
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
          {/* Connection Lines */}
          {nodes.map((node) => {
            if (node.type === 'scene') {
              const connectedImage = getConnectedImage(node.id);
              if (connectedImage) {
                const startX = (node.position.x + 384) * (zoom / 100) + pan.x;
                const startY = (node.position.y + 100) * (zoom / 100) + pan.y;
                const endX = connectedImage.position.x * (zoom / 100) + pan.x;
                const endY = (connectedImage.position.y + 100) * (zoom / 100) + pan.y;
                
                return (
                  <svg key={`line-${node.id}-${connectedImage.id}`} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="4"
                    />
                  </svg>
                );
              }
            }
            if (node.type === 'image') {
              const connectedVideo = getConnectedVideo(node.id);
              if (connectedVideo) {
                const startX = (node.position.x + 300) * (zoom / 100) + pan.x;
                const startY = (node.position.y + 100) * (zoom / 100) + pan.y;
                const endX = connectedVideo.position.x * (zoom / 100) + pan.x;
                const endY = (connectedVideo.position.y + 100) * (zoom / 100) + pan.y;
                
                return (
                  <svg key={`line-${node.id}-${connectedVideo.id}`} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="rgba(168, 85, 247, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="4"
                    />
                  </svg>
                );
              }
            }
            return null;
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const transform = `translate(${node.position.x * (zoom / 100) + pan.x}px, ${node.position.y * (zoom / 100) + pan.y}px) scale(${zoom / 100})`;
            
            if (node.type === 'scene') {
              const sceneNode = node as SceneNode;
              const color = getSceneColor(sceneNode.sceneNumber);
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode === node.id;
              const hasImage = getConnectedImage(node.id);

              return (
                <div
                  key={node.id}
                  className={`absolute top-0 left-0 w-96 transition-all ${
                    isSelected ? 'z-10' : 'z-0'
                  }`}
                  style={{ transform, transformOrigin: 'top left' }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Prompt Display Above */}
                  <div className="absolute -top-16 left-0 right-0 bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-gray-400 line-clamp-2">{sceneNode.content.substring(0, 100)}...</p>
                  </div>

                  {/* Scene Card */}
                  <div className={`bg-[#1a1a1a] rounded-lg border-2 overflow-hidden cursor-move group ${
                    isSelected ? 'border-white shadow-lg shadow-white/20' : 'border-white/20 hover:border-white/40'
                  }`}>
                    {/* Header */}
                    <div className={`px-3 py-2 border-b flex items-center justify-between ${color.bg} ${color.border}`}>
                      <div className={`flex items-center gap-2 text-xs font-mono font-semibold ${color.text}`}>
                        <Type className="w-3.5 h-3.5" />
                        SCENE {sceneNode.sceneNumber}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <Textarea
                        value={sceneNode.content}
                        onChange={(e) => updateNodeContent(node.id, e.target.value)}
                        className="min-h-[120px] text-xs bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 font-mono"
                        placeholder="Scene content..."
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    {/* Footer */}
                    <div className="px-3 py-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                      <span>{sceneNode.content.split(/\s+/).length} words</span>
                      <span>{sceneNode.content.split('\n').length} lines</span>
                    </div>
                  </div>

                  {/* Action Icons Popup - Shows on Hover */}
                  {isHovered && !hasImage && (
                    <div className="absolute -right-14 top-1/2 -translate-y-1/2 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => generateImage(node.id)}
                        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
                        title="Generate Image"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            } else if (node.type === 'image') {
              const imageNode = node as ImageNode;
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode === node.id;
              const hasVideo = getConnectedVideo(node.id);

              return (
                <div
                  key={node.id}
                  className={`absolute top-0 left-0 w-80 transition-all ${
                    isSelected ? 'z-10' : 'z-0'
                  }`}
                  style={{ transform, transformOrigin: 'top left' }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Prompt Display Above */}
                  <div className="mb-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-500/30">
                    <p className="text-xs text-gray-400 line-clamp-2">{imageNode.prompt}</p>
                  </div>

                  {/* Image Card */}
                  <div className={`bg-[#1a1a1a] rounded-lg border-2 overflow-hidden cursor-move group ${
                    isSelected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-blue-500/40 hover:border-blue-500/60'
                  }`}>
                    {/* Header */}
                    <div className="px-3 py-2 bg-blue-500/20 border-b border-blue-500/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-300">
                        <ImageIcon className="w-3.5 h-3.5" />
                        IMAGE
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs ${
                        imageNode.status === 'complete' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {imageNode.status === 'complete' ? 'Complete' : 'Generating...'}
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="aspect-video bg-black overflow-hidden">
                      <img src={imageNode.imageUrl} alt="Generated" className="w-full h-full object-cover" />
                    </div>

                    {/* Quick Actions */}
                    {isSelected && (
                      <div className="p-2 border-t border-white/10 flex gap-1">
                        <button className="flex-1 p-2 rounded bg-white/5 hover:bg-white/10 text-xs flex items-center justify-center gap-1.5 text-gray-400 hover:text-white">
                          <ArrowUpCircle className="w-3.5 h-3.5" />
                          Upscale
                        </button>
                        <button className="flex-1 p-2 rounded bg-white/5 hover:bg-white/10 text-xs flex items-center justify-center gap-1.5 text-gray-400 hover:text-white">
                          <Palette className="w-3.5 h-3.5" />
                          Style
                        </button>
                        <button className="flex-1 p-2 rounded bg-white/5 hover:bg-white/10 text-xs flex items-center justify-center gap-1.5 text-gray-400 hover:text-white">
                          <RefreshCw className="w-3.5 h-3.5" />
                          Regen
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action Icons Popup - Generate Video */}
                  {isHovered && !hasVideo && imageNode.status === 'complete' && (
                    <div className="absolute -right-14 top-1/2 -translate-y-1/2 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => generateVideo(node.id)}
                        className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
                        title="Generate Video"
                      >
                        <VideoIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            } else if (node.type === 'video') {
              const videoNode = node as VideoNode;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  className={`absolute top-0 left-0 w-80 transition-all ${
                    isSelected ? 'z-10' : 'z-0'
                  }`}
                  style={{ transform, transformOrigin: 'top left' }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                >
                  {/* Prompt Display Above */}
                  <div className="mb-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-500/30">
                    <p className="text-xs text-gray-400 line-clamp-2">{videoNode.prompt}</p>
                  </div>

                  {/* Video Card */}
                  <div className={`bg-[#1a1a1a] rounded-lg border-2 overflow-hidden cursor-move ${
                    isSelected ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-purple-500/40 hover:border-purple-500/60'
                  }`}>
                    {/* Header */}
                    <div className="px-3 py-2 bg-purple-500/20 border-b border-purple-500/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-300">
                        <VideoIcon className="w-3.5 h-3.5" />
                        VIDEO
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs ${
                        videoNode.status === 'complete' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {videoNode.status === 'complete' ? 'Complete' : 'Generating...'}
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="aspect-video bg-black overflow-hidden relative">
                      <img src={videoNode.videoUrl} alt="Video" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    {isSelected && (
                      <div className="p-2 border-t border-white/10 flex gap-1">
                        <button className="flex-1 p-2 rounded bg-white/5 hover:bg-white/10 text-xs flex items-center justify-center gap-1.5 text-gray-400 hover:text-white">
                          <ArrowUpCircle className="w-3.5 h-3.5" />
                          Upscale
                        </button>
                        <button className="flex-1 p-2 rounded bg-white/5 hover:bg-white/10 text-xs flex items-center justify-center gap-1.5 text-gray-400 hover:text-white">
                          <Palette className="w-3.5 h-3.5" />
                          Style
                        </button>
                        <button className="flex-1 p-2 rounded bg-white/5 hover:bg-white/10 text-xs flex items-center justify-center gap-1.5 text-gray-400 hover:text-white">
                          <RefreshCw className="w-3.5 h-3.5" />
                          Regen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            } else if (node.type === 'audio') {
              const audioNode = node as AudioNode;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  className={`absolute top-0 left-0 w-80 transition-all ${
                    isSelected ? 'z-10' : 'z-0'
                  }`}
                  style={{ transform, transformOrigin: 'top left' }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                >
                  {/* Audio Card */}
                  <div className={`bg-[#1a1a1a] rounded-lg border-2 overflow-hidden cursor-move ${
                    isSelected ? 'border-white shadow-lg shadow-white/20' : 'border-white/20 hover:border-white/40'
                  }`}>
                    {/* Header */}
                    <div className="px-3 py-2 bg-cyan-500/20 border-b border-cyan-500/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-300">
                        <Volume2 className="w-3.5 h-3.5" />
                        AUDIO
                      </div>
                      <div className={`px-2 py-0.5 rounded text-xs ${
                        audioNode.isGenerated ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {audioNode.isGenerated ? 'Generated' : 'Pending'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-3" onClick={(e) => e.stopPropagation()}>
                      {/* Voice Selection */}
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block">Voice Model</label>
                        <Select defaultValue={audioNode.voiceModel}>
                          <SelectTrigger className="h-8 bg-white/5 border-white/10 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="elevenlabs">ElevenLabs - Professional</SelectItem>
                            <SelectItem value="elevenlabs-cinematic">ElevenLabs - Cinematic</SelectItem>
                            <SelectItem value="elevenlabs-narrator">ElevenLabs - Narrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Waveform Preview */}
                      {audioNode.isGenerated && (
                        <div className="h-12 bg-black/30 rounded-lg overflow-hidden flex items-center px-2">
                          <div className="flex items-center gap-0.5 h-full flex-1">
                            {Array.from({ length: 40 }).map((_, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-cyan-500/60 rounded-full"
                                style={{ height: `${Math.random() * 60 + 20}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {!audioNode.isGenerated ? (
                          <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 h-8 text-xs">
                            <Sparkles className="w-3 h-3 mr-2" />
                            Generate
                          </Button>
                        ) : (
                          <>
                            <button className="flex-1 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5" />
                            </button>
                            <button className="flex-1 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center">
                              <Upload className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Right Panel - Properties (when node selected) */}
        {selectedNode && (
          <aside className="w-80 border-l border-white/10 bg-[#1a1a1a] overflow-auto">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Properties</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {selectedNode.type === 'scene' && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Scene Number</label>
                    <div className="text-sm font-mono text-white">
                      Scene {(selectedNode as SceneNode).sceneNumber}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Word Count</label>
                    <div className="text-sm text-white">
                      {(selectedNode as SceneNode).content.split(/\s+/).length} words
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">AI Tools</label>
                    <div className="space-y-2">
                      <button className="w-full p-2.5 rounded bg-white/5 hover:bg-white/10 text-left text-xs flex items-center gap-2">
                        <Wand2 className="w-3.5 h-3.5" />
                        Refine Script
                      </button>
                      <button className="w-full p-2.5 rounded bg-white/5 hover:bg-white/10 text-left text-xs flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Expand Scene
                      </button>
                    </div>
                  </div>
                </>
              )}

              {selectedNode.type === 'image' && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Prompt</label>
                    <Textarea
                      value={(selectedNode as ImageNode).prompt}
                      className="min-h-[80px] text-xs bg-white/5 border-white/10 resize-none"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Status</label>
                    <div className={`inline-flex px-2 py-1 rounded text-xs ${
                      (selectedNode as ImageNode).status === 'complete'
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {(selectedNode as ImageNode).status === 'complete' ? 'Complete' : 'Generating...'}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Actions</label>
                    <div className="space-y-2">
                      <Button className="w-full h-9 text-xs" variant="outline">
                        <ArrowUpCircle className="w-3.5 h-3.5 mr-2" />
                        Upscale Image
                      </Button>
                      <Button className="w-full h-9 text-xs" variant="outline">
                        <Palette className="w-3.5 h-3.5 mr-2" />
                        Change Style
                      </Button>
                      <Button className="w-full h-9 text-xs" variant="outline">
                        <RefreshCw className="w-3.5 h-3.5 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {selectedNode.type === 'video' && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Prompt</label>
                    <Textarea
                      value={(selectedNode as VideoNode).prompt}
                      className="min-h-[80px] text-xs bg-white/5 border-white/10 resize-none"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Status</label>
                    <div className={`inline-flex px-2 py-1 rounded text-xs ${
                      (selectedNode as VideoNode).status === 'complete'
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {(selectedNode as VideoNode).status === 'complete' ? 'Complete' : 'Generating...'}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Actions</label>
                    <div className="space-y-2">
                      <Button className="w-full h-9 text-xs" variant="outline">
                        <ArrowUpCircle className="w-3.5 h-3.5 mr-2" />
                        Upscale Video
                      </Button>
                      <Button className="w-full h-9 text-xs" variant="outline">
                        <Palette className="w-3.5 h-3.5 mr-2" />
                        Change Style
                      </Button>
                      <Button className="w-full h-9 text-xs" variant="outline">
                        <RefreshCw className="w-3.5 h-3.5 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {selectedNode.type === 'audio' && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Status</label>
                    <div className={`inline-flex px-2 py-1 rounded text-xs ${
                      (selectedNode as AudioNode).isGenerated 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {(selectedNode as AudioNode).isGenerated ? 'Generated' : 'Pending'}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Volume</label>
                    <Slider 
                      value={[volume]} 
                      onValueChange={(val) => setVolume(val[0])}
                      max={100} 
                      className="py-3" 
                    />
                    <div className="text-xs text-gray-500 mt-1">{volume}%</div>
                  </div>
                </>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="h-12 border-t border-white/10 bg-[#1a1a1a] flex items-center px-4 justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>{nodes.filter(n => n.type === 'scene').length} scenes</span>
          <span>{nodes.filter(n => n.type === 'image').length} images</span>
          <span>{nodes.filter(n => n.type === 'video').length} videos</span>
          <span>{nodes.filter(n => n.type === 'audio').length} audio</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Pan: {Math.round(pan.x)}, {Math.round(pan.y)}</span>
        </div>
      </div>
    </div>
  );
}