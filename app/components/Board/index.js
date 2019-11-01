import lodash from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container';

import Tile from '~/components/Tile';

const mapTileStateToColor = ['gray', 'red', 'green', 'blue'];

function Board(props) {
  const { rowsNum, colsNum, boxSize, tileShape } = props;
  const itemsNum = rowsNum * colsNum;

  if (tileShape.length < itemsNum) {
    throw 'The length of tileShape must be same or bigger than rowsNum * colsNum';
  }

  function renderNthTile(index) {
    const key = tileShape[index];
    const color = mapTileStateToColor[key];
    if (color === undefined) {
      throw `Invalid item value of tileShape: ${key}`;
    }
    return <Tile key={index} color={color} size={boxSize} />;
  }

  const boxes = lodash.range(0, itemsNum).map(renderNthTile);

  const containerWidth = colsNum * boxSize;
  const containerHeight = rowsNum * boxSize;
  return (
    <Container width={containerWidth} height={containerHeight}>
      {boxes}
    </Container>
  );
}

Board.propTypes = {
  rowsNum: PropTypes.number.isRequired,
  colsNum: PropTypes.number.isRequired,
  boxSize: PropTypes.number.isRequired,
  tileShape: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Board;
