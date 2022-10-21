import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from '../pages/SignIn';

export function OffRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  )
}