import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';

export function Comment(props) {
//   const { setLogin, socket, authID } = props;
  const inputRef = useRef(null);//useRef for input box
  const { socket, eventId, clientId } = props;
  const [comments, setComments] = useState([]);//saves existing comments in state variable
  const [showExistingComments, setShowExistingComm] = useState(false);//toggle for showing exist com
  const [showCommentBox, setShowCommentBox] = useState(false);//toggle for showing commentbox
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
  function conditionalCommentBox() {
    if()
    return(<div>
      <form>
        <div>
          <textarea name="comments" id="comments" ref={inputRef}>
            Hey... say something!
          </textarea>
        </div>
        <button type="button" onClick={() => onClick()}>
          Add Comment
        </button>
      </form>
    </div>);
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
    conditionalCommentBox();
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
