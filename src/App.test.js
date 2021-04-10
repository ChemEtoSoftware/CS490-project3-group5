import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Test if board shows and login disappears', () => {
  render(<App />);
  const linkElement = screen.getByText('Events');
  expect(linkElement).toBeInTheDocument();
});
/* test('Test if an X or O shows up when a square is click', () => {
  render(<App />);
  const linkElement = screen.getByText('Login');
  const input = screen.getByPlaceholderText('Put in a real name');
  fireEvent.change(input, { target: { value: 'Kevin' } });
  fireEvent.click(linkElement);
  const square = screen.getByTestId(1);
  expect(square).toBeInTheDocument();
  fireEvent.click(square);
  expect(square).toBeInTheDocument();
  const X = screen.getByText('X');
  expect(X).toBeInTheDocument();
});
test('See if the leaderboard is updated based on a change in props', () => {
  const { rerender } = render(<Display name="Kevin" number="100"
  currentUser="Kevin" currentLetter="X" />);
  expect(screen.getByRole('row')).toHaveTextContent('Kevin');
  rerender(<Display name="Irene" number="99" currentUser="Kevin" currentLetter="O" />);
  expect(screen.getByRole('row')).toHaveTextContent('Irene');
});
*/
