import React, { useCallback, useRef, useState } from "react";

const useScroll = () => {
  const [isScroll, setIsScroll] = useState(false)
  let scrollRef = useRef<any>()
  const scrollTo = useCallback(() => {
    if (scrollRef?.current) {
      scrollRef.current?.scrollToPosition(0, 0, true)
    }
  }, [scrollRef])
  const setIsScrollHandler = useCallback((val: boolean) => {
    setIsScroll(val)
  }, [])
  return {
    scrollTo,
    scrollRef,
    isScroll,
    setIsScrollHandler
  }
};

export default useScroll;
