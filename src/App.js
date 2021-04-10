/* eslint-disable */
import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { InitialData } from './InitialData';
import 'semantic-ui-css/semantic.min.css'

export const socket = io();

function App() {
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    window.fetch('/api').then(
      (response) => response.json(),
    ).then((data) => setInitialData(data._embedded.events));
  }, []);
  
  console.log(initialData);
  
  /*
  useEffect(() => {
    window.fetch('/api').then((response) => (response.json()).then((data) => {
      console.log(data._embedded['events']);
      setInitialData(data._embedded['events']);
      console.log(initialData);
    }));
  }, []);
  */
  const [value, setValue] = useState('');
  
   /*function handleSubmit(e) {
    e.preventDefault();
    const data = { name: value };
    console.log('submit');
    console.log(value);
    window.fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
  function handleValue(e) {
    setValue(e.target.value);
  }
  }*/
  
    /*const [state, setstate] = useState({
    keyword:'',
    password: ''
  });
  });*/
  const [keyword, setKeyword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
   function handleSearch(e) {
    e.preventDefault();
    fetch('/api/post', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword: keyword,
        postalCode: postalCode,
        startDate: startDate,
        endDate: endDate,
        city: city,
        stateCode: stateCode
      })
    })
      .then(response => response.json())
      .then(json => {
        const accessToken = json.access_token;
        //props.onLogin(accessToken);
      })      .catch(error => {
        //props.onLoginError();
      });
      location.reload();
  };
  
  function handlekeywordChange(e) {
     setKeyword(e.target.value);
  };

  function handlepostalCodeChange(e) {
    setPostalCode(e.target.value);
  };

  function handlestartDateChange(e) {
    setStartDate(e.target.value);
  };

  function handleendDateChange(e) {
    setEndDate(e.target.value);
  };

  function handlecityChange(e) {
    setCity(e.target.value);
  };

  function handlestateCodeChange(e) {
    setStateCode(e.target.value);
  };
  

  return (
    <div>
    <div>
      <form>
         Keyword: <input type="text" name="keyword" value={keyword} onChange={handlekeywordChange}/> <br />
        Postal Code: <input type="text" name="postalCode" value={postalCode} onChange={handlepostalCodeChange}/> <br />
        Start Date: <input type="text" name="startDate" value={startDate} onChange={handlestartDateChange}/> <br />
        End Date: <input type="text" name="endDate" value={endDate} onChange={handleendDateChange}/> <br />
        City: <input type="text" name="city" value={city} onChange={handlecityChange}/> <br />
        State Code: <input type="text" name="stateCode" value={stateCode} onChange={handlestateCodeChange}/> <br />
        <button onClick={handleSearch}>Search</button>
      </form>
    </div>
    
    <div>
      <h1>Events</h1>
     <InitialData initialData={initialData} />
    </div>
    
    </div>
  );
}


export default App;
