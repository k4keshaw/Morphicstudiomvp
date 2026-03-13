import { RefreshCw, Edit, ChevronRight, Camera, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

const scenes = [
  {
    id: 1,
    number: 1,
    title: "Command Center Establishing Shot",
    description: "Wide shot of the bustling space station command center. Holographic displays illuminate the high-tech environment with blue light. Multiple crew members work at their stations.",
    camera: "Wide angle establishing shot, slow push-in",
    narration: "In the depths of space, the Meridian Station maintains its eternal watch.",
    duration: "8s",
    location: "INT. SPACE STATION - COMMAND CENTER",
    timeOfDay: "DAY",
  },
  {
    id: 2,
    number: 2,
    title: "Commander Sarah Introduction",
    description: "Medium shot of Commander Sarah Chen at the central console, her face illuminated by holographic data. She's focused, intense, studying anomaly readings with concern.",
    camera: "Medium shot, slight tracking movement",
    narration: "Commander Chen had seen many anomalies, but nothing like this.",
    duration: "6s",
    location: "INT. SPACE STATION - COMMAND CENTER",
    timeOfDay: "DAY",
  },
  {
    id: 3,
    number: 3,
    title: "Marcus Arrives with Discovery",
    description: "Tech Officer Marcus rushes into frame with a tablet. Close-up on his anxious face as he delivers urgent news. Quick cut to Sarah's reaction.",
    camera: "Medium two-shot, handheld for urgency",
    narration: null,
    duration: "5s",
    location: "INT. SPACE STATION - COMMAND CENTER",
    timeOfDay: "DAY",
  },
  {
    id: 4,
    number: 4,
    title: "The Pattern Revealed",
    description: "Close-up on the holographic display showing the mysterious pattern. The camera slowly circles the display as Sarah studies it. Her eyes widen in realization.",
    camera: "Close-up with slow dolly around subject",
    narration: "The pattern was unmistakable—intelligent, deliberate, impossible.",
    duration: "10s",
    location: "INT. SPACE STATION - COMMAND CENTER",
    timeOfDay: "DAY",
  },
  {
    id: 5,
    number: 5,
    title: "The Revelation",
    description: "Extreme close-up on Sarah's face as she whispers the shocking discovery. Her expression shifts from wonder to fear. The lighting flickers ominously.",
    camera: "Extreme close-up, dramatic lighting",
    narration: null,
    duration: "7s",
    location: "INT. SPACE STATION - COMMAND CENTER",
    timeOfDay: "DAY",
  },
];

export function SceneBreakdown() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/30 p-6 bg-background/50 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Scene Breakdown</h1>
            <p className="text-sm text-muted-foreground">
              AI-generated scenes from your script
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate All
            </Button>
            <Link to="/storyboard">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                Generate Storyboard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>{scenes.length} scenes</span>
          <span>•</span>
          <span>36s duration</span>
          <span>•</span>
          <span>1 location</span>
        </div>
      </div>

      {/* Scene Cards */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-4">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="bg-white/5 rounded-lg p-5 border border-white/5 hover:border-white/20 transition-all"
            >
              {/* Scene Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold">{scene.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{scene.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{scene.location}</span>
                      <span>•</span>
                      <span>{scene.timeOfDay}</span>
                      <span>•</span>
                      <span>{scene.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Scene Content */}
              <div className="space-y-3">
                {/* Description */}
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {scene.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {/* Camera Suggestion */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Camera className="w-3 h-3 text-gray-400" />
                      <h4 className="text-xs font-semibold text-muted-foreground">Camera</h4>
                    </div>
                    <p className="text-sm">
                      {scene.camera}
                    </p>
                  </div>

                  {/* Narration */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-3 h-3 text-cyan-400" />
                      <h4 className="text-xs font-semibold text-muted-foreground">Narration</h4>
                    </div>
                    <p className="text-sm italic text-muted-foreground">
                      {scene.narration || "No narration"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}