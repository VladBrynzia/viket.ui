import React from "react";
import { styled } from "../../../../stitches.config";
import { ProjectOption } from "../../../types/Project";
import { useTranslation } from "gatsby-plugin-react-i18next";

type Props = {
  projectOption: ProjectOption;
};

export const ProjectCard: React.FC<Props> = ({ projectOption }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box>
        <Image src={projectOption.image} alt="project" />
      </Box>
      <Title>{t(projectOption.title)}</Title>
      <Info>{t(projectOption.description)}</Info>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "160px",
  "@md": {
    width: "180px",
  },
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "135px",
  width: '135px',
  border: '3px solid #F6D9FF',
  borderRadius: '100%',
});

const Image = styled("img", {
  height: "70px",
});

const Title = styled("h1", {
  fontWeight: "600",
  fontSize: "24px",
  lineHeight: "30px",
});

const Info = styled("p", {
  fontWeight: "300",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center",
});
