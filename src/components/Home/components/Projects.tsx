import React, { useMemo, useState } from "react";
import { styled } from "../../../../stitches.config";
import { Project, ProjectOption } from "../../../types/Project";
import { ProjectCard } from "./ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Arrow } from "../../../ui/common/Arrow";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Link } from "gatsby-plugin-react-i18next";
import { ProjectInfo } from "./ProjectInfo";

const projectsOptions: ProjectOption[] = [
  {
    image: "/icons/rocket.svg",
    title: "home.projects.innovations",
    description: "",
  },
  {
    image: "/icons/brain.svg",
    title: "home.projects.creativity",
    description: "",
  },
  {
    image: "/icons/puzzle.svg",
    title: "home.projects.synergies",
    description: "",
  },
  {
    image: "/icons/idea.svg",
    title: "home.projects.understanding",
    description: "",
  },
  {
    image: "/icons/hands.svg",
    title: "home.projects.support",
    description: "",
  },
];

type Props = {
  projects: Project[];
};

export const Projects: React.FC<Props> = ({ projects }) => {
  const [projectId, setProjectId] = useState(projects[0]);
  const { t } = useTranslation();

  const projectInfo = useMemo(() => {
    const project = projects.find((el) => el.id === projectId.id);
    if (!project) {
      return;
    }
    return project;
  }, [projectId]);

  return (
    <Container id="projects">
      <Title>{t("home.projects")}</Title>
      <SwiperBox
        loop={true}
        autoplay={{
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }}
        speed={1000}
        navigation={{
          prevEl: ".slider-button-prev",
          nextEl: ".slider-button-next",
        }}
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        spaceBetween={16}
        centeredSlides={true}
        breakpoints={{
          960: { slidesPerView: 3, spaceBetween: 25 },
        }}
      >
        {projects.map((el) => (
          <SwiperSlideBox key={el.id} onClick={() => setProjectId(el)}>
            <StyledLink href={el.attributes.projectLink} target="_blank">
              {el.attributes.projectName}
              <Arrow />
            </StyledLink>
          </SwiperSlideBox>
        ))}
      </SwiperBox>
      <Nav className="slider-button-prev"></Nav>
      <Nav className="slider-button-next"></Nav>
      {projectInfo && <ProjectInfo project={projectInfo} />}
      <Box>
        {projectsOptions.map((el, i) => (
          <ProjectCard key={i} projectOption={el} />
        ))}
      </Box>
    </Container>
  );
};

const Container = styled("section", {
  position: "relative",
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

const Box = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  "@sm": {
    gap: 30,
  },
  "@md": {
    gap: 70,
  },
});

const SwiperBox = styled(Swiper, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  "@sm": {
    margin: "30px 0",
  },
});

const SwiperSlideBox = styled(SwiperSlide, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledLink = styled("a", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  gap: 10,
  height: "60px",
  width: "360px",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "34px",
  color: "$black",
  border: "2px solid #9900CC",
  borderRadius: "30px",
  transition: "all 300ms ease",
  "&>svg>path": {
    stroke: "$black",
    transition: "all 300ms ease",
  },
  "&:hover": {
    color: "$white",
    background: "$orange",
    border: "2px solid #FD7E08",
    "&>svg>path": {
      stroke: "$white",
      transition: "all 300ms ease",
    },
  },
});

const Nav = styled("div", {});
