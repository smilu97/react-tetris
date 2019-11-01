import lodash from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container';

import Tile from '~/components/Tile';

import { rowsNumOnBoard, colsNumOnBoard, boxSize } from '~/constants';

function Board(props) {
  const { rowsNum, colsNum } = props;
  const itemsNum = rowsNum * colsNum;

  const boxes = lodash
    .range(0, itemsNum)
    .map(i => <Tile size={boxSize} key={i} />);

  const containerWidth = colsNum * boxSize;
  const containerHeight = rowsNum * boxSize;
  return (
    <Container width={containerWidth} height={containerHeight}>
      {boxes}
    </Container>
  );
}

Board.propTypes = {
  rowsNum: PropTypes.number,
  colsNum: PropTypes.number,
};

Board.defaultProps = {
  rowsNum: rowsNumOnBoard,
  colsNum: colsNumOnBoard,
};

export default Board;
