import { useState } from 'react';
import { createTetrisGame } from '~/tetris';

import useAddEventListener from '~/hooks/useAddEventListener';
import useForceUpdate from '~/hooks/useForceUpdate';
import useIntervalCall from '~/hooks/useIntervalCall';

function useTetris(rowsNum, colsNum) {
  const [
    {
      getPrinterBuffer,
      tick,
      moveDown,
      moveRight,
      moveLeft,
      rotateClockwise,
      rotateCounterClockwise,
      dropControl,
    },
  ] = useState(
    createTetrisGame({
      rowsNum,
      colsNum,
    }),
  );

  const handlers = {
    arrowleft: moveLeft,
    arrowright: moveRight,
    arrowdown: moveDown,
    arrowup: rotateClockwise,
    space: dropControl,
    z: rotateCounterClockwise,
  };

  const forceUpdate = useForceUpdate();

  useIntervalCall(() => {
    tick();
    forceUpdate();
  }, 500);

  useAddEventListener('keydown', ({ code }) => {
    const handler = handlers[code.toLowerCase()];
    if (handler !== undefined) {
      handler();
      forceUpdate();
    }
  });

  return getPrinterBuffer;
}

export default useTetris;
