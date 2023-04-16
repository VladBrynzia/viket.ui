import { useState, useEffect } from "react";

const getSize = () => {
  return window.screen.width;
};

type Resolution = "mobile" | "desktop" | null;

export const useScreenResolution = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [resolution, setResolution] = useState<Resolution>(null);
  const breakpoints = { mobile: 0, desktop: 1279 };

  const handelResize = () => {
    const size = getSize();
    setScreenWidth(size);
    getResolution(size);
  };

  const getResolution = (screenWidth: number) => {
    if (screenWidth > breakpoints.desktop) {
      return setResolution("desktop");
    } else {
      return setResolution("mobile");
    }
  };

  useEffect(() => {
    handelResize();
    window.addEventListener("resize", handelResize);
    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, []);

  return { width: screenWidth, resolution: resolution };
};
