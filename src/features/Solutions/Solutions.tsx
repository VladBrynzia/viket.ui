import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { styled } from "../../../stitches.config";
import first from "../../../static/images/first.png";
import second from "../../../static/images/second.png";
import third from "../../../static/images/third.png";
import fourth from "../../../static/images/fourth.png";
import five from "../../../static/images/five.png";
import six from "../../../static/images/six.png";
import seven from "../../../static/images/seven.png";
import eight from "../../../static/images/eight.png";
import nine from "../../../static/images/nine.png";
import arrow from "../../../static/icons/slider-arrow.png";
import shop from "../../../static/icons/shop.png";
import { Link } from "gatsby-plugin-react-i18next";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { Helmet } from "react-helmet";

const policarbonSlider = [
  {
    image: first,
  },
  {
    image: second,
  },
  {
    image: third,
  },
  {
    image: fourth,
  },
  {
    image: five,
  },
  {
    image: six,
  },
  {
    image: seven,
  },
  {
    image: eight,
  },
  {
    image: nine,
  },
];

type Props = {
  pageContext: PageContext;
};

export const Solutions: React.FC<Props> = ({ pageContext }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const title = "Готовые решения";
  const description =
    "Готовые решения из сотового, монолитного и профилированого поликарбоната";

  return (
    <>
      <Helmet defaultTitle={title}>
        <meta
          name="keywords"
          content="поликарбон, поликарбонат, теплицы, навесы, продажа поликарбоната, сотовый поликарбонат, монолитный поликарбонат, магазин поликарботана"
        />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="Policarbonat VIKET" />
        <meta name="twitter:title" content="Policarbonat VIKET" />

        <meta property="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        <meta property="og:site_name" content="policarbonat-viket" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section>
        <SwiperContainer>
          <MainTitle>Готовые решения</MainTitle>
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
              return (
                <StyledSwiperSlide key={i}>
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
      <Container>
        <Box>
          <Title>Строительство крыш и навесов</Title>
          <Text>
            Поликарбонатные листы и панели отлично подходят для создания прочных
            и долговечных крыш и навесов. Они обеспечивают надежную защиту от
            атмосферных воздействий, ультрафиолетового излучения и осадков, при
            этом обеспечивая отличную естественную освещенность.
          </Text>
        </Box>
        <Box>
          <Title>Автомобильные гаражи и стоянки</Title>
          <Text>
            Готовые решения с поликарбонатом для автомобильных гаражей и стоянок
            обеспечивают надежную защиту от погодных условий, а также снижают
            затраты на искусственное освещение благодаря прозрачности материала.
          </Text>
        </Box>
        <Box>
          <Title>Световые панели и окна</Title>
          <Text>
            Поликарбонатные световые панели и окна используются в архитектурных
            проектах для создания эффектного дизайна и обеспечения естественного
            освещения помещений. Они также могут быть установлены в мансардах и
            чердачных помещениях.
          </Text>
        </Box>
      </Container>
      <Container style={{ marginBottom: 60 }}>
        <Box>
          <Title>Тепличные комплексы</Title>
          <Text>
            Тепличные комплексы, выполненные с использованием поликарбоната,
            предоставляют идеальные условия для выращивания растений и овощей.
            Материал обладает высокой теплоизоляцией, что позволяет создавать
            оптимальный микроклимат внутри теплицы.
          </Text>
        </Box>
        <Box>
          <Title>Защитные экраны и ограждения</Title>
          <Text>
            Поликарбонат обладает выдающимися антивандальными и антиградовыми
            свойствами. Он применяется для создания прочных и прозрачных
            защитных экранов и ограждений, обеспечивая безопасность и видимость
            одновременно.
          </Text>
        </Box>
      </Container>
    </>
  );
};

const MainTitle = styled("h1", {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 18,
  lineHeight: "21px",
  color: "#171717",
  margin: "30px 0",
  "@md": {
    fontSize: 24,
    lineHeight: "28px",
  },
});

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 15,
  padding: "15px 15px 30px",
  borderRadius: "0px 10px 0px 10px",
  background:
    "linear-gradient(135deg, hsla(156, 85%, 92%, 1) 45%, hsla(337, 90%, 92%, 1) 100%, hsla(0, 63%, 79%, 1) 100%)",
  maxWidth: 360,
  "@md": {
    maxWidth: "initial",
  },
});

const Title = styled("h2", {
  textAlign: "center",
  fontWeight: 500,
  textTransform: "uppercase",
  fontSize: 18,
  lineHeight: "21px",
  color: "#171717",
  margin: 0,
  "@md": {
    textAlign: "start",
    lineHeight: "28px",
  },
});

const Text = styled("p", {
  margin: "0",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "170%",
  color: "#171717",
  "@xs": {
    maxWidth: 700,
    margin: "0 auto",
  },
  "@md": {
    maxWidth: "initial",
  },
});

const Container = styled("section", {
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  maxWidth: 1280,
  margin: "0 auto",
  gap: 20,
  alignItems: "center",
  "@md": {
    flexDirection: "row",
    alignItems: "initial",
  },
});

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
  maxHeight: 270,
  objectFit: "cover",
  borderRadius: "0px 5px",
  "@md": {
    minHeight: 300,
    maxHeight: 560,
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
  maxWidth: "1280px",
  "@md": {
    margin: "50px auto 100px",
  },

  ".swiper-button-disabled": {
    opacity: 0.3,
  },
});
