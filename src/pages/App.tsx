import React from "react";
import { GlobalStyle } from "../styles/GlobalStyle";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../routes";

export function App() {
  return (
    <MemoryRouter>
      <GlobalStyle />
      <AppRoutes />
    </MemoryRouter>
  );
}
