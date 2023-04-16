import { useState, useEffect } from "react";

const getWidth = () => {
  return window.scrollY;
};

export const useWidthToTop = () => {
  const [widthToTop, setWidthToTop] = useState<number>(0);

  const handelResize = () => {
    const size = getWidth();
    setWidthToTop(size);
  };

  useEffect(() => {
    handelResize();
    window.addEventListener("scroll", handelResize);
    return () => {
      window.removeEventListener("scroll", handelResize);
    };
  }, []);

  return { width: widthToTop };
};
