/* eslint-disable */
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

export function Bookmarks(props) {
  const { eventID, clientId, socket } = props;
  alert(eventID);
  alert(clientId);
  socket.emit('create_bookmark', {id : clientId, eventID : eventID})
}
Bookmarks.propTypes = {
  eventID: PropTypes.string,
  clientId: PropTypes.string,
  socket: PropTypees.instanceOf(io()),
};
Bookmarks.defaultProps = {
  eventID: '',
  clientId: '',
  socket: null,
};
export default Bookmarks;
