import lodash from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { rowsNumOnBoard, colsNumOnBoard, boxSize } from '~/constants';

import Board from '~/components/Board';

function Tetris(props) {
  const { rowsNum, colsNum, boxSize } = props;
  const itemsNum = rowsNum * colsNum;
  const [tileShape] = useState(lodash.range(0, itemsNum).fill(0));
  return (
    <Board
      rowsNum={rowsNum}
      colsNum={colsNum}
      boxSize={boxSize}
      tileShape={tileShape}
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
