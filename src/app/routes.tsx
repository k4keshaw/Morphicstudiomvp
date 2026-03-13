import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Dashboard } from "./screens/dashboard";
import { ScriptEditor } from "./screens/script-editor";
import { SceneBreakdown } from "./screens/scene-breakdown";
import { StoryboardGenerator } from "./screens/storyboard-generator";
import { SceneAnimation } from "./screens/scene-animation";
import { VideoEditor } from "./screens/video-editor";
import { ExportScreen } from "./screens/export-screen";
import { Settings } from "./screens/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "scripts", Component: ScriptEditor },
      { path: "scenes", Component: SceneBreakdown },
      { path: "storyboard", Component: StoryboardGenerator },
      { path: "animation", Component: SceneAnimation },
      { path: "editor", Component: VideoEditor },
      { path: "exports", Component: ExportScreen },
      { path: "settings", Component: Settings },
    ],
  },
]);
