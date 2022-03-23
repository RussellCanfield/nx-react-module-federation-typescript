import { render } from '@testing-library/react';
import React from 'react';
import { Suspense } from 'react';

import App from './app';

jest.mock('HomeApp/home', 
  () => MockHome,
  { virtual: true }
);

export default class MockHome extends React.Component<{}> {
  render(): React.ReactNode {
      return <div>Home.</div>
  }
}

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should render shell component', () => {
    const { getByText } = render(
      <Suspense fallback={<div>Loading</div>}>
        <App />
      </Suspense>
    );

    expect(getByText(/Shell app./gi)).toBeTruthy();
  });
});
