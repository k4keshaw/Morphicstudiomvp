import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { ProjectWorkspace } from "./components/project-workspace";
import { Dashboard } from "./screens/dashboard";
import { QuickCreate } from "./screens/quick-create";
import { ScriptEditor } from "./screens/script-editor";
import { VideoEditor } from "./screens/video-editor";
import { Settings } from "./screens/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/quick-create",
    Component: QuickCreate,
  },
  {
    path: "/project/:projectId",
    Component: ProjectWorkspace,
    children: [
      { path: "scripts", Component: ScriptEditor },
      { path: "editor", Component: VideoEditor },
    ],
  },
]);