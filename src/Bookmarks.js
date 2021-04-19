import PropTypes from 'prop-types';

export function Bookmarks(props) {
  const { eventID } = props;
}
Bookmarks.propTypes = {
  eventID: PropTypes.string,
  e: PropTypes.objectOf(PropTypes.object),
};

Bookmarks.defaultProps = {
  eventID: null,
  e: null,
};
export default Bookmarks;
