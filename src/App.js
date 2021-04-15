/* eslint-disable */
import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { InitialData } from './InitialData';
//import 'semantic-ui-css/semantic.min.css'

export const socket = io();

function App() {
  const [initialData, setInitialData] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch('/api')
    .then((response) => response.json(),)
    .then((data) => setInitialData(data._embedded.events))
    .catch(err => {
            setError(true);
            console.log(error);
        })
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
  const [radius, setRadius] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showHide, setShowHide] = useState(false);
  
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
        postalcode: postalCode,
        radius: radius,
        startdate: startDate,
        enddate: endDate,
        city: city,
        statecode: stateCode,
        countrycode: countryCode,
      })
    })
    .then(response => response.json())
    /*.then(json => {
      const accessToken = json.access_token;
      //props.onLogin(accessToken);
    })      
    .catch(error => {
      //props.onLoginError();
    });*/
    .then((response) => response.json(),)
    .then((data) => setInitialData(data._embedded.events))
    .catch(err => {
      setError(true);
      console.log(error);
    })
    //location.reload();
  };
  
  function handlekeywordChange(e) {
     setKeyword(e.target.value);
  };

  function handlepostalCodeChange(e) {
    setPostalCode(e.target.value);
  };
  
  function handleradiusChange(e) {
    setRadius(e.target.value);
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
  
  function handlecountryCodeChange(e) {
    setCountryCode(e.target.value);
  };
  
  
  function displayFilteredSearchButton() {
    return (
      <div className="buttonHolder"> <button className="search" onClick={() => onShowHide()}>Filters</button> </div>
    );
  }
  
  function onShowHide() {
    setShowHide((prevShow) => !prevShow);
  }
  
  function displayFilteredSearch() {
    return (
      <div className="filters">
        <div class="col-30">
          <label>Postal Code (5 digits): </label>
        </div>
        <div class="col-70">
          <input type="text" name="postalCode" value={postalCode} onChange={handlepostalCodeChange}/> <br />
        </div>
        
        <div class="col-30">
          <label>Radius (in miles):  </label>
        </div>
        <div class="col-70">
          <input type="text" name="radius" value={radius} onChange={handleradiusChange}/> <br />
        </div>
        
        <div class="col-30">
          <label>Start Date (format: yyyy-mm-dd): </label>
        </div>
        <div class="col-70">
          <input type="text" name="startDate" value={startDate} onChange={handlestartDateChange}/> <br />
        </div>
        
        <div class="col-30">
          <label>End Date (format: yyyy-mm-dd): </label>
        </div>
        <div class="col-70">
          <input type="text" name="endDate" value={endDate} onChange={handleendDateChange}/> <br />
        </div>
        
        <div class="col-30">
          <label> City: </label>
        </div>
        <div class="col-70">
          <input type="text" name="city" value={city} onChange={handlecityChange}/> <br />
        </div>
        
        <div class="col-30">
          <label>State Code (2 letters): </label>
        </div>
        <div class="col-70">
          <input type="text" name="stateCode" value={stateCode} onChange={handlestateCodeChange}/> <br />
        </div>
        
        <div class="col-30">
          <label>Country Code (2 letters): </label>
        </div>
        <div class="col-70">
          <input type="text" name="countryCode" value={countryCode} onChange={handlecountryCodeChange}/> <br />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="search">
        <form>
          <div class="col-30">
            <label>Keyword: </label>
          </div>
          <div class="col-70">
            <input className="keywordInput" type="text" name="keyword" value={keyword} onChange={handlekeywordChange}/> <br />
          </div>
          {showHide === false ? displayFilteredSearchButton() : null}
          {showHide === true ? displayFilteredSearch() : null} 
          <div className="buttonHolder"> <button className="search" onClick={handleSearch}>Search</button> </div>
        </form>
      </div>
      
      <div className="search">
        <h1>Events</h1>
        {error ? <p>Sorry, your input was invalid. Please enter a new keyword search.</p> : null}
       <InitialData initialData={initialData} />
      </div>
    </div>
  );
}


export default App;
