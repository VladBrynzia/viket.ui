import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import { styled } from "../../../stitches.config";

export const NotFound: React.FC = () => {
  return (
    <>
      <Nav></Nav>
      <Box>
        <Link to="/">Go to home page.</Link>
      </Box>
    </>
  );
};

const Nav = styled("div", {
  background: "$navBackgroundViolet",
  width: "100%",
  height: "147px",
  marginBottom: 40,
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 1280,
  height: 200,
  margin: "0 auto",
});
