import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { ChoseLanguage } from "../../ui/common/Language/ChoseLanguage";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby-plugin-react-i18next";

export const DesktopNavigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ContentContainer>
        <StyledBox>
          <Link to="/">
            <Image src="/images/logo.svg" alt="logo" />
          </Link>
          <ChoseLanguage />
        </StyledBox>
        <List>
          <StyledLink to="/#about-us">{t("header.nav.about")}</StyledLink>
          <Dot src="/icons/nav-dot.svg" alt="dot" />
          <StyledLink to="/#services">{t("header.nav.services")}</StyledLink>
          <Dot src="/icons/nav-dot.svg" alt="dot" />
          <StyledLink to="/#projects">{t("header.nav.projects")}</StyledLink>
          <Dot src="/icons/nav-dot.svg" alt="dot" />
          <StyledLink to="/blog">{t("header.nav.blog")}</StyledLink>
        </List>
        <Button to="/contact">{t("header.nav.contact")}</Button>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("div", {
  padding: "20px 40px",
  transition: "all 0ms ease",
  background: "transparent",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
});

const ContentContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 30,
  width: "1240px",
  margin: "0 auto",
});

const StyledBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 40,
  width: 420,
});

const Image = styled("img", {
  width: "250px",
});

const List = styled("ul", {
  display: "flex",
  alignItems: "center",
  gap: 20,
  padding: 0,
  minWidth: 600,
});

const Button = styled(Link, {
  background: "transparent",
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "35px",
  border: "2px solid #fff",
  borderRadius: "30px",
  padding: "12px 40px",
  color: "$white",
  cursor: "pointer",
  transition: "all 300ms ease",
  "&:hover": {
    border: "2px solid #FD7E08",
    color: "#FD7E08",
  },
});

const StyledLink = styled(Link, {
  color: "#fff",
  transition: "all 300ms ease",
  position: "relative",
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: "35px",
  padding: "20px 15px",
  "&:hover": {
    color: "#FD7E08",
  },
});

const Dot = styled("img", {
  width: "5px",
  height: "5px",
  background: "url(/icons/nav-dot.svg) no-repeat",
});
