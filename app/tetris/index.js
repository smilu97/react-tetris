import lodash from 'lodash';

export const TileStates = {
  blank: 0,
  filled: 1,
};

export const Tetrominos = {
  I: {
    shapes: [
      [[-1, 0], [0, 0], [1, 0], [2, 0]],
      [[0, -1], [0, 0], [0, 1], [0, 2]],
    ],
  },
  O: {
    shapes: [[[0, 0], [0, -1], [-1, -1], [-1, 0]]],
  },
  Z: {
    shapes: [
      [[0, 0], [0, -1], [1, 0], [1, 1]],
      [[0, 0], [1, 0], [0, 1], [-1, 1]],
    ],
  },
  S: {
    shapes: [
      [[0, 0], [0, 1], [1, 0], [1, -1]],
      [[-1, -1], [0, -1], [0, 0], [1, 0]],
    ],
  },
  J: {
    shapes: [
      [[-1, 0], [0, 0], [1, 0], [1, -1]],
      [[0, -1], [0, 0], [0, 1], [1, 1]],
      [[-1, 0], [-1, 1], [0, 0], [1, 0]],
      [[-1, -1], [0, -1], [0, 0], [0, 1]],
    ],
  },
  L: {
    shapes: [
      [[-1, 0], [0, 0], [1, 0], [1, 1]],
      [[0, -1], [0, 0], [0, 1], [-1, 1]],
      [[-1, -1], [-1, 0], [0, 0], [1, 0]],
      [[1, -1], [0, -1], [0, 0], [0, 1]],
    ],
  },
  T: {
    shapes: [
      [[0, -1], [-1, 0], [0, 0], [0, 1]],
      [[0, -1], [0, 0], [-1, 0], [1, 0]],
      [[0, 0], [0, -1], [0, 1], [1, 0]],
      [[0, 0], [-1, 0], [1, 0], [0, 1]],
    ],
  },
};

export const tetrominoNames = Object.keys(Tetrominos);

export function notBlankTile(value) {
  return value !== TileStates.blank;
}

export function isBlankTile(value) {
  return value === TileStates.blank;
}

export function selectRandomFromList(lst) {
  const { floor, random } = Math;
  const index = floor(random() * lst.length);
  return lst[index];
}

export function selectRandomTetromino() {
  const targetName = selectRandomFromList(tetrominoNames);
  const tetromino = Tetrominos[targetName];
  return tetromino;
}

export function createTetrisGame(option) {
  const { rowsNum, colsNum } = option;

  const itemNum = rowsNum * colsNum;
  const state = {
    tiles: Array(itemNum).fill(TileStates.blank),
    control: {
      tetromino: null,
      position: null,
      rotationIndex: 0,
    },
  };

  function getShape() {
    const { control } = state;
    const {
      tetromino: { shapes },
      rotationIndex,
    } = control;
    const shape = shapes[rotationIndex];

    if (shape === undefined) {
      console.log('state:', state);
    }
    return shape;
  }

  function getControlPositions() {
    const { position } = state.control;
    const shape = getShape();
    const controlPositions = shape.map(offset => [
      offset[0] + position[0],
      offset[1] + position[1],
    ]);
    return controlPositions;
  }

  function positionToIndex(pos) {
    const [x, y] = pos;
    return x * colsNum + y;
  }

  function checkPositionRange(pos) {
    const [x, y] = pos;
    return x >= 0 && x < rowsNum && y >= 0 && y < colsNum;
  }

  function solidifyControl() {
    console.log('solidify');
    const { tiles } = state;
    const controlPositions = getControlPositions();
    const indices = controlPositions.map(positionToIndex);
    indices.forEach(index => {
      tiles[index] = TileStates.filled;
    });
    deleteFilledRows();
  }

  function getPrinterBufferAndCollision() {
    const { tiles } = state;

    const buffer = [...tiles];

    const controlPositions = getControlPositions();
    const indices = controlPositions.map(positionToIndex);
    const tilesOnControl = indices.map(index => buffer[index]);
    const ok =
      tilesOnControl.every(isBlankTile) &&
      controlPositions.every(checkPositionRange);
    const isCollision = !ok;

    indices.forEach(index => {
      buffer[index] = TileStates.filled;
    });

    return [buffer, isCollision];
  }
  function getPrinterBuffer() {
    return getPrinterBufferAndCollision()[0];
  }

  function checkControlCollision() {
    const [, isCollision] = getPrinterBufferAndCollision();
    return isCollision;
  }

  function move(x = 0, y = 0) {
    const {
      control: { position },
    } = state;
    position[0] += x;
    position[1] += y;
    const isCollision = checkControlCollision();
    if (isCollision) {
      position[0] -= x;
      position[1] -= y;
    }
    return !isCollision;
  }

  function rotate(offset = 1) {
    const { control } = state;
    const {
      tetromino: { shapes },
    } = control;
    const originalRotationIndex = control.rotationIndex;
    let nextRotationIndex = (originalRotationIndex + offset) % shapes.length;
    if (nextRotationIndex < 0) nextRotationIndex += shapes.length;
    control.rotationIndex = nextRotationIndex;
    if (control.rotationIndex < 0) control.rotationIndex %= shapes.length;
    const isCollision = checkControlCollision();
    if (isCollision) {
      control.rotationIndex = originalRotationIndex;
    }
    return !isCollision;
  }

  function moveDown() {
    return move(1, 0);
  }
  function moveRight() {
    return move(0, 1);
  }
  function moveLeft() {
    return move(0, -1);
  }
  function rotateClockwise() {
    return rotate(-1);
  }
  function rotateCounterClockwise() {
    return rotate(1);
  }

  function tick() {
    if (moveDown() === false) {
      solidifyControl();
      createControl();
    }
  }

  function dropControl() {
    const {
      control: { position },
    } = state;
    while (!checkControlCollision()) {
      position[0] += 1;
    }
    position[0] -= 1;
    solidifyControl();
    createControl();
  }

  function createControl() {
    const { control } = state;

    control.tetromino = selectRandomTetromino();

    const colsMid = Math.floor(colsNum / 2);
    control.position = [2, colsMid];
    control.rotationIndex = 0;
  }

  function deleteRowFromTiles(tiles, rowIndex) {
    const targetStart = rowIndex * colsNum;
    const targetEnd = (rowIndex + 1) * colsNum;

    const above = tiles.slice(0, targetStart);
    const below = tiles.slice(targetEnd, state.length);
    const newLine = Array(colsNum).fill(TileStates.blank);

    const nextTiles = newLine.concat(above, below);

    return nextTiles;
  }

  function deleteFilledRows() {
    let tiles = state.tiles;
    lodash.range(0, rowsNum).forEach(rowIndex => {
      const rowStart = rowIndex * colsNum;
      const rowEnd = (rowIndex + 1) * colsNum;

      if (tiles.slice(rowStart, rowEnd).every(notBlankTile)) {
        tiles = deleteRowFromTiles(tiles, rowIndex);
      }
    });
    state.tiles = tiles;
  }

  createControl();

  return {
    getPrinterBuffer,
    tick,
    moveDown,
    moveRight,
    moveLeft,
    rotateClockwise,
    rotateCounterClockwise,
    dropControl,
  };
}
