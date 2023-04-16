import React from "react";
import { styled } from "../../../stitches.config";
import { ChoseLanguage } from "../../ui/common/Language/ChoseLanguage";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby-plugin-react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ContentContainer>
        <Link to="/">
          <Image src="/images/logo.svg" alt="logo" />
        </Link>
        <List>
          <StyledLink to="/">{t("header.nav.main")}</StyledLink>
          <StyledLink to="/products">{t("header.nav.products")}</StyledLink>
          <StyledLink to="/solutions">{t("header.nav.solutions")}</StyledLink>
          <StyledLink to="/technical">{t("header.nav.technical")}</StyledLink>
          <StyledLink to="/contact-us">{t("header.nav.contactUs")}</StyledLink>
        </List>
        <InfoBox>
          <ExternalReference
            href="https://goo.gl/maps/utervsCrHdo6J4L36"
            target="_blank"
          >
            <Address>{t("header.nav.address")}</Address>
          </ExternalReference>
          <ExternalReference href="tel:+380674850947">
            <Phone>{t("header.nav.phone")}</Phone>
          </ExternalReference>
        </InfoBox>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("header", {
  padding: "10px",
  transition: "all 0ms ease",
  background: "transparent",
  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.05)",
});

const ContentContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 30,
  width: "1280px",
  margin: "0 auto",
});

const ExternalReference = styled("a", {
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    '&>p': {
      color: '#FD7E08'
    }
  },
});

const InfoBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 5,
});

const Address = styled("p", {
  transition: "all 300ms ease",
  margin: 0,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "16px",
});

const Phone = styled("p", {
  transition: "all 300ms ease",
  margin: 0,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "16px",
});

const Image = styled("img", {
  width: "100px",
});

const List = styled("ul", {
  display: "flex",
  alignItems: "center",
  gap: 15,
  padding: 10,
});

const StyledLink = styled(Link, {
  color: "#000",
  textDecoration: "none",
  transition: "all 300ms ease",
  position: "relative",
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "19px",
  padding: "10px 5px",
  "&:hover": {
    color: "#FD7E08",
  },
});
