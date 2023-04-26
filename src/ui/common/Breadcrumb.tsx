import React from "react";
import { styled } from "../../../stitches.config";
import { Link } from "gatsby-plugin-react-i18next";

type Props = {
  way: { link: string; text: string }[];
};

export const Breadcrumb: React.FC<Props> = ({ way }) => {
  return (
    <Container>
      <Link to="/">
        <Image src="/icons/home.svg" alt="home" />
      </Link>
      <ImageArrow src="/icons/bread-arrow.svg" alt="bread-arrow" />
      <Box>
        {way.map((el) => (
          <>
            <StyledLink to={el.link}>{el.text}</StyledLink>
            <Separator>/</Separator>
          </>
        ))}
      </Box>
    </Container>
  );
};

const Container = styled("div", {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "70px 20px 10px",
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const Box = styled("div", {
  display: "flex",
  gap: 8,
});

const Image = styled("img", {
  width: 18,
  height: 18,
});

const ImageArrow = styled("img", {
  width: 6,
  height: 10,
});

const Separator = styled("div", {
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "14px",
  color: "#454545",
  "&:last-of-type": {
    display: "none",
  },
});

const StyledLink = styled(Link, {
  textDecoration: "underline",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "14px",
  color: "#454545",
});
