import { Download, Share2, Copy, Check, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

export function ExportScreen() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Export Video</h1>
          <p className="text-sm text-muted-foreground">
            Configure export settings and download your final video
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 rounded-lg overflow-hidden border border-white/5">
              <div className="aspect-video bg-black relative">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
                  alt="Final video preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-sm font-mono">00:29</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold mb-1">Sci-Fi Adventure</h2>
                    <p className="text-sm text-muted-foreground">5 scenes • 29 seconds</p>
                  </div>
                </div>

                {/* Video Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Resolution</p>
                    <p className="font-semibold">1920 × 1080</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Frame Rate</p>
                    <p className="font-semibold">30 FPS</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">File Size</p>
                    <p className="font-semibold">~24 MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/5 space-y-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-gray-400" />
                <h3 className="font-bold">Share Video</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Share a preview link with collaborators
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/5 rounded-lg px-4 py-2.5 text-sm font-mono text-muted-foreground border border-white/5">
                  https://morphic.studio/share/x7k2m9...
                </div>
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Export Settings */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-5 border border-white/5 space-y-6">
              <div>
                <h3 className="font-bold mb-4">Export Settings</h3>
                
                {/* Resolution */}
                <div className="space-y-3 mb-6">
                  <Label className="text-xs">Resolution</Label>
                  <Select defaultValue="1080p">
                    <SelectTrigger className="bg-white/5 border-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4k">4K (3840 × 2160)</SelectItem>
                      <SelectItem value="1080p">1080p (1920 × 1080)</SelectItem>
                      <SelectItem value="720p">720p (1280 × 720)</SelectItem>
                      <SelectItem value="480p">480p (854 × 480)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-3 mb-6">
                  <Label className="text-xs">Aspect Ratio</Label>
                  <RadioGroup defaultValue="16:9" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="16:9" id="16:9" />
                      <Label htmlFor="16:9" className="font-normal cursor-pointer text-sm">
                        16:9 (Widescreen)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="9:16" id="9:16" />
                      <Label htmlFor="9:16" className="font-normal cursor-pointer text-sm">
                        9:16 (Vertical)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1:1" id="1:1" />
                      <Label htmlFor="1:1" className="font-normal cursor-pointer text-sm">
                        1:1 (Square)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Format */}
                <div className="space-y-3 mb-6">
                  <Label className="text-xs">Format</Label>
                  <Select defaultValue="mp4">
                    <SelectTrigger className="bg-white/5 border-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp4">MP4 (H.264)</SelectItem>
                      <SelectItem value="mov">MOV (ProRes)</SelectItem>
                      <SelectItem value="webm">WebM</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quality */}
                <div className="space-y-3">
                  <Label className="text-xs">Quality</Label>
                  <Select defaultValue="high">
                    <SelectTrigger className="bg-white/5 border-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ultra">Ultra (Lossless)</SelectItem>
                      <SelectItem value="high">High (Recommended)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low (Web)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <Button className="w-full bg-white text-black hover:bg-gray-200 h-11">
                  <Download className="w-5 h-5 mr-2" />
                  Export Video
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Estimated export time: ~2 minutes
                </p>
              </div>
            </div>

            {/* Export History */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/5">
              <h3 className="text-sm font-bold mb-4">Recent Exports</h3>
              <div className="space-y-2">
                {[
                  { name: "Final_v3.mp4", date: "2 hours ago", size: "24 MB" },
                  { name: "Draft_v2.mp4", date: "1 day ago", size: "18 MB" },
                  { name: "Preview_v1.mp4", date: "3 days ago", size: "15 MB" },
                ].map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium truncate">{file.name}</p>
                      <Download className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{file.date}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}