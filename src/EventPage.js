import React from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Bookmarks } from './Bookmarks';

export function EventPage(props) {
  const { currEvent, setEventPage, setShowEventPage } = props;
  setShowEventPage(false);
  setEventPage(
    <List>
      <div className="container">
        <List.Item key={currEvent.id}>
          <Header>{currEvent.name}</Header>
          <img src={currEvent.images[0].url} alt="" />
          <div className="buttonHolder">
            <button type="button" className="search" onClick={() => Bookmarks(currEvent)}> Bookmark </button>
          </div>
          <p>{currEvent.dates.start.localDate}</p>
        </List.Item>
      </div>
    </List>,
  );
}

EventPage.propTypes = {
  currEvent: PropTypes.objectOf(PropTypes.object),
  setEventPage: PropTypes.func,
  setShowEventPage: PropTypes.func,
};

EventPage.defaultProps = {
  currEvent: '',
  setEventPage: null,
  setShowEventPage: null,
};

export default EventPage;
