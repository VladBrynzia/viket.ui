import React from "react";
import { styled } from "../../../../stitches.config";
import { InterestingArticle } from "../../../ui/common/InterestingArticle";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { BlogArticle } from "../../../types/BlogArticle";

type Props = {
  articles: BlogArticle[];
};

export const InterestingSection: React.FC<Props> = ({ articles }) => {
  const { t } = useTranslation();

  return (
    <Container id="blog">
      <ContentContainer>
        <Title>{t("blog.interesting")}</Title>
        <InterestingArticle articles={articles} />
      </ContentContainer>
    </Container>
  );
};

const Container = styled("div", {
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
