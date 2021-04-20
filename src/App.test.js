import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { SearchFilterEvents } from './SearchFilter';
import io from 'socket.io-client';

const socket = io();

test('Test Loading Screen Dissappears on credential receipt', () => {
  render(<App />);
  const loading = screen.queryAllByText('Loading');
  expect(loading).toHaveLength(0); // expect no elements
  // const wait = await expect(screen.getByAltText('App Logo')).toBeInTheDocument();
});
test('Test if event container renders correctly', () => {
  const rerender = render(<SearchFilterEvents clientId='1234' socket={socket} />);
  const element = screen.getByText('Filter Events');
  expect(element).toBeInTheDocument();
});
/*  test('See if the leaderboard is updated based on a change in props', () => {
  const { rerender } = render(<Display name="Kevin" number="100"
  currentUser="Kevin" currentLetter="X" />);
  expect(screen.getByRole('row')).toHaveTextContent('Kevin');
  rerender(<Display name="Irene" number="99" currentUser="Kevin" currentLetter="O" />);
  expect(screen.getByRole('row')).toHaveTextContent('Irene');
});
*/
