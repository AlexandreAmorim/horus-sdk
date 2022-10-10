import { GlobalStyle } from "./styles/GlobalStyle";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./routes";
import React from "react";

export function App() {
  return (
    <MemoryRouter>
      <GlobalStyle />
      <AppRoutes />
    </MemoryRouter>
  );
}
