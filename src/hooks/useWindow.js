import useIsClient from './useIsClient';

export default function useWindow() {
  return useIsClient() ? window : undefined;
}
