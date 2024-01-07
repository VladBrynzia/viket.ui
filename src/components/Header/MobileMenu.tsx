import React from "react";
import { styled } from "../../../stitches.config";
import { useNoScroll } from "../../hooks/useNoScroll";
import { ChoseLanguage } from "../../ui/common/Language/ChoseLanguage";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { useClickOutside } from "../../hooks/useClickOutside";
import { menuItems } from "./Header";
import { keyframes } from "@stitches/react";
import { SocialMedia } from "../../ui/common/SocialMedia/SocialMedia";
import headerShop from "../../../static/icons/header-shop.png";
import { useShopContext } from "../../context/ShopPopupContext";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();
  useNoScroll(isOpen);
  const { ref } = useClickOutside({ onClickOutside: toggle, isOpen });
  const { toggleShop } = useShopContext();

  return (
    <AbsoluteContainer isOpen={isOpen}>
      <Container ref={(interalRef) => (ref.current = interalRef)}>
        <Box>
          <Link to="/">
            <Image src="/icons/logo.svg" alt="logo" />
          </Link>
          <ExitImage src="/icons/exit.svg" alt="exit" onClick={toggle} />
        </Box>
        <List>
          {menuItems.map((el, i) => (
            <StyledLink key={i} to={el.link} onClick={toggle}>
              {t(el.title)}
            </StyledLink>
          ))}
        </List>
        <ShopImage
          onClick={() => {
            toggleShop();
            toggle();
          }}
          src={headerShop}
          alt="header-shop"
        />
        <SocialMedia />
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
      </Container>
    </AbsoluteContainer>
  );
};

const background = keyframes({
  "0%": { background: "rgba(0,0,0,0)" },
  "50%": { background: "rgba(0,0,0,0.15)" },
  "100%": { background: "rgba(0,0,0,0.3)" },
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
  display: "flex",
  flexDirection: "column",
  gap: 7,
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

const AbsoluteContainer = styled("div", {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: "0",
  right: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "200",
  overflowY: "hidden",
  transform: "translateX(100%)",
  transition: "all 500ms ease",
  variants: {
    isOpen: {
      true: {
        transform: "translateX(0)",
        animation: `${background} 500ms 500ms linear forwards`,
      },
    },
  },
});

const ShopImage = styled("img", {
  cursor: "pointer",
  width: 30,
  height: 30,
});

const Container = styled("div", {
  padding: "10px 20px",
  background: "#fff",
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 30,
  top: 0,
  bottom: 0,
  right: 0,
  width: 320,
  boxSizing: "border-box",
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Image = styled("img", {
  width: "100px",
});

const List = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: 0,
});

const ExitImage = styled("img", {
  width: "20px",
  cursor: "pointer",
  transition: "all 300ms ease",
  "&:hover": {
    transform: "rotate(90deg)",
  },
});

const StyledLink = styled(Link, {
  color: "#000",
  textDecoration: "none",
  transition: "all 300ms ease",
  position: "relative",
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "18px",
  cursor: "pointer",
  width: "fit-content",
  "&:hover": {
    color: "$orange",
  },
  "@xs": {
    fontSize: "18px",
    lineHeight: "21px",
  },
});
