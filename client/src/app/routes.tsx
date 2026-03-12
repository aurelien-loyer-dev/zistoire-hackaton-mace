import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { StoryDetail } from "./pages/StoryDetail";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/histoires/:slug",
    Component: StoryDetail,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
