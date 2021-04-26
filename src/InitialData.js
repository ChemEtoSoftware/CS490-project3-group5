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
import { EventPage } from './EventContainer';

export function InitialData(props) {
  /* All these states and socket are
  passed as props to prevent cyclical
  import in EventContainer.js
  This file displays ALL the initial data */
  const {
    initialData,
    setShowEventPage,
    showEventPage,
    eventPage,
    setEventPage,
    clientId,
    socket,
  } = props;
  const i = 20;
  const n = '20';
  const n1 = '200';
  const n2 = '2000';
  const n3 = '20000';
  if (showEventPage) {
    return (
      <List key={clientId * i}>
        {initialData.map((currEvent) => (
          // eslint-disable-next-line
          <div className="container" key={currEvent.id + n} onClick={() => EventPage(currEvent, setEventPage, setShowEventPage, clientId, socket)}>
            <List.Item key={currEvent.id}>
              <Header key={currEvent.id + n1}>{currEvent.name}</Header>
              <img key={currEvent.id + n2} src={currEvent.images[0].url} alt="" />
              <p key={currEvent.id + n3}>{currEvent.dates.start.localDate}</p>
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
