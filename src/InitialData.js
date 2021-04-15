/*
import React from 'react';
import { List, Header } from 'semantic-ui-react';
export const Movies = ({ initialData }) => {
    return(
        <List>
        {initialData.map(initialData => {
            return (
            <List.Item key={initialData.title}>
            <Header>{initialData.title}</Header>
            </List.Item>
            );
        })}
        </List>
    );
};
*/
/* eslint-disable */
import React, {useState} from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Bookmarks from './Bookmarks';
import EventPage from './EventPage';
export function InitialData(props){
    const {initialData, showEventPage, setShowEventPage, eventPage, setEventPage} = props
    console.log(showEventPage);
    if (showEventPage){
        return (
            <List>
            {initialData.map(currEvent => {
                console.log(currEvent);
                return (
                <div className="container" onClick={() => EventPage(currEvent,setEventPage,setShowEventPage)}>
                    <List.Item key={currEvent.id}>
                        <Header>{currEvent.name}</Header>
                        <img src ={currEvent.images[0].url} />
                        <p>{currEvent.dates.start.localDate}</p>
                    </List.Item>
                </div>
                );
            })}
            </List>
        );
    }
    else{
        return (eventPage);
    }
}


InitialData.propTypes = {
    /*
    TODO
    Fill out proptypes for your props.
    */
};

InitialData.defaultProps = {
  /*
  TODO
  Set default values for your props.
  */
};

export default InitialData;
