import React from 'react';
import PropTypes from 'prop-types';
import './Comments.css';

export function ListItem(props) {
  const { name } = props;
  return (
    <li className="listItem">
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
