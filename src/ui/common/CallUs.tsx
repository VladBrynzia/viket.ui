import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { useWidthToTop } from "../../hooks/useWidthToTop";
import { CSSTransition } from "react-transition-group";
import Phone from "../../../static/icons/phone.png";
import { keyframes } from "@stitches/react";

export const CallUs = () => {
  const { width } = useWidthToTop();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (width >= 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [width]);

  return (
    <>
      <CSSTransition timeout={500} in={show} unmountOnExit classNames="alert">
        <Box href="tel:+380674898218">
          <ButtonBox>
            <Button />
          </ButtonBox>
        </Box>
      </CSSTransition>
    </>
  );
};

const Box = styled("a", {
  background: "rgba(255, 167, 6, 0.1)",
  borderRadius: "100%",
  width: 82,
  height: 82,
  position: "fixed",
  bottom: 20,
  right: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ButtonBox = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(0.743528px)",
  zIndex: 1000,
  background: "#FFA500",
  borderRadius: "100%",
  width: 47,
  height: 47,
  "@md": {
    width: 60,
    height: 60,
  },
});

const Button = styled("button", {
  border: "none",
  background: `url(${Phone})`,
  backgroundSize: "cover",
  cursor: "pointer",
  width: 22,
  height: 22,
  color: "$white",
  transition: "all 300ms",

  "@md": {
    bottom: 30,
    right: 30,
  },
});
