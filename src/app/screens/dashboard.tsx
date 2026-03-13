import { Plus, Clock, Sparkles, TrendingUp, Film, Video, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

const projects = [
  {
    id: 1,
    title: "Sci-Fi Adventure",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    scenes: 12,
    duration: "3:45",
    status: "In Progress",
    lastEdited: "2 hours ago",
  },
  {
    id: 2,
    title: "Mystery Thriller",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    scenes: 8,
    duration: "2:30",
    status: "Completed",
    lastEdited: "1 day ago",
  },
  {
    id: 3,
    title: "Fantasy Quest",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    scenes: 15,
    duration: "5:20",
    status: "In Progress",
    lastEdited: "3 days ago",
  },
  {
    id: 4,
    title: "Urban Drama",
    thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    scenes: 10,
    duration: "4:10",
    status: "Draft",
    lastEdited: "1 week ago",
  },
];

const suggestions = [
  {
    title: "Enhance Scene Lighting",
    description: "Improve the cinematography of Scene 3 with better lighting suggestions",
    icon: Sparkles,
  },
  {
    title: "Generate B-Roll",
    description: "Add supporting footage to enhance your main storyline",
    icon: Film,
  },
  {
    title: "Improve Pacing",
    description: "AI-detected opportunities to optimize scene transitions",
    icon: TrendingUp,
  },
];

export function Dashboard() {
  return (
    <div className="h-full overflow-auto">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-0.5">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Transform your stories into cinematic experiences
            </p>
          </div>
          <Link to="/scripts">
            <Button className="bg-white text-black hover:bg-gray-200">
              <Plus className="w-4 h-4 mr-2" />
              Create New Story
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-white/5 rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">Total Projects</p>
              <Video className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-white/5 rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">Total Scenes</p>
              <Film className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div className="bg-white/5 rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">Video Duration</p>
              <Clock className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <p className="text-2xl font-bold">32m</p>
          </div>
          <div className="bg-white/5 rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">AI Credits</p>
              <Sparkles className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <p className="text-2xl font-bold">2,450</p>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Projects</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((project) => (
              <Link key={project.id} to="/editor">
                <div className="bg-white/5 rounded overflow-hidden hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <h3 className="font-semibold text-sm mb-0.5">{project.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{project.scenes} scenes</span>
                        <span>•</span>
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 flex items-center justify-between text-xs text-gray-500">
                    <span>{project.status}</span>
                    <span>{project.lastEdited}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Suggestions Panel */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">AI Suggestions</h2>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <div
                  key={index}
                  className="p-3 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-0.5">{suggestion.title}</h3>
                      <p className="text-xs text-gray-500">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}