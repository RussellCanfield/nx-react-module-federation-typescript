import React, { Suspense } from 'react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const Shell = React.lazy(() => import('ShellApp/shell'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Shell>
        Home.
      </Shell>
    </Suspense>
  );
}

export default App;
