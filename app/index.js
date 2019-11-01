import React from 'react';
import ReactDOM from 'react-dom';

function Root() {
  return (
    <div>
      <h1>TETRIS</h1>
    </div>
  );
}

const app = document.getElementById('app');
ReactDOM.render(<Root />, app);
