import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Analytics } from '../pages/Analytics';
import { Dashboard } from '../pages/Dashboard';
import { Operation } from '../pages/Operation';
import { Users } from '../pages/Users';

export function AuthRoutes() {

  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/operations" element={<Operation />} />
      <Route path="/users" element={<Users />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  )
}