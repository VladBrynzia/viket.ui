import { useEffect } from "react";

export const useNoScroll = (isOpen: boolean) => {
  useEffect(() => {
    isOpen && document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);
};
