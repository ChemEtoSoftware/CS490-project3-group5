import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { ListBookmarks } from './ListBookmarks';

export function GetBookmarks(props) {
  const {
    clientId,
    initialData,
    setShowEventPage,
    //  eslint-disable-next-line
    showEventPage,
    //  eslint-disable-next-line
    eventPage,
    setEventPage,
  } = props;
  return (
    <ListBookmarks
      initialData={initialData}
      setEventPage={setEventPage}
      setShowEventPage={setShowEventPage}
      showEventPage={showEventPage}
      eventPage={eventPage}
      clientId={clientId}
    />
  );
}

GetBookmarks.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.object),
  clientId: PropTypes.string,
  showEventPage: PropTypes.bool,
  setShowEventPage: PropTypes.func,
  eventPage: PropTypes.string,
  setEventPage: PropTypes.func,
};

GetBookmarks.defaultProps = {
  initialData: [],
  clientId: null,
  showEventPage: true,
  setShowEventPage: null,
  eventPage: '',
  setEventPage: null,
};

export default GetBookmarks;
