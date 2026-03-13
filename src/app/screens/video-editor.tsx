import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Download,
  Play,
  Pause,
  Volume2,
  Share2,
  ZoomIn,
  ZoomOut,
  Scissors,
  Plus,
  Lock,
  Eye,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const timelineClips = [
  { id: 1, title: "Scene 1", start: 0, duration: 8, track: "video" },
  { id: 2, title: "Scene 2", start: 8, duration: 6, track: "video" },
  { id: 3, title: "Scene 3", start: 14, duration: 7, track: "video" },
  { id: 4, title: "Scene 4", start: 21, duration: 5, track: "video" },
  { id: 5, title: "Scene 5", start: 26, duration: 4, track: "video" },
];

export function VideoEditor() {
  const totalDuration = 30; // seconds
  const timeMarkers = Array.from({ length: 31 }, (_, i) => i);
  const [playheadPosition, setPlayheadPosition] = useState(43); // percentage
  const [isPlaying, setIsPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);

  const currentTime = (playheadPosition / 100) * totalDuration;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setPlayheadPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handlePlayheadMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingPlayhead(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingPlayhead || !timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setPlayheadPosition(Math.max(0, Math.min(100, percentage)));
    };

    const handleMouseUp = () => {
      setIsDraggingPlayhead(false);
    };

    if (isDraggingPlayhead) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingPlayhead]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* Header */}
      <div className="border-b border-white/5 p-3 flex items-center justify-between bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">Video Editor</h1>
          <div className="h-3.5 w-px bg-white/10" />
          <span className="text-sm text-gray-500">Sci-Fi Adventure</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Share2 className="w-3.5 h-3.5 mr-2" />
            Share
          </Button>
          <Link to="/exports">
            <Button size="sm" className="bg-white text-black hover:bg-gray-200 h-8 text-xs">
              <Download className="w-3.5 h-3.5 mr-2" />
              Export
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Preview */}
          <div className="flex-1 flex items-center justify-center p-6 bg-[#0f0f0f]">
            <div className="w-full max-w-4xl">
              <div className="aspect-video bg-black rounded overflow-hidden">
                <div className="w-full h-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
                    alt="Video preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Playhead Time */}
                  <div className="absolute top-3 right-3 bg-black/90 px-2.5 py-1 rounded text-xs font-mono text-white">
                    {formatTime(currentTime)}
                  </div>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="mt-3 bg-[#1a1a1a] rounded p-3">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="rounded-full h-7 w-7 p-0">
                    <SkipBack className="w-3.5 h-3.5" />
                  </Button>
                  <Button className="rounded-full bg-white text-black hover:bg-gray-200 h-9 w-9 p-0">
                    <Play className="w-4 h-4 ml-0.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full h-7 w-7 p-0">
                    <SkipForward className="w-3.5 h-3.5" />
                  </Button>
                  <div className="flex-1">
                    <Slider defaultValue={[43]} max={100} className="py-2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5 text-gray-500" />
                    <Slider defaultValue={[80]} max={100} className="w-20 py-2" />
                  </div>
                  <div className="text-xs font-mono text-gray-500">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline - Premiere Pro Style */}
          <div className="h-80 border-t border-white/5 flex flex-col bg-[#1a1a1a]">
            {/* Timeline Toolbar */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 bg-[#1a1a1a]">
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Scissors className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
                <div className="w-px h-4 bg-white/10 mx-1.5" />
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ZoomOut className="w-3.5 h-3.5" />
                </Button>
                <Slider defaultValue={[50]} max={100} className="w-20 py-2" />
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ZoomIn className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="text-xs font-mono text-gray-600">
                60 FPS • 1920x1080
              </div>
            </div>

            {/* Timeline Tracks */}
            <div className="flex-1 flex overflow-hidden">
              {/* Track Headers */}
              <div className="w-36 border-r border-white/5 bg-[#1a1a1a] overflow-y-auto">
                {/* Video Tracks */}
                <div>
                  <div className="h-16 px-2 py-1.5 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <button className="w-4 h-4 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center">
                          <Eye className="w-2.5 h-2.5" />
                        </button>
                        <button className="w-4 h-4 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center">
                          <Lock className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">V1</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio Tracks */}
                <div>
                  <div className="h-12 px-2 py-1.5 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <button className="w-4 h-4 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center">
                          <Eye className="w-2.5 h-2.5" />
                        </button>
                        <button className="w-4 h-4 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center">
                          <Lock className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-cyan-400">A1</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-12 px-2 py-1.5 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <button className="w-4 h-4 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center">
                          <Eye className="w-2.5 h-2.5" />
                        </button>
                        <button className="w-4 h-4 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center">
                          <Lock className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-green-400">A2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Canvas */}
              <div className="flex-1 overflow-auto bg-[#0f0f0f]">
                <div
                  ref={timelineRef}
                  className="relative cursor-pointer"
                  style={{ minWidth: '1200px' }}
                  onClick={handleTimelineClick}
                >
                  {/* Timeline Ruler */}
                  <div className="h-7 bg-[#1a1a1a] border-b border-white/5 relative">
                    {timeMarkers.map((time) => (
                      <div
                        key={time}
                        className="absolute top-0 bottom-0 flex flex-col"
                        style={{ left: `${(time / totalDuration) * 100}%` }}
                      >
                        <div className="w-px h-1.5 bg-white/20" />
                        <span className="text-xs text-gray-600 ml-0.5 mt-0.5">
                          {time}s
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Video Track V1 */}
                  <div className="h-16 border-b border-white/5 relative">
                    {timelineClips.map((clip) => (
                      <div
                        key={clip.id}
                        className="absolute top-0.5 bottom-0.5 rounded bg-gradient-to-r from-gray-600 to-gray-700 border border-gray-500 hover:border-white/50 cursor-move group transition-all"
                        style={{
                          left: `${(clip.start / totalDuration) * 100}%`,
                          width: `${(clip.duration / totalDuration) * 100}%`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="h-full flex items-center px-2">
                          <span className="text-xs font-medium text-white truncate">
                            {clip.title}
                          </span>
                        </div>
                        {/* Resize handles */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/0 group-hover:bg-white/50 cursor-ew-resize" />
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/0 group-hover:bg-white/50 cursor-ew-resize" />
                      </div>
                    ))}
                  </div>

                  {/* Audio Track A1 - Voiceover */}
                  <div className="h-12 border-b border-white/5 relative">
                    <div
                      className="absolute top-0.5 bottom-0.5 rounded bg-cyan-900/50 border border-cyan-700/50 hover:border-cyan-500 cursor-move"
                      style={{ left: '0%', width: '100%' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="h-full flex items-center px-1">
                        <div className="flex-1 h-full flex items-center gap-0.5">
                          {/* Audio waveform simulation */}
                          {Array.from({ length: 100 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-cyan-400/40"
                              style={{
                                height: `${Math.random() * 60 + 20}%`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Audio Track A2 - Music */}
                  <div className="h-12 border-b border-white/5 relative">
                    <div
                      className="absolute top-0.5 bottom-0.5 rounded bg-green-900/50 border border-green-700/50 hover:border-green-500 cursor-move"
                      style={{ left: '0%', width: '100%' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="h-full flex items-center px-1">
                        <div className="flex-1 h-full flex items-center gap-0.5">
                          {/* Audio waveform simulation */}
                          {Array.from({ length: 100 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-green-400/40"
                              style={{
                                height: `${Math.random() * 40 + 10}%`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Playhead */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white z-20"
                    style={{ left: `${playheadPosition}%`, pointerEvents: 'none' }}
                  >
                    <div
                      className="absolute -top-1 -left-1.5 w-3 h-3 bg-white rounded-sm cursor-grab active:cursor-grabbing"
                      style={{ pointerEvents: 'auto' }}
                      onMouseDown={handlePlayheadMouseDown}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Effects & Audio */}
        <aside className="w-72 border-l border-white/5 overflow-auto bg-[#1a1a1a]">
          <Tabs defaultValue="transitions" className="h-full flex flex-col">
            <TabsList className="grid grid-cols-2 m-3 bg-white/5">
              <TabsTrigger value="transitions" className="text-xs">Transitions</TabsTrigger>
              <TabsTrigger value="audio" className="text-xs">Audio</TabsTrigger>
            </TabsList>

            <TabsContent value="transitions" className="flex-1 px-3 pb-3 space-y-3">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase">Transition Type</h3>
                <Select defaultValue="fade">
                  <SelectTrigger className="bg-white/5 border-white/10 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="dissolve">Dissolve</SelectItem>
                    <SelectItem value="wipe">Wipe</SelectItem>
                    <SelectItem value="cut">Hard Cut</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Duration</Label>
                  <span className="text-xs text-gray-500">0.5s</span>
                </div>
                <Slider defaultValue={[5]} max={20} step={1} className="py-3" />
              </div>

              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase">Presets</h4>
                {["Cinematic Fade", "Quick Cut", "Smooth Dissolve"].map((preset) => (
                  <button
                    key={preset}
                    className="w-full p-2.5 rounded bg-white/5 hover:bg-white/10 text-left text-xs transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="flex-1 px-3 pb-3 space-y-3">
              <div className="space-y-2">
                <Label className="text-xs">Master Volume</Label>
                <Slider defaultValue={[80]} max={100} className="py-3" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Voiceover Volume</Label>
                <Slider defaultValue={[90]} max={100} className="py-3" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Music Volume</Label>
                <Slider defaultValue={[60]} max={100} className="py-3" />
              </div>
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  );
}