import React from 'react';

const Shell = React.lazy(() => import('ShellApp/shell'));

export function App() {
  return (
    <Shell>
      Home.
    </Shell>
  );
}

export default App;
