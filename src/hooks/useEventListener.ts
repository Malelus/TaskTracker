import { useEffect, useRef } from 'react';

type TuseEventListener<T> = {
  element?: EventTarget;
  eventType: string;
  callback: (event: T) => void;
};

// Perform a callback function on an event with a custom event listener hook
const useEventListener = <T>({ element = window, eventType, callback }: TuseEventListener<T>) => {
  const callbackRef = useRef(callback);

  // Save the last callback function
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Create an event listener and execute a callback function
  useEffect(() => {
    if (element == null) return;

    const handler = (event: any) => callbackRef.current(event);

    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};

export default useEventListener;
