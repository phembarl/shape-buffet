import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShapeForm from '../components/ShapeForm';

const props = {
  createShape: () => {},
};

afterEach(() => {
  cleanup();
});

test('renders component successfully', () => {
  const app = render(<ShapeForm {...props} />);

  expect(app).toBeDefined();
});

test('disables input fields on render', () => {
  const app = render(<ShapeForm {...props} />);
  const { getByText, getByPlaceholderText } = app;

  const lengthInput = getByPlaceholderText('Length');
  const radiusInput = getByPlaceholderText('Radius');
  const submit = getByText('Create Shape');
  expect(lengthInput).toBeDisabled();
  expect(radiusInput).toBeDisabled();
  expect(submit).toBeDisabled();
});

test('selects a circular shape', () => {
  render(<ShapeForm {...props} />);
  const lengthInput = screen.getByPlaceholderText('Length');
  const radiusInput = screen.getByPlaceholderText('Radius');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'circle');

  expect(screen.getByText('Circle').selected).toBe(true);
  expect(lengthInput).toBeDisabled();
  expect(radiusInput).toBeEnabled();
});

test('selects a non-circular shape', () => {
  render(<ShapeForm {...props} />);
  const lengthInput = screen.getByPlaceholderText('Length');
  const radiusInput = screen.getByPlaceholderText('Radius');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'square');

  expect(screen.getByText('Square').selected).toBe(true);
  expect(lengthInput).toBeEnabled();
  expect(radiusInput).toBeDisabled();
});

test('inputs shape radius', () => {
  render(<ShapeForm {...props} />);
  const radiusInput = screen.getByPlaceholderText('Radius');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'circle');
  userEvent.type(screen.getByPlaceholderText('Radius'), '50');

  expect(radiusInput).toHaveValue(50);
});

test('inputs shape length', () => {
  render(<ShapeForm {...props} />);
  const lengthInput = screen.getByPlaceholderText('Length');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'square');
  userEvent.type(screen.getByPlaceholderText('Length'), '50');

  expect(lengthInput).toHaveValue(50);
});

test('submits form', () => {
  render(<ShapeForm {...props} />);
  const lengthInput = screen.getByPlaceholderText('Length');
  const submit = screen.getByText('Create Shape');
  userEvent.selectOptions(screen.getByTestId('shape-select'), 'square');
  userEvent.type(screen.getByPlaceholderText('Length'), '50');
  userEvent.click(submit);

  expect(lengthInput).toHaveValue(null);
});
