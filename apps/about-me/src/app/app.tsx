import React, { Suspense } from 'react';
import './app.module.css';
import AboutMe from './components/aboutme';

const Shell = React.lazy(() => import('ShellApp/shell'));

export function App() {
  return (
    <Suspense fallback={<div >Loading...</div>}>
      <Shell>
        <AboutMe />
      </Shell>
    </Suspense>
  );
}

export default App;
