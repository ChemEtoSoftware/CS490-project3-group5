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

export const InitialData = ({initialData}) => {
    return (
        <List>
        {initialData.map(initialData => {
            return (
            <List.Item key={initialData.id}>
                <Header>{initialData.name}</Header>
                <img src ={initialData.images[0].url} />
                <p>{initialData.dates.start.localDate}</p>
            </List.Item>
            );
        })}
        </List>
    );
};
