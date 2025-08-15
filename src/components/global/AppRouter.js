import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Siteframe } from './siteframe/Siteframe';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Siteframe />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}
