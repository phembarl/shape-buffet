import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShapeForm from '../components/ShapeForm';
import ShapeBuffet from '../components/ShapeBuffet';

const props = {
  createShape: () => {},
};

afterEach(() => {
  cleanup();
});

test('renders component successfully', () => {
  const app = render(<ShapeBuffet />);

  expect(app).toBeDefined();
  expect(<ShapeForm {...props} />).toBeDefined();
});

test('creates selected shape', () => {
  render(<ShapeBuffet />);
  const shapeDiv = screen.getByTestId('shape-div');
  const submit = screen.getByText('Create Shape');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'square');
  userEvent.type(screen.getByPlaceholderText('Length'), '50');
  userEvent.click(submit);

  expect(shapeDiv).toHaveClass('square');
});
