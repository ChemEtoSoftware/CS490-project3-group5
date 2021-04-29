/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import io from 'socket.io-client';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './App.css';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { List, Header } from 'semantic-ui-react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Comment } from './Comment';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export function EventPage(props) {
  /* Couldn't figure out how to pass variables as props in onclick,
  so instead just use them directly. Bookmarks function can either
  create or remove bookmark. This component displays single bookmark */
  const {
    currEvent,
    clientId,
    socket,
  } = props;
  console.log(currEvent);
  function Bookmarks() {
    alert('Bookmark has been added to database');
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
  // setShowEventPage(false);
  // setEventPage(
  //   <div>
  //     <List key={clientId * i}>
  //       <div className="container" key={clientId + i}>
  //         <List.Item key={currEvent.id + n}>
  //           <Header key={currEvent.id + n1}>{currEvent.name}</Header>
  //           <img key={currEvent.id + n2} src={currEvent.images[0].url} alt="" />
  //           <div key={currEvent.id + n3} className="buttonHolder">
  //             <button type="button" className="search" onClick={Bookmarks}> Bookmark </button>
  //           </div>
  //           <p key={currEvent.id + n4}>{currEvent.dates.start.localDate}</p>
  //         </List.Item>
  //       </div>
  //     </List>
  //     <Comment clientId={clientId} eventId={currEvent.id} socket={socket} />
  //   </div>,
  const lat = currEvent._embedded.venues[0].location.latitude;
  const long = currEvent._embedded.venues[0].location.longitude;
  const [likes, setLikes] = useState(0); // state to update likes
  const [dislikes, setDislikes] = useState(0); // state to update dislikes
  useEffect(() => {
    /*
    socket.on('event_list', (data) => {
      // console.log('Board value event received!');
      // setLikes(data.likes); // array of likes
      console.log(data);
      console.log(data.likes);
    });
    */
    socket.on('update_likes_dislikes', (data) => {
      setLikes(data.likes); // array of likes
      setDislikes(data.dislikes);
      console.log(data);
      console.log(data.likes);
      console.log(data.dislikes);
    });
    socket.on('show_likes_dislikes', (data) => {
      console.log('Inside show likes/dislikes');
      console.log(data); // {dislikes: "94", likes: "7"}
      setLikes(data.likes);
      setDislikes(data.dislikes);
    });
  }, []);
  const updateLikes = () => {
    console.log('Inside updateLikes');
    socket.emit('dislike_event', { eventID: currEvent.id, isLiked: true });
    setLikes(likes + 1);
  };
  const updateDislikes = () => {
    console.log('Inside UupdateDislikes');
    socket.emit('dislike_event', { eventID: currEvent.id, isLiked: false });
    setDislikes(dislikes + 1);
  };
  return (
    <div>
      <div>
        <List key={clientId * i}>
          <div className="container" key={clientId + i}>
            <List.Item key={currEvent.id + n}>
              <Header key={currEvent.id + n1}>{currEvent.name}</Header>
              <img key={currEvent.id + n2} src={currEvent.images[0].url} alt="" width="300" height="200" />
              <div key={currEvent.id + n3} className="buttonHolder">
                <button type="button" className="search" onClick={Bookmarks}> Bookmark </button>
              </div>
              <p key={currEvent.id + n4}>{currEvent.dates.start.localDate}</p>
              <div className="like-dislike">
                <h3>
                  <button
                    label="likeButton"
                    type="button"
                    onClick={() => {
                      console.log(currEvent.id);
                      // socket.emit('dislikeEvent', { eventID: currEvent.id, isLiked: false });
                      updateLikes();
                    }}
                  >
                    <FaThumbsUp />
                  </button>
                  {likes}
                  <span> </span>
                  likes
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <button
                    label="dislikeButton"
                    type="button"
                    onClick={() => {
                      console.log(currEvent.id);
                      // socket.emit('dislikeEvent', { eventID: currEvent.id, isLiked: false });
                      updateDislikes();
                    }}
                  >
                    <FaThumbsDown />
                  </button>
                  {dislikes}
                  <span> </span>
                  dislikes
                </h3>
              </div>
            </List.Item>
          </div>
        </List>
        <Comment clientId={clientId} eventId={currEvent.id} socket={socket} />
      </div>
      <div>
        <div className="mapid">
          <MapContainer center={[lat, long]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker key={`marker-${currEvent.id}`} position={[lat, long]}>
              <Popup>
                {currEvent.name}
                <br />
                {typeof currEvent._embedded.venues[0].address === 'undefined' ? null : currEvent._embedded.venues[0].address.line1}
                ,
                {typeof currEvent._embedded.venues[0].city === 'undefined' ? null : currEvent._embedded.venues[0].city.name}
                ,
                {typeof currEvent._embedded.venues[0].state === 'undefined' ? null : currEvent._embedded.venues[0].state.stateCode}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
EventPage.propTypes = {
  currEvent: PropTypes.objectOf(PropTypes.object),
  clientId: PropTypes.string,
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

EventPage.defaultProps = {
  currEvent: '',
  clientId: null,
  socket: null,
};
export default EventPage;
