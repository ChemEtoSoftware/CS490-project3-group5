import React from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Bookmarks from './Bookmarks';
export function EventPage (props){
    //Todo
    const { initialData } = props;
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
