import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { useWidthToTop } from "../../hooks/useWidthToTop";
import { CSSTransition } from "react-transition-group";
import Arrow from "../../../static/icons/up-arrow.png";
import { keyframes } from "@stitches/react";

export const ScrollToTop = () => {
  const { width } = useWidthToTop();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (width >= 300) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [width]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <CSSTransition timeout={500} in={show} unmountOnExit classNames="alert">
        <Button onClick={() => scrollToTop()}></Button>
      </CSSTransition>
    </>
  );
};

const goToTop = keyframes({
  "20%": { transform: "translateY(0)" },
  "25%": { transform: "translateY(-10px)" },
  "30%": { transform: "translateY(0)" },
  "35%": { transform: "translateY(-10px)" },
  "40%": { transform: "translateY(0)" },
});

const Button = styled("button", {
  position: "fixed",
  bottom: 20,
  right: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  background: `url(${Arrow})`,
  backgroundSize: "cover",
  cursor: "pointer",
  width: 60,
  height: 60,
  color: "$white",
  transition: "all 300ms",
  zIndex: 1000,
  animation: `${goToTop} 3500ms linear infinite`,
  "@md": {
    bottom: 40,
    right: 40,
  },
});
