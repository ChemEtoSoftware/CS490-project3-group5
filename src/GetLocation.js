/* eslint-disable */
import { SearchFilterEvents } from './SearchFilter';
import React, { useState } from 'react';
export function GetLocation(props) {
    const { clientId, socket } = props;
    const [locTrue, updateLoc] = useState(false);
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        fetch('/location', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: position.coords.latitude,
            long: position.coords.longitude
          })
        });
        //setTimeout(function() {updateLoc(true);},1000);
        updateLoc(true);
    }
    
    return ( 
        <div>
            {locTrue===true ? <SearchFilterEvents clientId={clientId} socket={socket} /> : getLocation()}
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
    );*/
}