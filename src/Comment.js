import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';

export function Comment(props) {
  const inputRef = useRef(null);
  const { socket, eventId, clientId } = props;
  const [comments, setComments] = useState({});
  const [showExistingComments, setShowExistingComm] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  function buttonHandler() {
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
  function conditionalExistingComments() {
    if (showExistingComments) {
      return (
        <h1>Comments</h1>
      );
    }
    return null;
  }
  function conditionalCommentBox() {
    if (showCommentBox) {
      return (
        <div>
          <form>
            <div>
              <div>
                <img src={userImage} className="profileImage" alt="User Profile" />
                <h3>{userName}</h3>
              </div>
              <textarea name="comments" id="comments" ref={inputRef}>
                Hey... say something!
              </textarea>
            </div>
            <button type="button" onClick={() => buttonHandler()}>
              Add Comment
            </button>
          </form>
        </div>
      );
    }
    return null;
  }
  useEffect(() => {
    console.log('Emitting Eventload');
    if (!showCommentBox) {
      socket.emit('Eventload', { uniqueID: socket.id, clientId, eventId });
    }
    socket.on('EventLoad', (data) => {
      // Eventload is socketId, clientId, eventId
      // check if there exists comments before setshowExistingComm becomes true
      if (data.eventId === eventId) {
        console.log(data.Image);
        setUserImage(data.Image);
        setUserName(data.Name);
        if (data.Pairs !== 'None') {
          setComments(data.Pairs);
          console.log(comments);
          setShowExistingComm(true);
        }
        setShowCommentBox(true);
      }
    });
    return () => {
      socket.removeEventListener('EventLoad');
    };
  }, []);
  useEffect(() => {
    socket.on('CommentLoad', (data) => {
      if (data.eventId === eventId) {
        console.log(data);
        setComments(data);
        console.log(comments);
      }
    });
    return () => {
      socket.removeEventListener('CommentLoad');
    };
  }, []);
  return (
    <div>
      {conditionalCommentBox()}
      {conditionalExistingComments()}
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
