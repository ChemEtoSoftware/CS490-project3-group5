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
  const [keyword, setKeyword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [radius, setRadius] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [showEventPage, setShowEventPage] = useState(true);
  const [eventPage, setEventPage] = useState('');
  useEffect(() => {
    fetch('/api')
    .then((response) => response.json(),)
    .then((data) => setInitialData(data._embedded.events))
    .catch(err => {
            setError(true);
            console.log(error);
        })
  }, [eventPage]);
  
  console.log(initialData);
  
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
    .then(json => {
      const accessToken = json.access_token;
      //props.onLogin(accessToken);
    })      
    .catch(error => {
      //props.onLoginError();
    });
    location.reload();
  };
  
  /*function handleSearch(e) {
    e.preventDefault();
    setError(false);
    setShowHide(false);
    socket.emit('apiSearch', {
      keyword: keyword,
      postalcode: postalCode,
      radius: radius,
      startdate: startDate,
      enddate: endDate,
      city: city,
      statecode: stateCode,
      countrycode: countryCode,
    });
    console.log("hello");
  }*/
  
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
      <div className="buttonHolder"> <button className="search" onClick={() => onShowHide()}>Filter Events</button> </div>
    );
  }
  
  function onShowHide() {
    setShowHide((prevShow) => !prevShow);
  }
  
  function displayFilteredSearch() {
    return (
      <div className="filters">
        <div className="col-30">
          <label>Postal Code (5 digits): </label>
        </div>
        <div className="col-70">
          <input type="text" name="postalCode" value={postalCode} onChange={handlepostalCodeChange}/> <br />
        </div>
        
        <div className="col-30">
          <label>Radius (in miles):  </label>
        </div>
        <div className="col-70">
          <input type="text" name="radius" value={radius} onChange={handleradiusChange}/> <br />
        </div>
        
        <div className="col-30">
          <label>Start Date (format: yyyy-mm-dd): </label>
        </div>
        <div className="col-70">
          <input type="text" name="startDate" value={startDate} onChange={handlestartDateChange}/> <br />
        </div>
        
        <div className="col-30">
          <label>End Date (format: yyyy-mm-dd): </label>
        </div>
        <div className="col-70">
          <input type="text" name="endDate" value={endDate} onChange={handleendDateChange}/> <br />
        </div>
        
        <div className="col-30">
          <label> City: </label>
        </div>
        <div className="col-70">
          <input type="text" name="city" value={city} onChange={handlecityChange}/> <br />
        </div>
        
        <div className="col-30">
          <label>State Code (2 letters): </label>
        </div>
        <div className="col-70">
          <input type="text" name="stateCode" value={stateCode} onChange={handlestateCodeChange}/> <br />
        </div>
        
        <div className="col-30">
          <label>Country Code (2 letters): </label>
        </div>
        <div className="col-70">
          <input type="text" name="countryCode" value={countryCode} onChange={handlecountryCodeChange}/> <br />
        </div>
      </div>
    );
  }
  
  /*useEffect(() => {
    socket.on('start', (data) => {
      console.log("on first connect")
      setInitialData(data._embedded.events);
    });
    
    socket.on('apiResult', (data) => {
      console.log("on api return")
      console.log(data._embedded.events)
      setInitialData(data._embedded.events);
      if (document.getElementsByName("keyword")[0]){
        document.getElementsByName("keyword")[0].value='';
      }
      if (document.getElementsByName("postalCode")[0]){
        document.getElementsByName("postalCode")[0].value='';
      }
      if (document.getElementsByName("radius")[0]){
        document.getElementsByName("radius")[0].value='';
      }
      if (document.getElementsByName("startDate")[0]){
        document.getElementsByName("startDate")[0].value='';
      }
      if (document.getElementsByName("endDate")[0]){
        document.getElementsByName("endDate")[0].value='';
      }
      if (document.getElementsByName("city")[0]){
        document.getElementsByName("city")[0].value='';
      }
      if (document.getElementsByName("stateCode")[0]){
        document.getElementsByName("stateCode")[0].value='';
      }
      if (document.getElementsByName("countryCode")[0]){
        document.getElementsByName("countryCode")[0].value='';
      }
    });
    
    socket.on('error', (data) => {
      setError(true);
      console.log(error);
      console.log(document.getElementsByName("keyword")[0].value);
      if (document.getElementsByName("keyword")[0]){
        document.getElementsByName("keyword")[0].value='';
      }
      if (document.getElementsByName("postalCode")[0]){
        document.getElementsByName("postalCode")[0].value='';
      }
      if (document.getElementsByName("radius")[0]){
        document.getElementsByName("radius")[0].value='';
      }
      if (document.getElementsByName("startDate")[0]){
        document.getElementsByName("startDate")[0].value='';
      }
      if (document.getElementsByName("endDate")[0]){
        document.getElementsByName("endDate")[0].value='';
      }
      if (document.getElementsByName("city")[0]){
        document.getElementsByName("city")[0].value='';
      }
      if (document.getElementsByName("stateCode")[0]){
        document.getElementsByName("stateCode")[0].value='';
      }
      if (document.getElementsByName("countryCode")[0]){
        document.getElementsByName("countryCode")[0].value='';
      }
    });
  }, []);
  
  function displayErrorMessage() {
    //setError(false);
    return (
      <div><p>Sorry, your input was invalid. Please enter a new keyword search.</p></div>
    );
  }*/
  
  return (
    <div>
      <div className="search">
        <form id="frm">
          <div className="col-30">
            <label>Keyword: </label>
          </div>
          <div className="col-70">
            <input className="keywordInput" type="text" name="keyword" value={keyword} onChange={handlekeywordChange}/> <br />
          </div>
          {showHide === false ? displayFilteredSearchButton() : null}
          {showHide === true ? displayFilteredSearch() : null} 
          <div className="buttonHolder"> <button className="search" onClick={handleSearch}>Search</button> </div>
        </form>
      </div>
      
      <div className="search">
      <h1>Events</h1>
      {!error ? <p>Sorry, your input was invalid. Please enter a new keyword search.</p> : null}
       <InitialData initialData={initialData} setShowEventPage={setShowEventPage} 
       showEventPage={showEventPage} eventPage={eventPage} 
       setEventPage={setEventPage}/>
      </div>
    </div>
  );
}


export default App;
