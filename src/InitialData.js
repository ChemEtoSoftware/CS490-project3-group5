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
import React from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Bookmarks from './Bookmarks';
import EventPage from './EventPage';
export const InitialData = ({initialData}) => {
    //Todo
    //const {...} = initialData
    return (
        <List>
        {initialData.map(initialData => {
            return (
            <div className="container" onClick={() => EventPage(initialData)}>
                <List.Item key={initialData.id}>
                    <Header>{initialData.name}</Header>
                    <img src ={initialData.images[0].url} />
                    <p>{initialData.dates.start.localDate}</p>
                </List.Item>
            </div>
            );
        })}
        </List>
    );
};

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
