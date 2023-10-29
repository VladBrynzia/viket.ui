import React, { useReducer, useState } from "react";
import { styled } from "../../../stitches.config";
import { ChoseLanguage } from "../../ui/common/Language/ChoseLanguage";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby-plugin-react-i18next";
import { MobileMenu } from "./MobileMenu";
import headerShop from "../../../static/icons/header-shop.png";
import { useShopContext } from "../../context/ShopPopupContext";

export const menuItems = [
  {
    link: "/",
    title: "header.nav.main",
  },
  {
    link: "/products",
    title: "header.nav.products",
  },
  {
    link: "/solutions",
    title: "header.nav.solutions",
  },
  {
    link: "/technical",
    title: "header.nav.technical",
  },
  {
    link: "/contact-us",
    title: "header.nav.contactUs",
  },
];

export const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, toggle] = useReducer((value) => !value, false);
  const { toggleShop } = useShopContext();

  return (
    <Container>
      <ContentContainer>
        <Link to="/">
          <Image src="/icons/logo.svg" alt="logo" />
        </Link>
        <List>
          {menuItems.map((el, i) => (
            <StyledLink key={i} to={el.link}>
              {t(el.title)}
            </StyledLink>
          ))}
        </List>
        <InfoBox>
          <ExternalReference
            href="https://goo.gl/maps/utervsCrHdo6J4L36"
            target="_blank"
          >
            <Address>{t("header.nav.address")}</Address>
          </ExternalReference>
          <ExternalReference href="tel:+380674898218">
            <Phone>{t("header.nav.phone2")}</Phone>
          </ExternalReference>
          <ExternalReference href="tel:+380674850947">
            <Phone>{t("header.nav.phone")}</Phone>
          </ExternalReference>
        </InfoBox>
        <Flex>
          <ShopImage onClick={toggleShop} src={headerShop} alt="header-shop" />
          <MenuBox>
            <MenuImage src="/icons/menu.svg" alt="menu" onClick={toggle} />
          </MenuBox>
        </Flex>
      </ContentContainer>
      <MobileMenu isOpen={isMenuOpen} toggle={toggle} />
    </Container>
  );
};

const Flex = styled("div", {
  display: "flex",
  gap: 12,
  alignItems: "center",
});

const Container = styled("header", {
  padding: "10px 20px",
  transition: "all 0ms ease",
  background: "#fff",
  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.05)",
  position: "sticky",
  top: 0,
  zIndex: 99,
});

const ShopImage = styled("img", {
  width: 25,
  height: 25,
  cursor: "pointer",
  marginBottom: 8,
  "@md": {
    width: 30,
    height: 30,
  },
});

const ContentContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 30,
  margin: "0 auto",
  "@md": {
    maxWidth: "1280px",
  },
});

const MenuBox = styled("div", {
  "@md": {
    display: "none",
  },
});

const MenuImage = styled("img", {
  width: "22px",
  cursor: "pointer",
});

const ExternalReference = styled("a", {
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    "&>p": {
      color: "#FD7E08",
    },
  },
});

const InfoBox = styled("div", {
  display: "none",
  "@md": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
  },
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
  display: "none",
  "@md": {
    display: "flex",
    alignItems: "center",
    gap: 15,
    padding: 10,
  },
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
    "&:after": {
      content: "",
      position: "absolute",
      top: 30,
      left: 0,
      right: 0,
      height: 1,
      borderBottom: "1px solid #FD7E08",
    },
  },
});
