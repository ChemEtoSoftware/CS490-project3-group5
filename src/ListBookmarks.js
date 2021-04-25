import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';

export function ListBookmarks(props) {
  const {
    Bookmarks,
    setEventPage,
    setShowEventPage,
    showEventPage,
    eventPage,
    clientId,
  } = props;
  console.log(Bookmarks);
  function EventPage(currEvent) {
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
  if (showEventPage) {
    return (
      <List>
        {Bookmarks.map((currEvent) => (
          // eslint-disable-next-line
          <div className="container" onClick={() => EventPage(currEvent, setEventPage, setShowEventPage, clientId, socket)}>
            <List.Item key={currEvent.id}>
              {currEvent.fault ? null : <Header>{currEvent.name}</Header>}
              {currEvent.fault ? null : <img src={currEvent.images[0].url} alt="" />}
              {currEvent.fault ? null : <p>{currEvent.dates.start.localDate}</p>}
            </List.Item>
          </div>
        ))}
      </List>
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
  showEventPage: PropTypes.bool,
  setShowEventPage: PropTypes.func,
  eventPage: PropTypes.string,
  setEventPage: PropTypes.func,
};

ListBookmarks.defaultProps = {
  Bookmarks: [],
  clientId: null,
  showEventPage: true,
  setShowEventPage: null,
  eventPage: '',
  setEventPage: null,
};

export default ListBookmarks;