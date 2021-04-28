import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';

export function Comment(props) {
//   const { setLogin, socket, authID } = props;
  const inputRef = useRef(null);
  const { socket, eventId, clientId } = props;
  const [comments, setComments] = useState([]);
  const [showExistingComments, setShowExistingComm] = useState(false);

  function onClick() {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('Theres nothing to comment!');
    } else if (inputRef.current != null) {
      const comment = inputRef.current.value;
      const uniqueID = socket.id;
      const data = {
        socketID: uniqueID,
        comment,
        eventID: eventId,
        clientId,
      };
      socket.emit('comment', data);
    }
  }
  useEffect(() => {
    console.log('Emitting Eventload');
    if (!showExistingComments) {
      socket.emit('Eventload', { uniqueID: socket.id, clientId, eventId });
    }
    socket.on('EventLoad', (data) => {
      // Eventload is socketId, clientId, eventId
      console.log('comments received from server');
      // check if there exists comments before setshowExistingComm becomes true
      setComments(data.comments);
      console.log(comments);
      setShowExistingComm(true);
    });
    return () => socket.removeEventListener('EventLoad');
  }, []);
  return (
    <div>
      <form>
        <div>
          <textarea name="comments" id="comments" ref={inputRef}>
            Hey... say something!
          </textarea>
        </div>
        <button type="submit" value="Submit" onClick={() => { onClick(); }}>
          Add Comment
        </button>
      </form>
    </div>
  );
}

Comment.propTypes = {
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  clientId: PropTypes.string,
  eventId: PropTypes.string,
};
Comment.defaultProps = {
  socket: null,
  clientId: null,
  eventId: null,
};
export default Comment;
// <input className="input" ref={inputRef} type="text" />
