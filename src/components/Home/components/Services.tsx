import React from "react";
import { styled } from "../../../../stitches.config";
import { Service } from "../../../types/Service";
import { ServiceCard } from "./ServiceCard";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Management } from "../../../ui/common/Services/Management";
import { Financial } from "../../../ui/common/Services/Financial";
import { Startup } from "../../../ui/common/Services/Startup";

const services: Service[] = [
  {
    image: <Startup />,
    title: "home.card.startups",
    shortInfo:
      "home.card.startups.first",
    description:
      "home.card.startups.second",
    link: "/blog-posts/launch-control",
  },
  {
    image: <Management />,
    title: "home.card.management",
    shortInfo:
      "home.card.management.first",
    description:
      "home.card.management.second",
    link: "/blog-posts/mansulting",
  },
  {
    image: <Financial />,
    title: "home.card.financial",
    shortInfo:
      "home.card.financial.first",
    description:
      "home.card.financial.second",
    link: "/blog-posts/the-force-consulting",
  },
];

export const Services: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container id="services">
      <Title>{t("home.services")}</Title>
      <AbsoluteBoxViolet />
      <AbsoluteBoxOrange />
      <Box>
        {services.map((el, i) => (
          <ServiceCard key={i} service={el} />
        ))}
      </Box>
    </Container>
  );
};

const Container = styled("section", {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
  gap: 30,
  margin: "60px auto",
  padding: "20px",
  "@md": {
    width: "1240px",
    margin: "90px auto",
  },
});

const AbsoluteBoxViolet = styled("div", {
  position: "absolute",
  width: "450px",
  height: "500px",
  bottom: -100,
  left: -100,
  background:
    "radial-gradient(50% 50% at 50% 50%, #AC59FF 0%, rgba(165, 74, 255, 0) 100%)",
  opacity: 0.3,
  zIndex: -1,
  "@xxs": {
    width: "550px",
    height: "600px",
    bottom: -100,
    left: -100,
  },
  "@xs": {
    width: "550px",
    height: "600px",
    bottom: -100,
    left: -100,
  },
  "@sm": {
    width: "650px",
    height: "700px",
    bottom: -200,
    left: 100,
  },
  "@md": {
    width: "950px",
    height: "900px",
    bottom: -400,
    left: 0,
  },
  "@lg": {
    width: "950px",
    height: "1000px",
    bottom: -400,
    left: -200,
  },
});

const AbsoluteBoxOrange = styled("div", {
  position: "absolute",
  width: "450px",
  height: "500px",
  top: -100,
  left: -100,
  background:
    "radial-gradient(50% 50% at 50% 50%, #F96E20 0%, rgba(249, 110, 32, 0) 100%)",
  opacity: 0.3,
  zIndex: -1,
  "@xxs": {
    width: "550px",
    height: "600px",
    top: -100,
    left: -100,
  },
  "@xs": {
    width: "650px",
    height: "700px",
    top: -100,
    left: -100,
  },
  "@sm": {
    width: "550px",
    height: "700px",
    top: -100,
    left: 350,
  },
  "@md": {
    width: "650px",
    height: "900px",
    top: -100,
    left: 500,
  },
  "@lg": {
    width: "750px",
    height: "1200px",
    top: -350,
    left: 500,
  },
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 20,
  "@md": {
    flexDirection: "row",
  },
});

const Title = styled("h1", {
  fontWeight: "600",
  fontSize: "30px",
  lineHeight: "32px",
  textAlign: "center",
  margin: '0 0 30px',
  "@md": {
    fontSize: "40px",
    lineHeight: "32px",
    margin: '0 0 60px',
  },
});
