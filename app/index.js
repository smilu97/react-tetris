import React from 'react';
import ReactDOM from 'react-dom';

import Tile from '~/components/Tile';

function Root() {
  return (
    <div>
      <Tile />
    </div>
  );
}

const app = document.getElementById('app');
ReactDOM.render(<Root />, app);
