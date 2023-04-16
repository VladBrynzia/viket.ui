import React from "react";
import { styled } from "../../../stitches.config";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ContentContainer>
        <Box>
          <a href="tel:+421944260246 ">
            <ContentBox>
              <Image src="/icons/phone.svg" alt="phone" />
              <Phone>+421 944 260 246 </Phone>
            </ContentBox>
          </a>
          <a
            href="https://www.google.com/maps/place/Monopol+space/@48.719391,21.25327,5z/data=!4m5!3m4!1s0x0:0xd092b02769f54c93!8m2!3d48.7193912!4d21.2532697?hl=ru-RU"
            target="_blank"
          >
            <ContentBox>
              <Image src="/icons/address.svg" alt="address" />
              <Text>{t("footer.info.address")}</Text>
            </ContentBox>
          </a>
          <a href="mailto:ahoy@vander.consulting">
            <ContentBox>
              <Image src="/icons/mail.svg" alt="mail" />
              <Text>ahoy@vander.consulting</Text>
            </ContentBox>
          </a>
        </Box>
        <AboutBox>
          <InfoBox>
            <Title>{t("footer.info.about")}</Title>
            <Text>{t("footer.info.aboutInfo")}</Text>
          </InfoBox>
          <InfoBox>
            <Title>{t("footer.info.company")}</Title>
            <StyledGatsbyLink to="/">
              {t("footer.info.aboutCompany")}
            </StyledGatsbyLink>
            <StyledGatsbyLink to="/">
              {t("footer.info.privacy")}
            </StyledGatsbyLink>
            <StyledLink
              href="https://rebrand.ly/vander-consulting/feedback"
              target="_blank"
            >
              {t("footer.info.feedback")}
            </StyledLink>
          </InfoBox>
          <InfoBox>
            <Title>{t("footer.info.services")}</Title>
            <StyledLink
              href="https://rebrand.ly/launch-control"
              target="_blank"
            >
              {t("footer.info.personal")}
            </StyledLink>
            <StyledLink href="https://rebrand.ly/mansulting" target="_blank">
              {t("footer.info.corporate")}
            </StyledLink>
            <StyledLink
              href="https://rebrand.ly/the-force-advisory"
              target="_blank"
            >
              {t("footer.info.advisory")}
            </StyledLink>
          </InfoBox>
        </AboutBox>
        <CopyrightBox>
          <CopyrightText>{t("footer.info.copyright")}</CopyrightText>
        </CopyrightBox>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("div", {
  padding: "30px 15px",
  margin: "20px 0 0",
  "@sm": {
    padding: "30px 15px",
  },
  "@md": {
    padding: "35px 25px",
    margin: "60px 0 0",
  },
  "@lg": {
    padding: "40px",
  },
});

const ContentContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 30,
  width: "90%",
  margin: "0 auto",
  "&>div:not(:last-child)": {
    borderBottom: "1px solid #E1DFDF",
  },
  "@lg": {
    width: "1240px",
    gap: 50,
  },
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: 40,
  flexDirection: "column",
  gap: 20,
  "@xxs": {
    alignItems: "center",
  },
  "@sm": {
    flexDirection: "row",
    paddingBottom: 60,
  },
});

const AboutBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  paddingBottom: 20,
  gap: 20,
  "@sm": {
    flexDirection: "row",
    paddingBottom: 30,
    alignItems: "flex-start",
  },
  "@lg": {
    gap: 50,
    justifyContent: "flex-start",
  },
});

const InfoBox = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  "@xs": {
    maxWidth: "500px",
  },
  "@sm": {
    marginRight: "60px",
    alignItems: "start",
    maxWidth: "300px",
  },
  "@md": {
    maxWidth: "400px",
    marginRight: "70px",
  },
  "@lg": {
    maxWidth: "450px",
    marginRight: "100px",
  },
});

const CopyrightBox = styled("div", {
  display: "flex",
  justifyContent: "center",
});

const ContentBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const CopyrightText = styled("p", {
  color: "#000",
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "38px",
  textAlign: "center",
});

const Image = styled("img", {
  height: "35px",
  "@md": {
    height: "40px",
  },
});

const Title = styled("h1", {
  color: "#000",
  fontWeight: "400",
  fontSize: "24px",
  lineHeight: "30px",
  margin: "0 0 8px",
});

const Text = styled("p", {
  color: "#000",
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  textAlign: "justify",
  "@md": {
    fontSize: "18px",
    lineHeight: "22px",
  },
});

const StyledGatsbyLink = styled(Link, {
  color: "#000",
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "20px",
  margin: "0 0 8px",
  "@md": {
    width: 240,
    fontSize: "18px",
    lineHeight: "22px",
  },
});

const StyledLink = styled("a", {
  color: "#000",
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "20px",
  margin: "0 0 8px",
  "@md": {
    width: 240,
    fontSize: "18px",
    lineHeight: "22px",
  },
});

const Phone = styled("p", {
  color: "#000",
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "22px",
  margin: "0 0 8px",
  "@md": {
    fontSize: "24px",
    lineHeight: "30px",
  },
});
