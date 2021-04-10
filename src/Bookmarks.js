import PropTypes from 'prop-types';

export function Bookmarks(props) {
  const { userID, e } = props;
  e.preventDefault();
  window.fetch('/api/post', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userID,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      const accessToken = json.access_token;
      props.get_bookmarks(accessToken);
    })
    .catch((error) => {
      props.BookmarkError(error);
    });
}

Bookmarks.propTypes = {
  userID: PropTypes.string,
  e: PropTypes.objectOf(PropTypes.object),
};

Bookmarks.defaultProps = {
  userID: null,
  e: null,
};
export default Bookmarks;
