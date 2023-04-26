import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  certificate: {
    name: string;
    file: string;
  };
};

export const CertificateCard: React.FC<Props> = ({ certificate }) => {
  return (
    <Container>
      <Title>{certificate.name}</Title>
      <Button>Скачать</Button>
    </Container>
  );
};

const Container = styled("section", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  border: "1px solid #20232844",
  borderRadius: "0 10px",
  boxSizing: "border-box",
  padding: "10px",
  '@xs': {
    width: "calc(100%/2 - 10px)",
  },
  "@md": {
    width: "calc(100%/4 - 15px)",
    gap: "30px",
  },
});

const Button = styled("button", {
  background: "#FFA500",
  border: "none",
  borderRadius: "0 5px",
  padding: "10px 40px",
  maxWidth: 130,
  margin: "0 auto",
  fontWeight: 700,
  fontSize: 12,
  lineHeight: "14px",
  color: "#FBFBFB",
  cursor: "pointer",
});

const Title = styled("h2", {
  textAlign: "center",
  fontWeight: 400,
  fontSize: 20,
  lineHeight: "23px",
  color: "#171717",
  margin: "0",
});

const Subtitle = styled("h3", {
  margin: "0",
  fontWeight: 600,
  fontSize: 14,
  lineHeight: "18px",
  color: "#171717",
  "@md": {
    fontSize: 22,
    lineHeight: "25px",
  },
});

const Image = styled("img", {
  width: 28,
  height: 28,
  "@md": {
    width: 35,
    height: 35,
  },
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,
});

const Text = styled("a", {
  textDecoration: "none",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "15px",
  color: "#171717",
  margin: "0",
  "@md": {
    margin: "0",
    fontSize: 20,
    lineHeight: "23px",
  },
});
