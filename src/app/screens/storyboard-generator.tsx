import { RefreshCw, Edit, ChevronRight, Play } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

const storyboardFrames = [
  {
    id: 1,
    sceneNumber: 1,
    title: "Command Center Establishing Shot",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    prompt: "Futuristic space station command center, holographic displays, blue ambient lighting, wide cinematic shot, sci-fi interior, high-tech consoles, crew members at work",
    status: "Generated",
  },
  {
    id: 2,
    sceneNumber: 2,
    title: "Commander Sarah Introduction",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    prompt: "Female commander in futuristic uniform studying holographic data, intense focused expression, medium shot, blue light illumination, sci-fi aesthetic, professional demeanor",
    status: "Generated",
  },
  {
    id: 3,
    sceneNumber: 3,
    title: "Marcus Arrives with Discovery",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    prompt: "Young male tech officer rushing with tablet, anxious expression, medium two-shot composition, dynamic movement, futuristic space station interior, urgent atmosphere",
    status: "Generated",
  },
  {
    id: 4,
    sceneNumber: 4,
    title: "The Pattern Revealed",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    prompt: "Close-up holographic display showing mysterious pattern, glowing blue lights, intricate geometric design, sci-fi technology, ethereal atmosphere, cinematic lighting",
    status: "Generated",
  },
  {
    id: 5,
    sceneNumber: 5,
    title: "The Revelation",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    prompt: "Extreme close-up of woman's face, expression shifting from wonder to fear, dramatic lighting with flickers, intense eyes, cinematic portrait, ominous atmosphere",
    status: "Generated",
  },
  {
    id: 6,
    sceneNumber: 6,
    title: "Station Corridor Transition",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    prompt: "Dark futuristic corridor with flickering lights, sci-fi architecture, ominous atmosphere, long perspective shot, metallic surfaces, mysterious shadows",
    status: "Generating...",
  },
];

export function StoryboardGenerator() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/30 p-6 bg-background/50 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Storyboard Generator</h1>
            <p className="text-sm text-muted-foreground">
              AI-generated visual frames for each scene
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate All
            </Button>
            <Link to="/animation">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                Animate Scenes
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Generation Progress</span>
            <span className="font-semibold">5 / 6 frames</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-5/6 bg-white/30 rounded-full transition-all" />
          </div>
        </div>
      </div>

      {/* Storyboard Grid */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyboardFrames.map((frame) => (
              <div
                key={frame.id}
                className="bg-white/5 rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all group"
              >
                {/* Image Preview */}
                <div className="relative aspect-video bg-black/50 overflow-hidden">
                  {frame.status === "Generated" ? (
                    <>
                      <img
                        src={frame.image}
                        alt={frame.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" variant="secondary">
                          <Play className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        <p className="text-sm text-muted-foreground">Generating...</p>
                      </div>
                    </div>
                  )}
                  {/* Scene Number Badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
                    {frame.sceneNumber}
                  </div>
                </div>

                {/* Frame Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{frame.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {frame.prompt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit Prompt
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>

                  {frame.status === "Generated" && (
                    <Link to="/animation">
                      <Button size="sm" className="w-full h-8 text-xs bg-white/10 hover:bg-white/20 border border-white/20">
                        <Play className="w-3 h-3 mr-2" />
                        Animate Scene
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}