import React from "react";
import { styled } from "../../../stitches.config";
import { FileType } from "../../types/certificate";

type Props = {
  name: string;
  file: FileType;
};

export const CertificateCard: React.FC<Props> = ({ name, file }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <Button href={file.data.attributes.url} download>
        Скачать
      </Button>
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  border: "1px solid #20232844",
  borderRadius: "0 10px",
  boxSizing: "border-box",
  padding: "10px",
  "@xs": {
    width: "calc(100%/2 - 10px)",
  },
  "@md": {
    width: "calc(100%/4 - 15px)",
    gap: "30px",
  },
});

const Button = styled("a", {
  textDecoration: "none",
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
