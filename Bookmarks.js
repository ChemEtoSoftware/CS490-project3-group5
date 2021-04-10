import React from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function Bookmarks(props){
    const { user_id, e } = props;
    e.preventDefault
    window.fetch('/api/post', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id : user_id
      })
    })
      .then(response => response.json())
      .then(json => {
        const accessToken = json.access_token;
        //props.get_bookmarks(accessToken);
      })
      .catch(error => {
        //props.onLoginError();
      });
}

Bookmarks.propTypes = {
    user_id : PropTypes.string,
    e : PropTypes.objectOf(PropTypes.object)
};

Bookmarks.defaultProps = {
    user_id : null,
    e : null
};
export default Bookmarks;