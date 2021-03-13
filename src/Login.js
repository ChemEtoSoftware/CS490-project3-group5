import "./App.css";
import React from "react";

export function Login(props) {
  return (
    <div>
      <h1>Login here so that you can play or watch the tictactoe game.</h1>
      Enter username here: <input ref={props.inputRef} type="text" />
      <button onClick={props.onLogin}>Login</button>
    </div>
  );
}
