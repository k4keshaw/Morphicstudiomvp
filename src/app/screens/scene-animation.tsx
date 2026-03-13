import { Play, Pause, SkipBack, SkipForward, ChevronRight, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Link } from "react-router";

const scenes = [
  { id: 1, title: "Command Center", status: "Animated" },
  { id: 2, title: "Commander Sarah", status: "Animated" },
  { id: 3, title: "Marcus Arrives", status: "In Progress" },
  { id: 4, title: "Pattern Revealed", status: "Queued" },
  { id: 5, title: "The Revelation", status: "Queued" },
];

export function SceneAnimation() {
  return (
    <div className="h-full flex">
      {/* Main Animation Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border/30 p-6 bg-background/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Scene Animation</h1>
              <p className="text-sm text-muted-foreground">
                Generate animated clips from storyboard frames
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Link to="/editor">
                <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                  Add to Timeline
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="flex-1 flex items-center justify-center p-8 bg-black/10">
          <div className="w-full max-w-5xl">
            {/* Preview Window */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden border border-white/10">
              <div className="w-full h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
                  alt="Scene preview"
                  className="w-full h-full object-cover"
                />
                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="mt-6 bg-white/5 rounded-lg p-5 border border-white/5">
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-muted-foreground">
                  Scene 1: Command Center Establishing Shot
                </span>
                <span className="font-mono">
                  <span className="text-white">00:02</span>
                  <span className="text-muted-foreground"> / 00:08</span>
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button variant="ghost" size="sm">
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button size="lg" className="w-14 h-14 rounded-full bg-white text-black hover:bg-gray-200">
                  <Pause className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="sm">
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Generation Status */}
        <div className="border-t border-border/30 p-4 bg-background/50 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between text-sm mb-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-muted-foreground">Rendering Scene 3...</span>
              </div>
              <span className="font-semibold text-white">67%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white/30 rounded-full transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Animation Controls Panel */}
      <aside className="w-96 border-l border-border/30 bg-background/50 backdrop-blur-xl flex flex-col overflow-auto">
        <div className="p-6 border-b border-border/30">
          <h2 className="font-bold mb-2">Animation Settings</h2>
          <p className="text-xs text-muted-foreground">
            Customize the animation parameters
          </p>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {/* Camera Motion */}
          <div className="space-y-3">
            <Label className="text-xs">Camera Motion</Label>
            <Select defaultValue="push-in">
              <SelectTrigger className="bg-white/5 border-white/5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="push-in">Slow Push-In</SelectItem>
                <SelectItem value="pull-out">Pull Out</SelectItem>
                <SelectItem value="pan-left">Pan Left</SelectItem>
                <SelectItem value="pan-right">Pan Right</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="static">Static</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Animation Strength */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Animation Strength</Label>
              <span className="text-xs text-muted-foreground">70%</span>
            </div>
            <Slider defaultValue={[70]} max={100} step={5} className="py-4" />
          </div>

          {/* Scene Duration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Scene Duration</Label>
              <span className="text-xs text-muted-foreground">8s</span>
            </div>
            <Slider defaultValue={[8]} min={3} max={15} step={1} className="py-4" />
          </div>

          {/* Animation Style */}
          <div className="space-y-3">
            <Label className="text-xs">Animation Style</Label>
            <Select defaultValue="cinematic">
              <SelectTrigger className="bg-white/5 border-white/5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cinematic">Cinematic</SelectItem>
                <SelectItem value="smooth">Smooth</SelectItem>
                <SelectItem value="dynamic">Dynamic</SelectItem>
                <SelectItem value="subtle">Subtle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Motion Blur */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Motion Blur</Label>
              <span className="text-xs text-muted-foreground">40%</span>
            </div>
            <Slider defaultValue={[40]} max={100} step={5} className="py-4" />
          </div>

          <div className="pt-4">
            <Button className="w-full bg-white text-black hover:bg-gray-200">
              <Play className="w-4 h-4 mr-2" />
              Generate Animation
            </Button>
          </div>
        </div>

        {/* Scene Queue */}
        <div className="border-t border-border/30 p-6">
          <h3 className="font-semibold text-sm mb-4">Scene Queue</h3>
          <div className="space-y-2">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  scene.status === "In Progress"
                    ? "bg-white/10 border border-white/20"
                    : "bg-white/5 border border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-xs font-semibold">
                    {scene.id}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{scene.title}</p>
                    <p className="text-xs text-muted-foreground">{scene.status}</p>
                  </div>
                </div>
                {scene.status === "In Progress" && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}