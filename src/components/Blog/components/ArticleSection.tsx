import React from "react";
import { styled } from "../../../../stitches.config";
import { BlogArticle } from "../../../types/BlogArticle";
import { NewsCard } from "./NewsCard";

type Props = {
  blogArticles: BlogArticle[];
};

export const ArticleSection: React.FC<Props> = ({ blogArticles }) => {
  return (
    <Container>
      <Articles>
        {blogArticles &&
          blogArticles.map((el, i) => <NewsCard key={i} article={el.attributes} />)}
      </Articles>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 30,
  margin: "30px auto",
  "@md": {
    width: "1240px",
    margin: "30px auto 60px",
  },
});

const Articles = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: 30,
  margin: "30px 0",
  "@xs": {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  "@sm": {
    gap: 30,
  },
  "@md": {
    gap: 45,
    margin: "60px 0",
  },
});
