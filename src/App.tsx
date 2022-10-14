import React from "react";
import { AppRoutes } from "./routes/index";
import { AuthProvider } from "./contexts/auth";

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
