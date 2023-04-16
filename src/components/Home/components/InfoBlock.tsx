import React from "react";
import { styled } from "../../../../stitches.config";
import { useTranslation } from "gatsby-plugin-react-i18next";

export const InfoBlock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container id="about-us">
      <Text dangerouslySetInnerHTML={{ __html: t("home.info.first") }}></Text>
      <Text dangerouslySetInnerHTML={{ __html: t("home.info.second") }}></Text>
    </Container>
  );
};

const Container = styled("section", {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
  gap: 30,
  margin: "60px auto",
  padding: "20px",
  "@md": {
    width: "1240px",
    alignItems: "start",
    margin: "90px auto",
  },
});

const Text = styled("p", {
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "justify",
  margin: 0,
  "@md": {
    fontSize: "18px",
    lineHeight: "32px",
  },
});
