import './App.css';
import React from 'react';
import io from 'socket.io-client';
import { SearchFilterEvents } from './SearchFilter';

export const socket = io();

function App() {
  return (
    <SearchFilterEvents />
  );
}

export default App;
