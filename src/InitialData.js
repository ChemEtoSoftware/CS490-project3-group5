/*
import React from 'react';
import { List, Header } from 'semantic-ui-react';
export const Movies = ({ initialData }) => {
    return(
        <List>
        {initialData.map(initialData => {
            return (
            <List.Item key={initialData.title}>
            <Header>{initialData.title}</Header>
            </List.Item>
            );
        })}
        </List>
    );
};
*/
import React from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function InitialData(props) {
  const {
    initialData,
    setShowEventPage,
    showEventPage,
    eventPage,
    setEventPage,
    clientId,
    socket,
  } = props;
  function EventPage(currEvent) {
    function Bookmarks() {
      const eventID = currEvent.id;
      socket.emit('create_bookmark', {
        id: clientId,
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
  if (showEventPage) {
    return (
      <List>
        {initialData.map((currEvent) => (
          // eslint-disable-next-line
          <div className="container" onClick={() => EventPage(currEvent, setEventPage, setShowEventPage, clientId, socket)}>
            <List.Item key={currEvent.id}>
              <Header>{currEvent.name}</Header>
              <img src={currEvent.images[0].url} alt="" />
              <p>{currEvent.dates.start.localDate}</p>
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

InitialData.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.object),
  showEventPage: PropTypes.bool,
  setShowEventPage: PropTypes.func,
  eventPage: PropTypes.string,
  setEventPage: PropTypes.func,
  clientId: PropTypes.string,
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InitialData.defaultProps = {
  initialData: [],
  showEventPage: true,
  setShowEventPage: null,
  eventPage: '',
  setEventPage: null,
  clientId: null,
  socket: null,
};

export default InitialData;
