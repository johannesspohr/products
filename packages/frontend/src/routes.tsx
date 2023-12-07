import App from "@/App.tsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "*",
    index: true,
    element: <App />,
  },
]);
