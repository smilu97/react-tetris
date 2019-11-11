import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { rowsNumOnBoard, colsNumOnBoard, boxSize } from '~/constants';

import Board from '~/components/Board';
import { createTetrisGame } from '~/tetris';

function Tetris(props) {
  const { rowsNum, colsNum, boxSize } = props;

  const [, setUpdater] = useState(false);
  const [tetris] = useState(
    createTetrisGame({
      rowsNum,
      colsNum,
    }),
  );

  const forceUpdate = () => {
    setUpdater(u => !u);
  };

  const {
    getPrinterBuffer,
    tick,
    moveDown,
    moveRight,
    moveLeft,
    rotateClockwise,
    rotateCounterClockwise,
    dropControl,
  } = tetris;

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
      forceUpdate();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handlers = {
      arrowleft: () => {
        moveLeft();
      },
      arrowright: () => {
        moveRight();
      },
      arrowdown: () => {
        moveDown();
      },
      arrowup: () => {
        rotateClockwise();
      },
      space: () => {
        dropControl();
      },
      z: () => {
        rotateCounterClockwise();
      },
    };
    const keydownHandler = ({ code }) => {
      const handler = handlers[code.toLowerCase()];
      if (handler !== undefined) {
        handler();
        forceUpdate();
      }
    };
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <Board
      rowsNum={rowsNum}
      colsNum={colsNum}
      boxSize={boxSize}
      tileShape={getPrinterBuffer()}
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
