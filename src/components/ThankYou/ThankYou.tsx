import React from "react";
import { styled } from "../../../stitches.config";
import { SocialLinks } from "../../ui/common/Social/SocialLinks";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby-plugin-react-i18next";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const ThankYou: React.FC = () => {
  const { t } = useTranslation();
  const [clientFullName, _] = useLocalStorage<string>("clientFullName", "");

  return (
    <Container>
      <ContentContainer>
        <Title>{t("contact.thankYou")}{clientFullName}</Title>
        <Text>{t("contact.thankYou1")}</Text>
        <Text>
          {t("contact.thankYou2")}
          <StyledLink to="/blog">{t("contact.thankYou3")}</StyledLink>
          {t("contact.thankYou4")}
        </Text>
        <Box>
          <SocialLinks />
        </Box>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("section", {
  padding: 20,
  background: "url(/images/bg-mobile.png) no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "bottom",
  width: "100%",
  height: "100%",
  "@xxs": {
    background: "url(/images/bg-tablet.png) no-repeat",
    backgroundSize: "cover",
  },
  "@xs": {
    padding: "30px 50px",
    backgroundPosition: "bottom",
  },
  "@sm": {
    background: "url(/images/bg-desktop.png) no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "75% 100%",
  },
  "@md": {
    backgroundPosition: "center",
  },
});

const ContentContainer = styled("div", {
  maxWidth: "1240px",
  margin: "50px auto 320px",
  "@xs": {
    margin: "50px auto 450px",
  },
  "@md": {
    margin: "220px auto 260px",
  },
});

const StyledLink = styled(Link, {
  fontWeight: 700,
  color: "$link",
});

const Box = styled("div", {
  margin: "0 auto",
  "@sm": { margin: "0" },
});

const Title = styled("h1", {
  fontWeight: 700,
  fontSize: 44,
  lineHeight: "50px",
  textTransform: "uppercase",
  textAlign: "center",
  color: "$white",
  margin: "40px auto 20px",
  maxWidth: 400,
  "@xs": {
    fontSize: 64,
    lineHeight: "64px",
    maxWidth: 500,
    margin: "140px 0 20px",
    textAlign: "start",
  },
});

const Text = styled("p", {
  fontWeight: 300,
  fontSize: 18,
  lineHeight: "24px",
  color: "$white",
  textAlign: "center",
  margin: "0 auto",
  maxWidth: 800,
  "@xs": {
    fontSize: 20,
    lineHeight: "30px",
    textAlign: "start",
    margin: "20px 0",
  },
  "@md": {
    maxWidth: 690,
    fontSize: 24,
    lineHeight: "40px",
  },
  "&:last-of-type": {
    margin: "0 0 50px",
    "@xs": {
      margin: "20px 0 50px",
    },
  },
});
