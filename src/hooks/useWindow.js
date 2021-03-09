import { useState, useEffect } from 'react';

export default function useWindow() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient
    ? {
      window,
      pathname: window.location.pathname,
      updatePath: (path) => window.history.pushState({}, undefined, path),
      currentPath: window.location.href,
      hash: window.location.hash,
    }
    : {};
}
