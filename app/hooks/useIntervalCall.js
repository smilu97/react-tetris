import { useEffect } from 'react';

function useIntervalCall(handler, time) {
  useEffect(() => {
    const interval = setInterval(handler, time);
    return () => {
      clearInterval(interval);
    };
  }, []);
}

export default useIntervalCall;
