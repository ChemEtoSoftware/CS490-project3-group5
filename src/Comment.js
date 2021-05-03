import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';
import './Comments.css';
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
      inputRef.current.value = '';
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
        <div className="existingComm">
          <h1 className="existingCommHead">Comments</h1>
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
  function conditionalTextBox() {
    if (inputRef.current !== null) {
      return (inputRef.current.value);
    }
    return ('');
  }
  function conditionalCommentBox() {
    if (showCommentBox) {
      return (
        <div className="commentBox">
          <form>
            <div>
              <div>
                <img src={userImage} className="profileImage" alt="User Profile" />
                <h3 className="commentName">{userName}</h3>
              </div>
              <textarea className="comments" id="comments" ref={inputRef}>
                {conditionalTextBox()}
              </textarea>
            </div>
            <button type="button" className="commentButton" onClick={() => buttonHandler()}>
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
          console.log(data.comments.length);
          console.log(data.comments);
          if (data.comments.length > 1) {
            const newComments = data.comments.slice(1);
            console.log(newComments);
            setComments(newComments);
            setShowExistingComm(true);
          }
        }
      }
    });
    return () => {
      socket.removeEventListener('EventLoad');
    };
  }, []);
  useEffect(() => {
    socket.on('Comment', (data) => {
      console.log(data);
      console.log('Event IDs: ', data.eventID, eventId);
      if (data.eventID === eventId) {
        console.log(data.comments);
        if (data.comments[0] === 'True') {
          if (data.comments.length > 1) {
            const newComments = data.comments.slice(1);
            console.log('New Comments, comments: ', newComments, comments);
            setComments(newComments);
            if (newComments.length > 0 && !showExistingComments) {
              setShowExistingComm(true);
            }
          }
        }
      }
    });
    return () => {
      socket.removeEventListener('Comment');
    };
  }, [comments]);

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
