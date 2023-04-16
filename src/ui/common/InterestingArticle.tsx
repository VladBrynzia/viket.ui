import React from "react";
import { styled } from "../../../stitches.config";
import { ArticleCard } from "../../components/Home/components/ArticleCard";
import { BlogArticle } from "../../types/BlogArticle";

type Props = {
  articles: BlogArticle[];
};

export const InterestingArticle: React.FC<Props> = ({ articles }) => {
  return (
    <Box>
      {articles.map((el) => (
        <ArticleCard key={el.id} article={el.attributes} />
      ))}
    </Box>
  );
};

const Box = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 15,
  '@md': {
    gap: 60,
  }
});
