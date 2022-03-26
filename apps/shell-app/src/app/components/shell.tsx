import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar/navbar';
import ThemeProvider from '../providers/theme';

import './shell.module.css';

const AboutMe = React.lazy(() => import('AboutApp/aboutme'));
const Home = React.lazy(() => import('HomeApp/home'));

interface Props {
  children: React.ReactNode;
}

export default function Shell({ children }: Props) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about-me" element={<AboutMe />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {children}
    </ThemeProvider>
  );
}
