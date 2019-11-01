import React from 'react';
import ReactDOM from 'react-dom';

import Board from '~/components/Board';

function Root() {
  return (
    <div>
      <Board />
    </div>
  );
}

const app = document.getElementById('app');
ReactDOM.render(<Root />, app);
