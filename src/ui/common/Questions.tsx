import React from "react";
import { styled } from "../../../stitches.config";
import { LetsTalkButton } from "./LetsTalkButton";
import { useTranslation } from "gatsby-plugin-react-i18next";

export const Questions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ContentContainer>
        <Title>{t("home.question")}</Title>
        <Text>{t("home.request")}</Text>
        <LetsTalkButton />
      </ContentContainer>
    </Container>
  );
};

const Container = styled("section", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 30,
  background: "url(/images/question-bg.svg) no-repeat",
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
  "@xxs": {
    background: "url(/images/secret-bg.svg) no-repeat",
    backgroundSize: "cover",
    height: "60vh",
  },
  "@md": {
    height: "80vh",
  },
  "@lg": {
    background: "url(/images/question-bg-desktop.svg) no-repeat",
    backgroundSize: "cover",
    height: "700px",
  },
});

const ContentContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "start",
  gap: 30,
  margin: "0 auto",
  "@lg": {
    width: "fix-content",
    transform: "translateX(400px)",
  },
});

const Title = styled("h1", {
  fontWeight: "700",
  fontSize: "42px",
  lineHeight: "50px",
  textTransform: "uppercase",
  color: "$white",
  textAlign: "start",
  margin: "30px 0 0",
  "@xxs": {
    fontSize: "50px",
    lineHeight: "55px",
  },
  "@md": {
    fontSize: "64px",
    lineHeight: "70px",
    width: "650px",
  },
  "@lg": {
    fontSize: "80px",
    lineHeight: "85px",
    margin: "130px 0 0",
  },
});

const Text = styled("p", {
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "24px",
  color: "$white",
  textAlign: "start",
  margin: 0,
  "@xs": {
    width: "460px",
  },
  "@md": {
    textAlign: "start",
    fontSize: "24px",
    lineHeight: "40px",
  },
});
