import React, { useEffect } from 'react';
import './Board.css';
import PropTypes from 'prop-types';

export function MakeBoard(props) {
  const {
    ifX, id, currentLetter, isXNext, setBoard, setIsXNext, board, socket,
  } = props;
  /* Use effects for the game. If the user reloads there page.
  It doesn't update to the original player's square,
  but instead updates the original player's square to be blank as well. */
  useEffect(() => {
    socket.on('tictactoe', (data) => {
      setBoard([...data.message]);
      setIsXNext(!data.nxt);
    });
  }, []);
  /* Changes the value of each square. currentLetter is
  telling the program if the user is X or O.
  It has nothing to do with the square's value.
  This function also tells the program if X is next. */
  function onClickButton(clickedId) {
    if (currentLetter !== 'X' && currentLetter !== 'O') {
      return null;
    }
    if (
      (isXNext && currentLetter === 'X')
      || (!isXNext && currentLetter === 'O')
    ) {
      setBoard((prevBoard) => {
        const temp = [...prevBoard];
        if (
          temp[parseInt(clickedId, 10)] !== 'X'
          && temp[parseInt(clickedId, 10)] !== 'O'
        ) {
          temp[parseInt(clickedId, 10)] = currentLetter;
          setIsXNext(!isXNext);
        }
        socket.emit('tictactoe', { message: temp, nxt: isXNext });
        return temp;
      });
    }
    return board;
  }

  return (
    <button type="button" className="box" data-testid={id} id={id} onClick={() => onClickButton(id)}>
      {ifX}
    </button>
  );
}
MakeBoard.propTypes = {
  ifX: PropTypes.string,
  id: PropTypes.number,
  currentLetter: PropTypes.string,
  isXNext: PropTypes.bool,
  setBoard: PropTypes.func,
  setIsXNext: PropTypes.func,
  board: PropTypes.objectOf(PropTypes.array),
  socket: PropTypes.objectOf(PropTypes.object),
};

MakeBoard.defaultProps = {
  ifX: '',
  id: null,
  currentLetter: '',
  isXNext: true,
  setBoard: null,
  setIsXNext: null,
  board: ['', '', '', '', '', '', '', '', ''],
  socket: null,
};
export default MakeBoard;
