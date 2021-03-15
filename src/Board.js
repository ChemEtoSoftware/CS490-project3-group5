import React from 'react';
import './Board.css';
import PropTypes from 'prop-types';

export function MakeBoard(props) {
  const { ifX, id, click } = props;
  return (
    <button type="button" className="box" data-testid={id} id={id} onClick={() => click(id)}>
      {ifX}
    </button>
  );
}
MakeBoard.propTypes = {
  ifX: PropTypes.string,
  id: PropTypes.number,
  click: PropTypes.func,
};

MakeBoard.defaultProps = {
  ifX: '',
  id: null,
  click: null,
};
export default MakeBoard;
