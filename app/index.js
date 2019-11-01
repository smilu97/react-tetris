import React from 'react';
import ReactDOM from 'react-dom';

import Tetris from '~/components/Tetris';

function Root() {
  return (
    <div>
      <Tetris />
    </div>
  );
}

const app = document.getElementById('app');
ReactDOM.render(<Root />, app);
