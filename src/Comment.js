import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';
// import io from 'socket.io-client';

export function Comment(props) {
  const inputRef = useRef(null);
  const { socket, eventId, clientId } = props;
  const [comments, setComments] = useState([]);
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
      console.log('Comments', comments);
      return (
        <div>
          <h1>Comments</h1>
          <ul>
            {comments.map((item, index) => (
              <ListItem ind={index} name={item} />
            ))}
          </ul>
        </div>
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
      if (showExistingComments) {
        setComments(data.comments);
      }
      if (data.eventId === eventId) {
        console.log(data.Image);
        setUserImage(data.Image);
        setUserName(data.Name);
        setShowCommentBox(true);
        if (data.comments[0] === 'True') {
          setComments(data.comments);
          setShowExistingComm(true);
        }
      }
    });
    // return () => {
    //   socket.removeEventListener('EventLoad');
    // };
  }, []);

  return (
    <div>
      {conditionalExistingComments()}
      {conditionalCommentBox()}
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
