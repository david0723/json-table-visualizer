import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders JSON to table title', () => {
  render(<App />);
  const linkElement = screen.getByText(/JSON to Table/i);
  expect(linkElement).toBeInTheDocument();
});
