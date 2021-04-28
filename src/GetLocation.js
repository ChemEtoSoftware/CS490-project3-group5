import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchFilterEvents } from './SearchFilter';

const fetch = require('node-fetch');

export function GetLocation(props) {
  const { clientId, socket } = props;
  const [locTrue, updateLoc] = useState(false);
  const [initialMapMarker, setInitialMapMarker] = useState({ lat: 51.00, long: -0.9 });

  function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setInitialMapMarker({ lat, long });
    fetch('/location', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      }),
    });
    // setTimeout(function() {updateLoc(true);},1000);
    updateLoc(true);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  return (
    <div>
      {locTrue === true ? <SearchFilterEvents clientId={clientId} socket={socket} initialMapMarker={initialMapMarker} />
        : getLocation()}
    </div>
  );

  /*
    <button onClick={getLocation}>Try It</button>
    return (
        <div>
            <button onclick="getLocation()"> Try It </button>
            <p id="demo"> </p>
            <script type="text/javascript">
                var x = document.getElementById("demo");

                function getLocation() {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                  } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                  }
                }

                function showPosition(position) {
                  x.innerHTML = "Latitude: " + position.coords.latitude +
                  "<br>Longitude: " + position.coords.longitude;
                }
            </script>
        </div>
    ); */
}

GetLocation.propTypes = {
  clientId: PropTypes.string,
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

GetLocation.defaultProps = {
  clientId: null,
  socket: null,
};
export default GetLocation;
