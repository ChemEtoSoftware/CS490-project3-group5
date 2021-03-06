/* eslint no-underscore-dangle: ["error", { "allow": ["_embedded"] }] */
import React, { useState, useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { InitialData } from './InitialData';
import { ListBookmarks } from './ListBookmarks';
// import fetch from 'node-fetch';
const fetch = require('node-fetch');

export function SearchFilterEvents(props) {
  const { clientId, socket, initialMapMarker } = props;
  const [initialData, setInitialData] = useState([]);
  const [error, setError] = useState(false);
  const [locations, setLocations] = useState([]);
  let i;
  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        const prev = [...data._embedded.events];
        setInitialData(prev);
        for (i = 0; i < prev.length; i += 1) {
          const curr = prev[i]._embedded.venues[0].location;
          const { address } = prev[i]._embedded.venues[0].address;
          const { city } = prev[i]._embedded.venues[0].city;
          const { state } = prev[i]._embedded.venues[0].state;
          const dict = {
            lat: curr.latitude, long: curr.longitude, name: prev[i].name, address, city, state,
          };
          setLocations((currLocation) => [...currLocation, dict]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const [keyword, setKeyword] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [radius, setRadius] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [showHide, setShowHide] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [Bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState('');
  const [bookmarkString, setBookmarkString] = useState('');
  // Retrieves users bookmark's after clicking button.
  useEffect(() => {
    socket.on('retrieve_bookmarks', (data) => {
      // const eventArray = JSON.parse(data);
      console.log(data);
      setBookmarks(data);
      setLoading(null);
      setBookmarkString('Bookmarked ');
    });
  }, [showBookmarks]);

  function handleSearch(e) {
    e.preventDefault();
    setError(false);
    setShowHide(false);
    setShowBookmarks(false);
    fetch('/api/post', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        postalcode: postalCode,
        radius,
        startdate: startDate,
        enddate: endDate,
        city,
        statecode: stateCode,
        countrycode: countryCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const prev = [...data._embedded.events];
        setInitialData(prev);
        console.log(prev);
        setLocations([]);
        for (i = 0; i < prev.length; i += 1) {
          const curr = prev[i]._embedded.venues[0].location;
          const dict = { lat: curr.latitude, long: curr.longitude, name: prev[i].name };
          setLocations((currLocation) => [...currLocation, dict]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    // window.location.reload(true);
    if (keyword !== '') {
      setKeyword('');
    }
    if (postalCode !== '') {
      setPostalCode('');
    }
    if (radius !== '') {
      setRadius('');
    }
    if (startDate !== '') {
      setStartDate('');
    }
    if (endDate !== '') {
      setEndDate('');
    }
    if (city !== '') {
      setCity('');
    }
    if (stateCode !== '') {
      setStateCode('');
    }
    if (countryCode !== '') {
      setCountryCode('');
    }
  }

  function displayErrorMessage() {
    return (
      <p>Sorry, your input was invalid. Please enter a new keyword search.</p>
    );
  }

  function handlekeywordChange(e) {
    setKeyword(e.target.value);
  }

  function handlepostalCodeChange(e) {
    setPostalCode(e.target.value);
  }

  function handleradiusChange(e) {
    setRadius(e.target.value);
  }

  function handlestartDateChange(e) {
    setStartDate(e.target.value);
  }

  function handleendDateChange(e) {
    setEndDate(e.target.value);
  }

  function handlecityChange(e) {
    setCity(e.target.value);
  }

  function handlestateCodeChange(e) {
    setStateCode(e.target.value);
  }

  function handlecountryCodeChange(e) {
    setCountryCode(e.target.value);
  }

  function onShowHide() {
    setShowHide((prevShow) => !prevShow);
  }

  function displayFilteredSearchButton() {
    return (
      <div className="buttonHolder">
        {' '}
        <button type="submit" className="search" onClick={() => onShowHide()}>Filter Events</button>
        {' '}
      </div>
    );
  }

  // Function for retrieving bookmarks. Uses socketID.
  function fetchBookmarks() {
    const socketID = socket.id;
    socket.emit('retrieve_bookmarks', socketID);
    setShowBookmarks(!showBookmarks);
    setBookmarks([]);
    setLoading(<h1>Loading...(It takes a while to load)</h1>);
    setBookmarkString('');
  }

  function displayFilteredSearch() {
    return (
      <div className="filters">
        <div className="col-30">
          <label htmlFor="postalCode">Postal Code (5 digits): </label>
        </div>
        <div className="col-70">
          <input id="postalCode" type="text" name="postalCode" value={postalCode} onChange={handlepostalCodeChange} />
          {' '}
          <br />
        </div>

        <div className="col-30">
          <label htmlFor="radius">Radius (in miles):  </label>
        </div>
        <div className="col-70">
          <input if="radius" type="text" name="radius" value={radius} onChange={handleradiusChange} />
          {' '}
          <br />
        </div>

        <div className="col-30">
          <label htmlFor="startDate">Start Date (format: yyyy-mm-dd): </label>
        </div>
        <div className="col-70">
          <input id="startDate" type="text" name="startDate" value={startDate} onChange={handlestartDateChange} />
          {' '}
          <br />
        </div>

        <div className="col-30">
          <label htmlFor="endDate">End Date (format: yyyy-mm-dd): </label>
        </div>
        <div className="col-70">
          <input id="endDate" type="text" name="endDate" value={endDate} onChange={handleendDateChange} />
          {' '}
          <br />
        </div>

        <div className="col-30">
          <label htmlFor="city"> City: </label>
        </div>
        <div className="col-70">
          <input id="city" type="text" name="city" value={city} onChange={handlecityChange} />
          {' '}
          <br />
        </div>

        <div className="col-30">
          <label htmlFor="stateCode">State Code (2 letters): </label>
        </div>
        <div className="col-70">
          <input id="stateCode" type="text" name="stateCode" value={stateCode} onChange={handlestateCodeChange} />
          {' '}
          <br />
        </div>

        <div className="col-30">
          <label htmlFor="countryCode">Country Code (2 letters): </label>
        </div>
        <div className="col-70">
          <input id="countryCode" type="text" name="countryCode" value={countryCode} onChange={handlecountryCodeChange} />
          {' '}
          <br />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="search">
        <form id="frm">
          <div className="col-30">
            <label htmlFor="keyword">Keyword: </label>
          </div>
          <div className="col-70">
            <input className="keywordInput" type="text" name="keyword" value={keyword} onChange={handlekeywordChange} />
            {' '}
            <br />
          </div>
          {showHide === true ? displayFilteredSearch() : null}
          <div className="centerButtons">
            {showHide === false ? displayFilteredSearchButton() : null}
            <div className="buttonHolder">
              {' '}
              <button type="submit" className="search" onClick={handleSearch}>Search</button>
              {' '}
            </div>
          </div>
        </form>
      </div>
      <div className="centerBookmarks">
        <div className="buttonHolder">
          {' '}
          <button type="button" className="search" onClick={fetchBookmarks}>Bookmarks</button>
          {' '}
        </div>
      </div>
      {/* Either displays initial data or bookmarks. */}
      <div className="search">
        <h1 id="PageLabel">
          {bookmarkString}
          Events
        </h1>
        {error === true
          ? displayErrorMessage()
          : [
            (showBookmarks === true
              ? (
                <div>
                  {loading}
                  <ListBookmarks
                    Bookmarks={Bookmarks}
                    clientId={clientId}
                    socket={socket}
                    setShowBookmarks={setShowBookmarks}
                    setBookmarkString={setBookmarkString}
                  />
                </div>
              )
              : (
                <InitialData
                  initialData={initialData}
                  locations={locations}
                  clientId={clientId}
                  socket={socket}
                  initialMapMarker={initialMapMarker}
                  //  eslint-disable-next-line
                />
              ))]}
      </div>
    </div>

  );
}

SearchFilterEvents.propTypes = {
  clientId: PropTypes.string,
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  initialMapMarker: PropTypes.objectOf(PropTypes.object),
};

SearchFilterEvents.defaultProps = {
  clientId: null,
  socket: null,
  initialMapMarker: { lat: 51.00, long: -0.9 },
};
export default SearchFilterEvents;
// socket version

/* function handleSearch(e) {
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
  } */

/* useEffect(() => {
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
  } */
