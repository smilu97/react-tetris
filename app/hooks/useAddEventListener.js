import { useEffect } from 'react';

function useAddEventListener(event, listener) {
  useEffect(() => {
    window.addEventListener(event, listener);
    return () => {
      window.removeEventListener(event, listener);
    };
  }, []);
}

export default useAddEventListener;
