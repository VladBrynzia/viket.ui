import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  authorImage?: string;
  author: string;
  date: string;
  readingTime: string;
};

export const AuthorInfo: React.FC<Props> = ({ authorImage, author, date, readingTime }) => {
  return (
    <Box>
        {authorImage ? (
          <AuthorImage src={authorImage} alt="author image" />
        ) : (
          <AuthorImage src="/icons/author.svg" alt="author image" />
        )}
        <AuthorBox>
          <AuthorName>{author}</AuthorName>
          <DateBox>
            <Date>{date}</Date>
            <Dot />
            <Date>{readingTime}</Date>
          </DateBox>
        </AuthorBox>
      </Box>
  );
};


const Box = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 10,
});

const AuthorImage = styled("img", {
  width: "61px",
  height: "61px",
  objectFit: "cover",
  borderRadius: "100%",
});

const AuthorBox = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  flexDirection: "column",
});

const AuthorName = styled("h2", {
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "30px",
  margin: 0,
});

const DateBox = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 10,
});

const Date = styled("p", {
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "30px",
  margin: 0,
});

const Dot = styled("div", {
  width: "3px",
  height: "3px",
  borderRadius: '100%',
  background: '$black',
});
