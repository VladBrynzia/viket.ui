import React from "react";
import { styled } from "../../../stitches.config";
import { useNoScroll } from "../../hooks/useNoScroll";
import { ChoseLanguage } from "../../ui/common/Language/ChoseLanguage";
import { SocialLinks } from "../../ui/common/Social/SocialLinks";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { useClickOutside } from "../../hooks/useClickOutside";

const menuItems = [
  {
    link: "/#about-us",
    title: "header.nav.about",
  },
  {
    link: "/#services",
    title: "header.nav.services",
  },
  {
    link: "/#projects",
    title: "header.nav.projects",
  },
  {
    link: "/blog",
    title: "header.nav.blog",
  },
  {
    link: "/contact",
    title: "header.nav.contact",
  },
];

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export const MobileMenu: React.FC<Props> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();
  useNoScroll(isOpen);
  const { ref } = useClickOutside({ onClickOutside: toggle, isOpen });

  return (
    <AbsoluteContainer isOpen={isOpen}>
      <Container ref={(interalRef) => (ref.current = interalRef)}>
        <Box>
          <ExitImage src="/icons/exit.svg" alt="exit" onClick={toggle} />
        </Box>
        <List>
          {menuItems.map((el, i) => (
            <StyledLink key={i} to={el.link} onClick={toggle}>
              {t(el.title)}
            </StyledLink>
          ))}
        </List>
        <div>
          <ChoseLanguage />
        </div>
        <SocialLinks />
      </Container>
    </AbsoluteContainer>
  );
};

const AbsoluteContainer = styled("div", {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: "0",
  left: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "200",
  overflowY: "hidden",
  transform: "translateX(-100%)",
  transition: "all 500ms ease",
  variants: {
    isOpen: {
      true: {
        transform: "translateX(0)",
        backgroundColor: "rgba(0,0,0,0.3)",
      },
    },
  },
});

const Container = styled("div", {
  padding: "30px",
  background: "$violetLighter",
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 30,
  top: 0,
  bottom: 0,
  left: 0,
  width: 350,
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const List = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: 0,
});

const ExitImage = styled("img", {
  width: "40px",
  cursor: "pointer",
  transition: "all 300ms ease",
  "&:hover": {
    transform: "rotate(90deg)",
  },
});

const StyledLink = styled(Link, {
  color: "#fff",
  transition: "all 300ms ease",
  position: "relative",
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "35px",
  borderBottom: "1px solid #9900CC",
  paddingBottom: "10px",
  cursor: "pointer",
  "&:hover": {
    color: "$orange",
  },
  "@xs": {
    fontSize: "22px",
  },
});
