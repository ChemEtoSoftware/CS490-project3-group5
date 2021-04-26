import React from 'react';
import './App.css';
import { List, Header } from 'semantic-ui-react';

export function EventPage(currEvent, setEventPage, setShowEventPage, clientId, socket) {
  /* Couldn't figure out how to pass variables as props in onclick,
  so instead just use them directly. Bookmarks function can either
  create or remove bookmark. This component displays single bookmark */
  function Bookmarks() {
    const socketID = socket.id;
    const eventID = currEvent.id;
    socket.emit('create_bookmark', {
      id: socketID,
      eventID,
    });
  }
  setShowEventPage(false);
  setEventPage(
    <List>
      <div className="container">
        <List.Item key={currEvent.id}>
          <Header>{currEvent.name}</Header>
          <img src={currEvent.images[0].url} alt="" />
          <div className="buttonHolder">
            <button type="button" className="search" onClick={Bookmarks}> Bookmark </button>
          </div>
          <p>{currEvent.dates.start.localDate}</p>
        </List.Item>
      </div>
    </List>,
  );
}
export default EventPage;
