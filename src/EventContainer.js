/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Header } from 'semantic-ui-react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
// import GoogleMapReact from 'google-map-react';

export function EventPage(currEvent, setEventPage, setShowEventPage, clientId, socket) {
  /* Couldn't figure out how to pass variables as props in onclick,
  so instead just use them directly. Bookmarks function can either
  create or remove bookmark. This component displays single bookmark */
  
  function Bookmarks() {
    const socketID = socket.id;
    const eventID = currEvent.id;
    socket.emit('create_bookmark', {
      id: socketID,
      eventID,
    });
  }
  const i = 40;
  const n = '40';
  const n1 = '400';
  const n2 = '4000';
  const n3 = '40000';
  const n4 = '400000';
  
  const updateDislikes = () => {
    console.log("HIIIIII")
    socket.emit('dislike_event', { eventID: currEvent.id, isLiked: false });
    //socket.emit('showBoardData');
  };
  
  setShowEventPage(false);
  setEventPage(
    <List key={clientId * i}>
      <div className="container" key={clientId + i}>
        <List.Item key={currEvent.id + n}>
          <Header key={currEvent.id + n1}>{currEvent.name}</Header>
          <img key={currEvent.id + n2} src={currEvent.images[0].url} alt="" />
          <div key={currEvent.id + n3} className="buttonHolder">
            <button type="button" className="search" onClick={Bookmarks}> Bookmark </button>
          </div>
          <p key={currEvent.id + n4}>{currEvent.dates.start.localDate}</p>
          <div className="like-dislike">
            <h3>
              <button>
              <FaThumbsUp />
              </button>
              likes
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <button
                label="dislikeButton"
                type="button"
                onClick={() => {
                  console.log(currEvent.id);
                  //socket.emit('dislikeEvent', { eventID: currEvent.id, isLiked: false });
                  updateDislikes();
                }}
              >
                <FaThumbsDown
              /></button>
              dislikes
            </h3>
          </div>
        </List.Item>
      </div>
    </List>,
    /* <Wrapper>
      <GoogleMapReact
        defaultZoom={10}
        defaultCenter={LOS_ANGELES_CENTER}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            text={place.name}
            lat={place.geometry.location.lat}
            lng={place.geometry.location.lng}
          />
        ))}
      </GoogleMapReact>
    </Wrapper>, */
  );
}
export default EventPage;
