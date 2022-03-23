import { render } from '@testing-library/react';
import React from 'react';

import App from './app';

jest.mock('ShellApp/shell', 
  () => MockShell,
  { virtual: true }
);

interface Props {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default class MockShell extends React.Component<Props> {
  render(): React.ReactNode {
      return <div>{this.props.children}</div>
  }
}

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);

    expect(getByText(/Home./gi)).toBeTruthy();
  });
});
