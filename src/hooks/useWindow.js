import { useState, useEffect } from 'react';

export default function useWindow() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient ? window : undefined;
}
