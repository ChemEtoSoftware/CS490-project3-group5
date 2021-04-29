import React from 'react';
import PropTypes from 'prop-types';

export function ListItem(props) {
  const { name } = props;
  return (
    <li>
      {name}
    </li>
  );
}
export default ListItem;
ListItem.propTypes = {
  name: PropTypes.string,
};
ListItem.defaultProps = {
  name: null,
};
