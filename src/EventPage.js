/* eslint-disable */
import React from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Bookmarks from './Bookmarks';
export function EventPage (currEvent,setEventPage,setShowEventPage){
    //Todo
    console.log(currEvent);
    console.log()
    setShowEventPage(false);
    setEventPage(
        <List>
            return (
            <div className="container">
                <List.Item key={currEvent.id}>
                    <Header>{currEvent.name}</Header>
                    <img src ={currEvent.images[0].url} />
                    <p>{currEvent.dates.start.localDate}</p>
                </List.Item>
            </div>
            );
        </List>
    );
};

EventPage.propTypes = {
    /*
    TODO
    Fill out proptypes for your props.
    */
};

EventPage.defaultProps = {
  /*
  TODO
  Set default values for your props.
  */
};

export default EventPage;
