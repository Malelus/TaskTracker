import { useEffect, useState } from 'react';

import useEventListener from './useEventListener';

// Listen for media query changes
export const useMediaQuery = (mediaQuery: string) => {
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [mediaQueryList, setMediaQueryList] = useState<EventTarget | null>(null);

  // Checking if the media query returns true
  useEffect(() => {
    const list = window.matchMedia(mediaQuery);

    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  // Event listener for value change in media query
  useEventListener<MediaQueryListEvent>({
    element: mediaQueryList!,
    eventType: 'change',
    callback: (event) => setIsMatch(event.matches),
  });

  return isMatch;
};

export default useMediaQuery;
