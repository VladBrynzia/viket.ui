import React from "react";
import { styled } from "../../../../stitches.config";
import { Arrow } from "../../../ui/common/Arrow";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { InterestingArticle } from "../../../ui/common/InterestingArticle";
import { BlogArticle } from "../../../types/BlogArticle";

type Props = {
  articles: BlogArticle[];
};

export const BlogBlock: React.FC<Props> = ({ articles }) => {
  const { t } = useTranslation();

  const lastInterestingArticles = articles.slice(0, 3);

  return (
    <Container id="blog">
      <ContentContainer>
        <Title>{t("home.blog")}</Title>
        <InterestingArticle articles={lastInterestingArticles} />
        <Button to="/blog">
          {t("home.viewBlog")}
          <Arrow />
        </Button>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("section", {
  background:
    "linear-gradient(180deg, #FBF6FF 51.7%, rgba(251, 246, 255, 0) 100%)",
});

const ContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 30,
  margin: "60px auto",
  padding: "20px",
  "@md": {
    width: "1240px",
    margin: "90px auto",
  },
});

const Title = styled("h1", {
  fontWeight: "600",
  fontSize: "30px",
  lineHeight: "32px",
  "@md": {
    fontSize: "40px",
    lineHeight: "50px",
  },
});

const Button = styled(Link, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  background: "transparent",
  border: "3px solid #FD7E08",
  borderRadius: "30px",
  padding: "12px 65px",
  color: "$orange",
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "35px",
  cursor: "pointer",
  transition: "all 300ms ease",
  "&>svg>path": {
    stroke: "$orange",
    transition: "all 300ms ease",
  },
  "&:hover": {
    border: "3px solid #9900CC",
    color: "$violet",
    "&>svg>path": {
      stroke: "$violet",
      transition: "all 300ms ease",
    },
  },
  "@md": {
    padding: "12px 75px",
  },
});
