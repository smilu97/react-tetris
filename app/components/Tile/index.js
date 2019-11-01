import React from 'react';
import PropTypes from 'prop-types';

import Container from './Container';

function Tile(props) {
  const { size, color } = props;
  return <Container size={size} color={color} />;
}

Tile.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Tile.defaultProps = {
  size: 50,
  color: 'rgba(255, 0, 0, 0.3)',
};

export default Tile;
