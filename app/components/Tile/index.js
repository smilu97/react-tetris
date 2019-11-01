import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container';

import { boxSize, boxBGColor, boxBorderColor } from '~/constants';

function Tile(props) {
  const { size, color, borderColor } = props;
  return <Container size={size} color={color} borderColor={borderColor} />;
}

Tile.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  borderColor: PropTypes.string,
};

Tile.defaultProps = {
  size: boxSize,
  color: boxBGColor,
  borderColor: boxBorderColor,
};

export default Tile;
