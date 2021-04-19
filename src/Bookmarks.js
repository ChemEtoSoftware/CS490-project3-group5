/* eslint-disable */
import { List, Header } from 'semantic-ui-react';
export function Bookmarks(eventID, clientId, socket) {
  alert(eventID);
  alert(clientId);
  socket.emit('create_bookmark', {id : clientId, eventID : eventID})
}
export default Bookmarks;
