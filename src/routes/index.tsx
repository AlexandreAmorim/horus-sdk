import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { AuthRoutes } from './auth.routes';
import { OffRoutes } from './off.routes';

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <MemoryRouter>
      {user.id ? <AuthRoutes /> : <OffRoutes />}
    </MemoryRouter>
  );
}