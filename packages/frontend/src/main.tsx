import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { OpenAPI } from "@/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes.tsx";

OpenAPI.BASE =
  (import.meta.env.VITE_BASE_URL as string) ?? "http://127.0.0.1:8080";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
