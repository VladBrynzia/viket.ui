import React from "react";
import { styled } from "../../../../stitches.config";
import { useScreenResolution } from "../../../hooks/useScreenResolution";
import { Service } from "../../../types/Service";
import { Link, useI18next, useTranslation } from "gatsby-plugin-react-i18next";

type Props = {
  service: Service;
};

export const ServiceCard: React.FC<Props> = ({ service }) => {
  const { resolution } = useScreenResolution();
  const { t } = useTranslation();
  const { language } = useI18next();

  return (
    <Container>
      <StarBox>{service.image}</StarBox>
      <InfoBox language={language === "en"}>
        <Title>{t(service.title)}</Title>
        <Info dangerouslySetInnerHTML={{ __html: t(service.shortInfo) }}></Info>
        {resolution === "desktop" && (
          <Description
            dangerouslySetInnerHTML={{ __html: t(service.description) }}
          ></Description>
        )}
      </InfoBox>
      <Button to={service.link}>{t("home.button.interesting")}</Button>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  background: "$white",
  border: "1px solid #F6D9FF",
  borderRadius: "20px",
  padding: "30px 10px",
  width: "95%",
  height: "fix-content",
  transition: "all 300ms ease",
  "&:hover": {
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    "&>:first-child": {
      background: "url(/images/service-card-star-orange.svg) no-repeat",
      backgroundSize: "contain",
      "&>svg>path:nth-child(n)": {
        fill: "$orange",
        stroke: "$orange",
      },
    },
  },
  "@xs": {
    width: "390px",
  },
  "@md": {
    padding: "30px",
  },
});

const StarBox = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  height: "220px",
  width: "220px",
  background: "url(/icons/service-card-star.svg) no-repeat",
  backgroundSize: "contain",
  transition: "all 300ms ease",
  "&>svg>path": {
    transition: "all 300ms ease",
  },
});

const InfoBox = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "240px",
  width: "100%",
  marginTop: "20px",
  "@md": {
    justifyContent: "flex-start",
  },

  variants: {
    language: {
      true: {
        "@md": {
          height: "490px",
        },
      },
      false: {
        "@md": {
          height: "400px",
        },
      },
    },
  },
});

const Title = styled("h1", {
  fontWeight: "600",
  fontSize: "24px",
  lineHeight: "30px",
  margin: "0 0 10px",
  textAlign: "center",
});

const Info = styled("p", {
  fontWeight: "300",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 15px",
  textAlign: "justify",
});

const Description = styled("p", {
  fontWeight: "300",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 10px",
  textAlign: "justify",
});

const Button = styled(Link, {
  position: "relative",
  background: "$orange",
  padding: "12px 80px",
  border: "1px solid #FD7E08",
  color: "$white",
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "35px",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "all 300ms ease",
  "&:hover": {
    background: "$violet",
    border: "1px solid #9900CC",
  },
  "&:after": {
    content: "",
    position: "absolute",
    top: "35%",
    right: 55,
    width: 15,
    height: 15,
    zIndex: 1,
    background: "url(/icons/interesting-arrow.svg) no-repeat",
  },
  "@md": {
    fontSize: "18px",
  },
});
