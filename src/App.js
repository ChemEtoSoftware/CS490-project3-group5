import './App.css';
import React from 'react';
import io from 'socket.io-client';

export const socket = io();

function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
