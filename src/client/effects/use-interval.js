import React, { useState, useEffect, useRef } from 'react'

const useInterval = (callback, delay, dependency, timerRef) => {
  const { previous, current } = dependency
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (
        // previous !== null &&
        // current !== null &&
        // JSON.stringify(previous) !== JSON.stringify(current)
        dependency !== null
      ) {
      console.log('setting up interval')
      timerRef.current = setInterval(tick, delay)
      console.log('timerId id', timerRef.current)
      return () => clearInterval(timerRef.current);
    }
  }, [dependency]);
}

export default useInterval
