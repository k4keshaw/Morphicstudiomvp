import { useState } from "react";
import { Sparkles, ChevronRight, Wand2, MessageSquare, Expand, Film } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Link } from "react-router";

const aiTools = [
  { name: "Refine Script", icon: Wand2, description: "Polish and enhance your script" },
  { name: "Improve Dialogue", icon: MessageSquare, description: "Make conversations more natural" },
  { name: "Expand Scene", icon: Expand, description: "Add more detail to scenes" },
  { name: "Generate Scenes", icon: Film, description: "Create new scenes from outline" },
];

export function ScriptEditor() {
  const [script, setScript] = useState(`INT. SPACE STATION - COMMAND CENTER - DAY

The vast command center hums with activity. Holographic displays flicker with data streams, casting an ethereal blue glow across the metallic surfaces.

COMMANDER SARAH CHEN (mid-30s, sharp eyes, confident demeanor) stands at the central console, studying the anomaly readings.

SARAH
(to herself)
This doesn't make any sense...

TECH OFFICER MARCUS (20s, eager, nervous) rushes over with a tablet.

MARCUS
Commander, you need to see this. The signal... it's not random. It's a pattern.

Sarah takes the tablet, her eyes widening as she analyzes the data.

SARAH
(stunned)
My God. It's a message.

The camera slowly ZOOMS IN on the holographic display, where an intricate pattern of lights pulses with intention.

SARAH (CONT'D)
(whispers)
And it's coming from inside the station.

FADE TO BLACK.`);

  return (
    <div className="h-full flex">
      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-border/30 p-4 flex items-center justify-between bg-background/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Script Editor</h1>
            <div className="h-4 w-px bg-border/50" />
            <span className="text-sm text-muted-foreground">Sci-Fi Adventure</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Link to="/scenes">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                Generate Scenes
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-lg p-8 border border-white/5">
              <Textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="min-h-[600px] font-mono text-sm bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Start writing your script here..."
              />
            </div>

            {/* Script Stats */}
            <div className="mt-6 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">
                  {script.split(/\n\n+/).length}
                </span>{" "}
                scenes
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {script.split(/\s+/).length}
                </span>{" "}
                words
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {script.split("\n").length}
                </span>{" "}
                lines
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <aside className="w-80 border-l border-border/30 bg-background/50 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-gray-400" />
            <h2 className="font-bold">AI Assistant</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Enhance your script with AI-powered tools
          </p>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-auto">
          {/* AI Tools */}
          <div className="space-y-2">
            {aiTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.name}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/30 transition-colors text-left group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-0.5">{tool.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {tool.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Suggestions */}
          <div className="space-y-2 pt-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Suggestions</h3>
            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <p className="text-xs text-muted-foreground">
                💡 Consider adding more visual description to Scene 2
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <p className="text-xs text-muted-foreground">
                ✨ The dialogue in Scene 3 could benefit from more subtext
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}