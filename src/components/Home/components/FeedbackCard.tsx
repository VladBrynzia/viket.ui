import React from "react";
import { styled } from "../../../../stitches.config";
import { Feedback } from "../../../types/Feedbacks";

type Props = {
  feedback: Feedback;
  isActive: boolean;
};

export const FeedbackCard: React.FC<Props> = ({ feedback, isActive }) => {
  return (
    <Container variant={isActive ? "selected" : "notSelected"}>
      <StarBox>
        <Box>
          <Image src={feedback.author.data.attributes.url} alt="feedback" />
          <AuthorBox>
            <Title>{feedback.authorName}</Title>
            <AuthorInfo>{feedback.authorProfession}</AuthorInfo>
          </AuthorBox>
        </Box>
        <Star variant={isActive ? "selected" : "notSelected"}></Star>
      </StarBox>
      <Info>{feedback.description}</Info>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: 20,
  width: "90%",
  minHeight: "350px",
  height: "fix-content",
  borderRadius: "20px",
  padding: "30px 20px",
  transition: "all 300ms ease",
  "@md": {
    width: "700px",
    minHeight: "300px",
    padding: "50px 60px",
  },
  "&:hover": {
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  },
  variants: {
    variant: {
      selected: {
        background: "$feedbackPinkLightBackground",
        transform: "translateY(-40px)",
        transition: "all 1000ms ease",
      },
      notSelected: {
        background: "$feedbackBg",
      },
    },
  },
  defaultVariants: {
    variant: "notSelected",
  },
});

const AuthorBox = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  flexDirection: "column",
  gap: 10,
  transform: "translateY(0) !important",
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  transform: "translateY(0) !important",
});

const StarBox = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transform: "translateY(0) !important",
});

const Star = styled("div", {
  background: "url(/images/feedback-star.svg) !important",
  backgroundRepeat: 'no-repeat !important',
  backgroundSize: 'cover',
  width: "90px",
  height: "110px",
  transform: "translateY(0) !important",
  transition: "all 300ms ease",
  variants: {
    variant: {
      selected: {
        background: "url(/images/feedback-star-v.svg) !important",
      },
      notSelected: {
        background: "url(/images/feedback-star.svg) !important",
      },
    },
  },
  defaultVariants: {
    variant: "notSelected",
  },
});

const Image = styled("img", {
  height: "85px",
  width: "85px",
  borderRadius: "20px",
  objectFit: "cover",
  "@md": {
    height: "105px",
    width: "105px",
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
  fontSize: "18px",
  lineHeight: "32px",
  margin: 0,
  textAlign: 'justify',
});

const AuthorInfo = styled("p", {
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "24px",
  margin: 0,
});
