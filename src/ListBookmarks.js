import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { List, Header } from 'semantic-ui-react';
import { EventPage } from './EventContainer';

export function ListBookmarks(props) {
  // List bookmarks
  const {
    Bookmarks,
    setEventPage,
    setShowEventPage,
    showEventPage,
    eventPage,
    clientId,
    socket,
  } = props;
  const i = 2;
  const n = '10';
  const n1 = '100';
  const n2 = '1000';
  const n3 = '10000';
  console.log(Bookmarks);
  if (showEventPage) {
    return (
      <List key={i * 10}>
        {Bookmarks.map((currEvent) => (
          // eslint-disable-next-line
          <div className="container" key={currEvent.id + n} onClick={() => EventPage(currEvent, setEventPage, setShowEventPage, clientId, socket)}>
            <List.Item key={currEvent.id}>
              {currEvent.fault ? null : <Header key={currEvent.id + n1}>{currEvent.name}</Header>}
              {currEvent.fault ? null : <img key={currEvent.id + n2} src={currEvent.images[0].url} alt="" />}
              {currEvent.fault ? null : <p key={currEvent.id + n3}>{currEvent.dates.start.localDate}</p>}
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
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ListBookmarks.defaultProps = {
  Bookmarks: [],
  clientId: null,
  showEventPage: true,
  setShowEventPage: null,
  eventPage: '',
  setEventPage: null,
  socket: null,
};

export default ListBookmarks;
