import { useEffect, useRef } from "react";

type Props = {
  onClickOutside: () => void;
  isOpen: boolean;
};

export const useClickOutside = ({ onClickOutside, isOpen }: Props) => {
  const ref = useRef<HTMLDivElement | null>();

  useEffect(() => {
    const handler = function (event: MouseEvent) {
      const clickTarget = event.target as HTMLElement;
      if (isOpen && ref.current && !ref.current.contains(clickTarget)) {
        onClickOutside();
      }
    };
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
    };
  }, [isOpen, onClickOutside]);
  return { ref };
};
