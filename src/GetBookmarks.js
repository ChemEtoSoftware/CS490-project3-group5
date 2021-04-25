import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { ListBookmarks } from './ListBookmarks';

export function GetBookmarks(props) {
  const {
    clientId,
    Bookmarks,
    setShowEventPage,
    //  eslint-disable-next-line
    showEventPage,
    //  eslint-disable-next-line
    eventPage,
    setEventPage,
  } = props;
  return (
    <ListBookmarks
      Bookmarks={Bookmarks}
      setEventPage={setEventPage}
      setShowEventPage={setShowEventPage}
      showEventPage={showEventPage}
      eventPage={eventPage}
      clientId={clientId}
    />
  );
}

GetBookmarks.propTypes = {
  Bookmarks: PropTypes.arrayOf(PropTypes.object),
  clientId: PropTypes.string,
  showEventPage: PropTypes.bool,
  setShowEventPage: PropTypes.func,
  eventPage: PropTypes.string,
  setEventPage: PropTypes.func,
};

GetBookmarks.defaultProps = {
  Bookmarks: [],
  clientId: null,
  showEventPage: true,
  setShowEventPage: null,
  eventPage: '',
  setEventPage: null,
};

export default GetBookmarks;
