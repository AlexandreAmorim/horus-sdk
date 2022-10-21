import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Operation } from '../pages/Operation';
import { Dashboard } from '../pages/Dashboard';
import { Analytics } from '../pages/Analytics';
import { Users } from '../pages/Users';

export function AuthRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/operations" element={<Operation />} />
      <Route path="/users" element={<Users />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  )
}