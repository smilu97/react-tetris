import { useState, useCallback } from 'react';

function useForceUpdate() {
  const [, setUpdater] = useState(false);
  const forceUpdate = useCallback(() => {
    setUpdater(u => !u);
  }, []);
  return forceUpdate;
}

export default useForceUpdate;
