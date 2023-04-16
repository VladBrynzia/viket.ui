import { Link } from "gatsby-plugin-react-i18next";
import React, { useReducer } from "react";
import { styled } from "../../../stitches.config";
import { MobileMenu } from "./MobileMenu";

export const MobileNavigation: React.FC = () => {
  const [isOpen, toggle] = useReducer((value) => !value, false);

  return (
    <Container>
      <SpanBox onClick={toggle}>
        <Span></Span>
        <Span></Span>
        <Span></Span>
      </SpanBox>
      <Link to="/">
        <Image src="/images/logo.svg" alt="logo" />
      </Link>
      <MobileMenu isOpen={isOpen} toggle={toggle} />
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  background: "$navBackgroundViolet",
  "@xs": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    background: "transparent",
    padding: "20px 70px",
  },
});

const Image = styled("img", {
  width: "210px",
});

const SpanBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  cursor: "pointer",
  height: 'max-content',
  span: {
    "&:first-child": {
      width: "40px",
    },
    "&:not(:first-child)": {
      width: "30px",
    },
    "&:last-child": {
      width: "20px",
    },
  },
  "&:hover": {
    span: {
      transition: "all 300ms ease",
      "&:not(:first-child)": {
        width: "40px",
      },
      "&:last-child": {
        width: "40px",
      },
    },
  },
});

const Span = styled("span", {
  display: "block",
  width: "100%",
  height: "4px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  marginBottom: "5px",
  float: "right",
  transition: "all 300ms ease",
  "&:last-child": {
    marginBottom: "0",
  },
});
