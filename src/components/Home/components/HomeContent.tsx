import React from "react";
import { styled } from "../../../../stitches.config";
import { useScreenResolution } from "../../../hooks/useScreenResolution";
import { LetsTalkButton } from "../../../ui/common/LetsTalkButton";
import { SocialLinks } from "../../../ui/common/Social/SocialLinks";
import { useTranslation } from "gatsby-plugin-react-i18next";

export const HomeContent: React.FC = () => {
  const { resolution } = useScreenResolution();
  const { t } = useTranslation();

  return (
    <Container>
      <ContentContainer>
        <Title>{t("home.title")}</Title>
        <Text>{t("home.mainText")}</Text>
        <Box>
          <LetsTalkButton />
          <SocialContainer>{resolution === 'desktop' && <SocialLinks />}</SocialContainer>
        </Box>
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
  background: "url(/images/main-image.png) no-repeat",
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
  "@xxs": {
    background: "url(/images/main-image-xs.png) no-repeat",
    backgroundSize: "cover",
  },
  "@xs": {
    background: "url(/images/home-image-xs.png) no-repeat",
    backgroundSize: "cover",
  },
  "@md": {
    background: "url(/images/home-image.svg) no-repeat",
    backgroundSize: "cover",
    backgroundPosition: 'center',
    alignItems: "start",
  },
});

const ContentContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
  gap: 30,
  margin: "0 auto",
  padding: '20px 0 340px',
  '@xs': {
    padding: '100px 0 280px',
  },
  "@md": {
    padding: '205px 0',
    width: "1240px",
    alignItems: "start",
  },
});

const Title = styled("h1", {
  fontWeight: "700",
  fontSize: "44px",
  lineHeight: "50px",
  color: "$white",
  textAlign: "center",
  textTransform: 'uppercase',
  margin: "30px 0 0",
  "@xxs": {
    fontSize: "50px",
    lineHeight: "55px",
    margin: "70px 0 0",
  },
  "@md": {
    fontSize: "64px",
    lineHeight: "70px",
    margin: "0 0",
    width: "500px",
    textAlign: "start",
  },
  "@lg": {
    fontSize: "80px",
    lineHeight: "85px",
  },
});

const Text = styled("p", {
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "24px",
  color: "$white",
  textAlign: "center",
  margin: 0,
  "@xs": {
    width: "500px",
  },
  "@md": {
    textAlign: "start",
    fontSize: "24px",
    lineHeight: "40px",
  },
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  "@md": {
    gap: 50,
  },
});

const SocialContainer = styled("div", {});
