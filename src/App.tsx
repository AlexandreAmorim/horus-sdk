import React from "react";
import { AppRoutes } from "./routes/index";
import { AuthProvider } from "./contexts/auth";
import { ChakraProvider } from '@chakra-ui/react'
import { NotificationProvider } from "./contexts/notification";
import { theme } from "./styles/theme";

export function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ChakraProvider theme={theme}>
          <AppRoutes />
        </ChakraProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
