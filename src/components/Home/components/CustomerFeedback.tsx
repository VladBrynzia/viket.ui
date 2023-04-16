import React from "react";
import { styled } from "../../../../stitches.config";
import { Feedbacks } from "../../../types/Feedbacks";
import { FeedbackCard } from "./FeedbackCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useTranslation } from "gatsby-plugin-react-i18next";

type Props = {
  feedbacks: Feedbacks[];
};

export const CustomerFeedback: React.FC<Props> = ({ feedbacks }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("home.feedback")}</Title>
      <Text>{t("home.trust")}</Text>
      <SwiperBox
        loop={true}
        autoplay={{
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={true}
        grabCursor={true}
        breakpoints={{
          1280: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {feedbacks.map((el) => (
          <SwiperSlideBox key={el.id}>
            {({ isActive }) => (
              <FeedbackCard feedback={el.attributes} isActive={isActive} />
            )}
          </SwiperSlideBox>
        ))}
      </SwiperBox>
    </Container>
  );
};

const Container = styled("section", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 20,
  margin: "30px 0",
});

const SwiperBox = styled(Swiper, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: "35px 0",
  paddingTop: '50px !important',
  "@sm": {
    margin: 0,
  },
});

const SwiperSlideBox = styled(SwiperSlide, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled("h1", {
  color: "$black",
  textTransform: "uppercase",
  fontWeight: "700",
  fontSize: "30px",
  lineHeight: "32px",
  textAlign: "center",
  margin: 0,
  padding: "0 20px",
  "@md": {
    fontSize: "40px",
    lineHeight: "32px",
  },
});

const Text = styled("p", {
  fontWeight: "300",
  fontSize: "24px",
  lineHeight: "30px",
  color: "$black",
  textAlign: "center",
  padding: "0 20px",
  margin: 0,
  maxWidth: 1000,
  "@md": {
    lineHeight: "32px",
  },
});
