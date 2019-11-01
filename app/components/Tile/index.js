import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container';

import { boxBorderColor } from '~/constants';

function Tile(props) {
  const { size, color, borderColor } = props;
  return <Container size={size} color={color} borderColor={borderColor} />;
}

Tile.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
};

Tile.defaultProps = {
  borderColor: boxBorderColor,
};

export default Tile;
