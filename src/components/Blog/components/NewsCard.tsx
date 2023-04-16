import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import { styled } from "../../../../stitches.config";
import { Article } from "../../../types/Article";
import { AuthorInfo } from "../../../ui/common/AuthorInfo";

type Props = {
  article: Article;
};

export const NewsCard: React.FC<Props> = ({ article }) => {
  return (
    <Container to={`/blog-posts/${article.slug}`}>
      <ImageBox>
        <MainImage
          src={article.mainImage.data.attributes.url}
          alt="article image"
        />
      </ImageBox>
      <AuthorInfo
        author={article.author}
        date={article.date}
        authorImage={article.authorImage.data.attributes.url}
        readingTime={article.timeToReading}
      />
      <Title>{article.title}</Title>
      <Description className="card">{article.shortDescription}</Description>
    </Container>
  );
};

const Container = styled(Link, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 12,
  width: "90%",
  margin: "0 auto",
  color: "$black",
  "@xs": {
    width: "47%",
  },
});

const ImageBox = styled("div", {
  width: "100%",
  paddingTop: "33.33%",
  position: "relative",
});

const MainImage = styled("img", {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 20,
});

const Title = styled("h1", {
  margin: 0,
  fontWeight: "700",
  fontSize: "24px",
  lineHeight: "30px",
  color: "$black",
});

const Description = styled("p", {
  margin: 0,
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "24px",
  height: "100px",
  overflow: "clip",
  textOverflow: "ellipsis",
});
