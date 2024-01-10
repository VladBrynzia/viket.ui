import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { styled } from "../../../stitches.config";
import prof from "../../../static/images/prof.png";
import sota from "../../../static/images/sota.png";
import mono2 from "../../../static/images/mono2.png";
import arrow from "../../../static/icons/slider-arrow.png";
import shop from "../../../static/icons/shop.png";
import { Link } from "gatsby-plugin-react-i18next";

const policarbonSlider = [
  {
    id: "1",
    name: "Сотовый поликарбонат",
    image: sota,
  },
  {
    id: "2",
    name: "Профилированный поликарбонат",
    image: prof,
  },
  {
    id: "3",
    name: "Монолитный поликарбонат",
    image: mono2,
  },
];

export const MainSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const checkActiveIndex = useMemo(() => {}, []);

  return (
    <section>
      <SwiperContainer>
        <StyledSwiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: `.slider-button-prev`,
            nextEl: `.slider-button-next`,
          }}
          pagination={{
            type: "progressbar",
          }}
          slidesPerView={1}
          spaceBetween={8}
          className="mySwiper"
          onActiveIndexChange={(slide) => setActiveIndex(slide.realIndex + 1)}
        >
          {policarbonSlider.map((slide, i) => {
            const length = policarbonSlider.length;
            const currentSlideIndex = i + 1;
            return (
              <StyledSwiperSlide key={i}>
                <Text>{slide.name}</Text>
                <Image src={slide.image} alt="policarbon" />
              </StyledSwiperSlide>
            );
          })}
        </StyledSwiper>
        <Nav className={`slider-button-prev`} position="left"></Nav>
        <Nav className={`slider-button-next`} position="right"></Nav>
        <Button to="/products">
          Перейти в магазин
          <ShopImage src={shop} alt="shop" />
        </Button>
        {/* <IndexBox>
          <Index>0{activeIndex}</Index>
          <Line />
          <SecondIndex>0{policarbonSlider.length}</SecondIndex>
        </IndexBox> */}
      </SwiperContainer>
    </section>
  );
};

const StyledSwiper = styled(Swiper, {});

const StyledSwiperSlide = styled(SwiperSlide, {
  margin: "0 auto",
});

const IndexBox = styled("div", {
  position: "absolute",
  zIndex: 11,
  display: "flex",
  gap: 10,
  bottom: 28,
  right: 80,
  "@md": {
    bottom: 35,
    right: 260,
    gap: 20,
  },
});

const Index = styled("p", {
  margin: 0,
  fontWeight: 400,
  color: "#88919F",
  fontSize: 6,
  lineHeight: "7px",
  "@md": {
    fontSize: 15,
    lineHeight: "18px",
  },
});

const SecondIndex = styled("p", {
  margin: 0,
  fontWeight: 400,
  color: "#5D6571",
  fontSize: 5,
  lineHeight: "6px",
  "@md": {
    fontSize: 15,
    lineHeight: "18px",
  },
});

const Line = styled("div", {
  position: "absolute",
  zIndex: 12,
  width: 1,
  background: "#616975",
  height: 10,
  bottom: 0,
  right: 11,
  "@md": {
    bottom: -2,
    right: 28,
    height: 22,
  },
});

const Image = styled("img", {
  width: "100%",
  height: "100%",
  minHeight: 100,
  maxHeight: 560,
  objectFit: "cover",
  borderRadius: "0px 5px",
  "@md": {
    minHeight: 300,
    borderRadius: "0px 10px",
  },
});

const ShopImage = styled("img", {
  width: "12px",
  height: "12px",
  "@md": {
    width: "20px",
    height: "20px",
  },
});

const Button = styled(Link, {
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  gap: 8,
  position: "absolute",
  bottom: 20,
  left: "10%",
  zIndex: 2,
  background: "#FFA500",
  border: "none",
  borderRadius: "0px 5px",
  padding: "8px 18px",
  fontWeight: 700,
  fontSize: 10,
  lineHeight: "12px",
  color: "$white",
  "@md": {
    left: "50%",
    bottom: 30,
    transform: "translateX(-50%)",
    padding: "20px 80px",
    fontSize: 18,
    lineHeight: "21px",
  },
});

const Text = styled("p", {
  margin: 0,
  position: "absolute",
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "21px",
  background: "rgba(19, 39, 67, 0.7)",
  borderRadius: "0px 10px",
  color: "$white",
  padding: "8px 4px",
  maxWidth: 200,
  width: "min-content",
  "@md": {
    maxWidth: 440,
    padding: "16px 8px",
    fontSize: 42,
    lineHeight: "49px",
  },
});

const Nav = styled("div", {
  position: "absolute",
  cursor: "pointer",
  zIndex: 1,
  background: "rgba(44, 54, 32, 0.8)",
  borderRadius: "0px 2px",
  height: "25px",
  width: "25px",
  padding: "8px 10px",
  "@md": {
    padding: "25px 30px",
    height: 78,
    width: 78,
  },
  variants: {
    position: {
      left: {
        height: "10px",
        width: "6px ",
        top: "50%",
        transform: "translateY(-50%)",
        left: 10,
        "@md": {
          height: 27,
          width: 17,
        },

        "&:after": {
          content: "",
          display: "block",
          backgroundImage: `url(${arrow}) `,
          transform: "rotate(180deg)",
          backgroundSize: "cover ",
          backgroundRepeat: "no-repeat ",
          height: "10px",
          width: "6px ",
          "@md": {
            height: "27px ",
            width: "17px ",
          },
        },
      },
      right: {
        height: "10px",
        width: "6px ",
        top: "50%",
        right: 10,
        transform: "translateY(-50%)",
        "@md": {
          height: 27,
          width: 17,
        },
        "&:after": {
          content: "",
          display: "block",
          backgroundImage: `url(${arrow})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "10px",
          width: "6px ",
          "@md": {
            height: "27px ",
            width: "17px ",
          },
        },
      },
    },
  },
});

const SwiperContainer = styled("div", {
  position: "relative",
  width: "100%",
  maxWidth: "1000px",
  margin: "0 auto",
  "@md": {
    margin: "50px auto 100px",
  },
  "@lg": {
    maxWidth: "1280px",
  },

  ".swiper-button-disabled": {
    opacity: 0.3,
  },
});
