import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShapeForm from '../components/ShapeForm';
import ShapeBuffet from '../components/ShapeBuffet';

const props = {
  createShape: () => {},
};

test('renders component successfully', () => {
  const app = render(<ShapeBuffet />);

  expect(app).toBeDefined();
  expect(<ShapeForm {...props} />).toBeDefined();
});

test('disables clear button on initial render', () => {
  render(<ShapeBuffet />);
  const clear = screen.getByText('Clear');
  expect(clear).toBeDisabled();
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

test('Toggles color picker', () => {
  render(<ShapeBuffet />);
  const submit = screen.getByText('Create Shape');
  const colorBtn = screen.getByText('Change Color');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'square');
  userEvent.type(screen.getByPlaceholderText('Length'), '50');
  userEvent.click(submit);
  userEvent.click(colorBtn);
  screen.getByTestId('color-picker');

  const HideColorBtn = screen.getByText('Hide Color Picker');
  userEvent.click(HideColorBtn);
  expect(screen.queryByTestId('color-picker')).toBeNull();
});

test('clears shape', () => {
  render(<ShapeBuffet />);
  const shapeDiv = screen.getByTestId('shape-div');
  const submit = screen.getByText('Create Shape');
  const clear = screen.getByText('Clear');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'square');
  userEvent.type(screen.getByPlaceholderText('Length'), '50');
  userEvent.click(submit);

  expect(shapeDiv).toHaveClass('square');
  userEvent.click(clear);
  expect(clear).toBeDisabled();
  expect(shapeDiv).not.toHaveClass('square');
});

test('Updates History list', () => {
  render(<ShapeBuffet />);
  const submit = screen.getByText('Create Shape');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'square');
  userEvent.type(screen.getByPlaceholderText('Length'), '50');
  userEvent.click(submit);
  screen.getByText('square - 50');
});
