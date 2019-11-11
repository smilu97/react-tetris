import { useState } from 'react';

function useForceUpdate() {
  const [, setUpdater] = useState(false);
  const forceUpdate = () => {
    setUpdater(u => !u);
  };
  return forceUpdate;
}

export default useForceUpdate;
