import React from 'react';
import { List, Header } from 'semantic-ui-react';
import { Bookmarks } from './Bookmarks';

export function EventPage(currEvent, setEventPage, setShowEventPage, clientId, socket) {
  setShowEventPage(false);
  setEventPage(
    <List>
      <div className="container">
        <List.Item key={currEvent.id}>
          <Header>{currEvent.name}</Header>
          <img src={currEvent.images[0].url} alt="" />
          <div className="buttonHolder">
            <button type="button" className="search" onClick={() => Bookmarks(currEvent.id, clientId, socket)}> Bookmark </button>
          </div>
          <p>{currEvent.dates.start.localDate}</p>
        </List.Item>
      </div>
    </List>,
  );
}

export default EventPage;
