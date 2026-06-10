import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./routes/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Discordbot from "./routes/DiscordBot.tsx";
import Home from "./routes/Home.tsx";
import Blog from "./routes/Blog.tsx";
import Tools from "./routes/Tools.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/discordbot", element: <Discordbot /> },
      { path: "/blog/:slug?", element: <Blog /> },
      { path: "/tools", element: <Tools /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
