/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import './map.css';
import { EventPage } from './EventContainer';

export function ListBookmarks(props) {
  // List bookmarks
  const {
    Bookmarks,
    clientId,
    socket,
    setShowBookmarks,
  } = props;
  const [eventPage, setEventPage] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const n = '10';
  const n1 = '100';
  const n2 = '1000';
  const n3 = '10000';
  console.log(Bookmarks);
  function showHome() {
    setShowPage(false);
    setShowBookmarks(false);
  }
  function renderPage(currEvent) {
    socket.emit('request_data', { eventID: currEvent.id });
    setShowPage(true);
    setEventPage(
      <div>
        <div>
          <button type="button" className="search" onClick={showHome}>Home</button>
        </div>
        <EventPage
          currEvent={currEvent}
          clientId={clientId}
          socket={socket}
        />
      </div>,
    );
  }
  if (!showPage) {
    return (
      <div className="container-fluid">
        <ul className="events">
          {Bookmarks.map((currEvent) => (
            <li>
              <div key={currEvent.id + n} onClick={() => renderPage(currEvent)}>
                <img className="event_image" key={currEvent.id + n2} src={currEvent.images[0].url} alt="" width="300" height="200" />
                <h3 key={currEvent.id + n1} width="300">{currEvent.name}</h3>
                <p key={currEvent.id + n3}>{currEvent.dates.start.localDate}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  //  eslint-disable-next-line
  }
  //  eslint-disable-next-line
  else {
    return (eventPage);
  }
}
ListBookmarks.propTypes = {
  Bookmarks: PropTypes.arrayOf(PropTypes.object),
  clientId: PropTypes.string,
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setShowBookmarks: PropTypes.func,
};

ListBookmarks.defaultProps = {
  Bookmarks: [],
  clientId: null,
  socket: null,
  setShowBookmarks: null,
};

export default ListBookmarks;
