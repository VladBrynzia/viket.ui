import React from "react";
import { styled } from "../../../../stitches.config";
import { ReactI18NextChild, useTranslation } from "gatsby-plugin-react-i18next";
import { Project } from "../../../types/Project";

type Props = {
  project: Project;
};

export const ProjectInfo: React.FC<Props> = ({ project }) => {
  const { t } = useTranslation();
  const richText = project.attributes.description;
  const richDescriprionTextObj = eval("({obj:[" + richText + "]})");

  return (
    <InfoContainer>
      <Info>
        <ProjectTitle>{project.attributes.projectTitle}</ProjectTitle>
        {richDescriprionTextObj.obj[0].blocks.map(
          (
            el: {
              data: {
                text:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | React.ReactPortal
                  | Iterable<ReactI18NextChild>
                  | null
                  | undefined;
              };
            },
            i: React.Key | null | undefined
          ) => (
            <Text
              key={i}
              dangerouslySetInnerHTML={{ __html: `${el.data.text}` }}
            ></Text>
          )
        )}
      </Info>
      <Info>
        <InfoImage
          src={project.attributes.projectImage.data.attributes.url}
          alt="project info"
        />
        <HoursBox>
          <InfoBox>
            <Hours>{project.attributes.firstShortNumber}</Hours>
            <HoursInfo>{project.attributes.firstShortInfo}</HoursInfo>
          </InfoBox>
          <Line></Line>
          <InfoBox>
            <Hours>{project.attributes.secondShortNumber}</Hours>
            <HoursInfo>{project.attributes.secondShortInfo}</HoursInfo>
          </InfoBox>
        </HoursBox>
      </Info>
    </InfoContainer>
  );
};

const InfoContainer = styled("div", {
  "@md": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    margin: "30px 0",
  },
});

const Info = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "@md": {
    position: "relative",
    width: "48%",
  },
});

const ProjectTitle = styled("h1", {
  fontWeight: "600",
  fontSize: "24px",
  lineHeight: "30px",
  margin: "0 0 10px",
});

const Text = styled("p", {
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "32px",
  margin: "0 0 25px",
  textAlign: "justify",
});

const InfoImage = styled("img", {
  width: "100%",
  maxHeight: 440,
  objectFit: "cover",
  borderRadius: 32,
  transform: "translateY(25px)",
  "@xs": {
    width: "70%",
  },
  "@md": {
    width: "100%",
  },
});

const HoursBox = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "flex-start",
  gap: 15,
  background: "$feedbackPinkLightBackground",
  padding: "20px",
  width: "95%",
  height: "fix-content",
  borderRadius: "10px",
  zIndex: 1,
  transform: "translateY(-35px)",
  "@md": {
    alignItems: "center",
    position: "absolute",
    top: 0,
    paddingRight: "35px",
  },
});

const Line = styled("div", {
  borderLeft: "1px solid #000",
  height: "90px",
});

const InfoBox = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 10,
  width: "fix-content",
  "@md": {
    flexDirection: "row",
  },
});

const Hours = styled("h1", {
  fontWeight: "600",
  fontSize: "48px",
  lineHeight: "40px",
  margin: 0,
});

const HoursInfo = styled("p", {
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
  width: "110px",
  textAlign: "center",
  margin: 0,
  "@md": {
    textAlign: "start",
  },
});
