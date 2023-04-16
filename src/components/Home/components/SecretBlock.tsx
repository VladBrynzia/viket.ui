import React from "react";
import { styled } from "../../../../stitches.config";
import { LetsTalkButton } from "../../../ui/common/LetsTalkButton";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const SecretBlock: React.FC = () => {
  const [_, setEmail] = useLocalStorage<string>("userEmail", "");
  const { t } = useTranslation();

  return (
    <Container>
      <ContentContainer>
        <Title>
          {t("home.secret.first")}
          <img src="/icons/secret-coin.svg" alt="coin" />
          {t("home.secret.second")}
          <Author>{t("home.secret.author")}</Author>
        </Title>
        <Form>
          <Input
            placeholder={t("home.secret.input")}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <LetsTalkButton />
        </Form>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("section", {
  background: "url(/images/secret-bg.svg) no-repeat",
  backgroundSize: "cover",
  marginLeft: -2,
});

const ContentContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
  gap: 30,
  margin: "60px auto",
  padding: "60px 10px",
  "@md": {
    width: "1240px",
    margin: "100px auto",
    padding: "100px 0",
  },
});

const Author = styled("p", {
  position: "absolute",
  bottom: -70,
  right: 10,
  color: "$white",
  textTransform: "uppercase",
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "70px",
  textAlign: "center",
  "@xs": {
    fontSize: "22px",
  },
  "@md": {
    bottom: -100,
    right: 0,
    fontSize: "28px",
    lineHeight: "97px",
  },
});

const Title = styled("h1", {
  position: "relative",
  color: "$white",
  textTransform: "uppercase",
  fontWeight: "700",
  fontSize: "40px",
  lineHeight: "70px",
  textAlign: "center",
  "@xs": {
    fontSize: "50px",
  },
  "@md": {
    fontSize: "80px",
    lineHeight: "97px",
  },
});

const Form = styled("form", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: 30,
  "@md": {
    flexDirection: "row",
    gap: 0,
    background: "$inputLightViolet",
    borderRadius: "40px",
  },
});

const Input = styled("input", {
  background: "$inputLightViolet",
  border: "1px solid #F9EBFD",
  borderRadius: "30px",
  padding: "12px 50px",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "35px",
  width: "100%",
  "@md": {
    width: "500px",
  },
});
