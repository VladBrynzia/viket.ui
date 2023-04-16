import React from "react";
import { styled } from "../../../../stitches.config";
import { Article } from "../../../types/Article";
import { Arrow } from "../../../ui/common/Arrow";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

type Props = {
  article: Article;
};
export const ArticleCard: React.FC<Props> = ({ article }) => {
  const { t } = useTranslation();

  const formatDate = () => {
    return article.date.split("-").reverse().join(".");
  };

  const shortDescription = article.shortDescription.slice(0, 115) + "...";
  return (
    <Container>
      <Box>
        <Image src={article.mainImage.data.attributes.url} alt="article" />
      </Box>
      <Date>{formatDate()}</Date>
      <Title>{article.title}</Title>
      <Info>{shortDescription}</Info>
      <Button to={`/blog-posts/${article.slug}`}>
        {t("home.button.readMore")}
        <Arrow />
      </Button>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 15,
  borderRadius: "20px",
  width: "100%",
  height: "fix-content",
  transition: "all 300ms ease",
  "@xs": {
    width: "360px",
  },
  "@md": {
    minHeight: "480px",
  },
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "190px",
  width: "100%",
  "@xxs": {
    height: "250px",
  },
  "@md": {
    height: "190px",
  },
});

const Button = styled(Link, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  color: "$orange",
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "32px",
  border: "none",
  background: "transparent",
  width: "200px",
  padding: "10px 5px 10px 0",
  cursor: "pointer",
  transition: "all 300ms ease",
  "&>svg> *": {
    stroke: "$orange",
    transition: "all 300ms ease",
  },
  "&:hover": {
    color: "$violet",
    "&>svg>path": {
      stroke: "$violet",
      transition: "all 300ms ease",
    },
  },
});

const Image = styled("img", {
  width: "100%",
  height: "190px",
  borderRadius: "30px",
  padding: "5px",
  objectFit: "cover",
  "@xxs": {
    height: "210px",
  },
});

const Title = styled("h1", {
  fontWeight: "600",
  fontSize: "24px",
  lineHeight: "30px",
  margin: 0,
});

const Info = styled("p", {
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "24px",
  margin: 0,
  height: "70px",
});

const Date = styled("p", {
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "32px",
  margin: 0,
});
