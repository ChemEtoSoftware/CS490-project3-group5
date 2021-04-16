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
import { EventPage } from './EventPage';

export function InitialData(props) {
  const {
    initialData,
    setShowEventPage,
    showEventPage,
    eventPage,
    setEventPage,
  } = props;
  console.log(showEventPage);
  if (showEventPage) {
    return (
      <List>
        {initialData.map((currEvent) => (
          // eslint-disable-next-line
          <div className="container" onClick={() => EventPage(currEvent, setEventPage, setShowEventPage)}>
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
};

InitialData.defaultProps = {
  initialData: [],
  showEventPage: true,
  setShowEventPage: null,
  eventPage: '',
  setEventPage: null,
};

export default InitialData;
