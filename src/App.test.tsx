import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders application successfully', () => {
  const app = render(<App />);
  expect(app).toBeDefined();
});
