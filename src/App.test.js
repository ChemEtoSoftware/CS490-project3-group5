import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Test Loading Screen Dissappears on credential receipt', () => {
  render(<App />);
  const loading = screen.queryAllByText('Loading');
  expect(loading).toHaveLength(0); // expect no elements
  // const wait = await expect(screen.getByAltText('App Logo')).toBeInTheDocument();
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
