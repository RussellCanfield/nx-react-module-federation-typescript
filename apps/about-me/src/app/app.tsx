// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Suspense } from 'react';
//import styles from './app.module.css';
import TestComponent from 'ReactApp/test';

const Layout = React.lazy(() => import('ReactApp/layout'));

export function App() {
  return (
    <>
      <TestComponent />
        <Suspense fallback={<div>Loading...</div>}>
          <Layout />
        </Suspense>
    </>
  );
}

export default App;
