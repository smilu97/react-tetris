import React from 'react';
import PropTypes from 'prop-types';

import { rowsNumOnBoard, colsNumOnBoard, boxSize } from '~/constants';

import Board from '~/components/Board';
import useTetris from './useTetris';

function Tetris(props) {
  const { rowsNum, colsNum, boxSize } = props;
  const getBuffer = useTetris(rowsNum, colsNum);
  return (
    <Board
      rowsNum={rowsNum}
      colsNum={colsNum}
      boxSize={boxSize}
      tileShape={getBuffer()}
    />
  );
}

Tetris.propTypes = {
  rowsNum: PropTypes.number,
  colsNum: PropTypes.number,
  boxSize: PropTypes.number,
};

Tetris.defaultProps = {
  rowsNum: rowsNumOnBoard,
  colsNum: colsNumOnBoard,
  boxSize,
};

export default Tetris;
