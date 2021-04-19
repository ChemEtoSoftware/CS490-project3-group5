import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { SearchFilterEvents } from './SearchFilter';
import { Login } from './Login';
import { Logout } from './Logout';
// import { InitialData } from './InitialData';

export const socket = io();

function App() {
  // const [initialData, setInitialData] = useState([]);
  // useEffect(() => {
  //   window.fetch('/api').then(
  //     (response) => response.json(),
  //   ).then((data) => setInitialData(data._embedded.events));
  // }, []);
  const [isLoggedIn, setLogin] = useState(false);
  export const [authID, setAuthID] = useState('');
  const [canRender, setRenderStatus] = useState(false);
  function toggleLogin() {
    if (isLoggedIn) {
      setLogin(false);
    } else {
      setLogin(true);
    }
    return null;
  }
  function toggleRender() {
    if (canRender) {
      setRenderStatus(false);
    } else {
      setRenderStatus(true);
    }
    return null;
  }
  function conditionalLogin() {
    if (!isLoggedIn && canRender) {
      return (
        <Login setLogin={toggleLogin} socket={socket} authID={authID} />
      );
    }
    if (!isLoggedIn) {
      return (<h1 className="Loading">Loading ...</h1>);
    }
    return null;
  }
  function conditionalLogout() {
    if (isLoggedIn && canRender) {
      return (
        <div>
          <SearchFilterEvents/>
          <Logout toggleLogin={toggleLogin} socket={socket} authID={authID} />
        </div>
      );
    }
    return null;
  }
  useEffect(() => {
    socket.on('credInfo', (data) => {
      // console.log(data);
      setAuthID(data);
      toggleRender();
    });
    return () => socket.removeEventListener('credInfo');
  }, []);
  /*
  useEffect(() => {
    window.fetch('/api').then((response) => (response.json()).then((data) => {
      console.log(data._embedded['events']);
      setInitialData(data._embedded['events']);
      console.log(initialData);
    }));
  }, []);
  */
  // const [value, setValue] = useState('');
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const data = { name: value };
  //   console.log('submit');
  //   console.log(value);
  //   window.fetch('/api/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // }
  // function handleValue(e) {
  //   setValue(e.target.value);
  // }
  // const [state, setstate] = useState({
  //   keyword:'',
  //   password: ''
  // });
  // function handleSearch(e) {
  //   e.preventDefault();
  //   fetch('/api/post', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       keyword: state.keyword
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       const accessToken = json.access_token;
  //       //props.onLogin(accessToken);
  //     })
  //     .catch(error => {
  //       //props.onLoginError();
  //     });
  // };
  // function handlekeywordChange(e) {
  //   setstate({
  //     keyword: e.target.value
  //   });
  // };
  return (
    <div>
      {conditionalLogin()}
      {conditionalLogout()}
    </div>
  );
}

export default App;

// <div>
//   <form>
//     Keyword:
//     <br />
//     <input
//       type="text"
//       name="keyword"
//       value={state.keyword}
//       onChange={handlekeywordChange}
//     />
//     <button onClick={handleSearch}>Search</button>
//   </form>
// </div>

// <div>
//   <h1>Events</h1>
// <InitialData initialData={initialData} />
// </div>
