/* eslint-disable no-underscore-dangle */
import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import {
  MapContainer, TileLayer, Marker, Popup,
}
  from 'react-leaflet';

export function EventPage(props) {
  /* Couldn't figure out how to pass variables as props in onclick,
  so instead just use them directly. Bookmarks function can either
  create or remove bookmark. This component displays single bookmark */
  console.log('Hello');
  const {
    currEvent,
    clientId,
    socket,
  } = props;
  console.log(currEvent);
  function Bookmarks() {
    const socketID = socket.id;
    const eventID = currEvent.id;
    socket.emit('create_bookmark', {
      id: socketID,
      eventID,
    });
  }
  const i = 40;
  const n = '40';
  const n1 = '400';
  const n2 = '4000';
  const n3 = '40000';
  const n4 = '400000';
  const lat = currEvent._embedded.venues[0].location.latitude;
  const long = currEvent._embedded.venues[0].location.longitude;
  return (
    <div>
      <List key={clientId * i}>
        <div className="container" key={clientId + i}>
          <List.Item key={currEvent.id + n}>
            <Header key={currEvent.id + n1}>{currEvent.name}</Header>
            <img key={currEvent.id + n2} src={currEvent.images[0].url} alt="" width="300" height="200" />
            <div key={currEvent.id + n3} className="buttonHolder">
              <button type="button" className="search" onClick={Bookmarks}> Bookmark </button>
            </div>
            <p key={currEvent.id + n4}>{currEvent.dates.start.localDate}</p>
          </List.Item>
        </div>
      </List>
      <div id="mapid">
        <MapContainer center={[lat, long]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker key={`marker-${currEvent.id}`} position={[lat, long]}>
            <Popup>
              {currEvent.name}
              <br />
              {typeof currEvent._embedded.venues[0].address === 'undefined' ? null : currEvent._embedded.venues[0].address.line1}
              ,
              {typeof currEvent._embedded.venues[0].city === 'undefined' ? null : currEvent._embedded.venues[0].city.name}
              ,
              {typeof currEvent._embedded.venues[0].state === 'undefined' ? null : currEvent._embedded.venues[0].state.stateCode}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
EventPage.propTypes = {
  currEvent: PropTypes.objectOf(PropTypes.object),
  clientId: PropTypes.string,
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

EventPage.defaultProps = {
  currEvent: '',
  clientId: null,
  socket: null,
};
export default EventPage;
