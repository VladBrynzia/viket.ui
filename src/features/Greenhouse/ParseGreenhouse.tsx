import React from "react";
import { GreenhouseType } from "../../types/greenhouse";
import { styled } from "../../../stitches.config";
import { addTargetBlank } from "../Products/FullProductInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import arrow from "../../../static/icons/slider-arrow.png";

type Props = {
  greenhouse: GreenhouseType;
};
export const ParseGreenhouse: React.FC<Props> = ({ greenhouse }) => {
  const richText = greenhouse.attributes.description;
  const richTextObj = eval("({obj:[" + richText + "]})");

  console.log("====================================");
  console.log(greenhouse);
  console.log("====================================");

  const checkType = (el: any) => {
    if (el.type === "paragraph") {
      const finalValue = addTargetBlank(el.data.text);
      return (
        <CharacteristicText
          dangerouslySetInnerHTML={{ __html: `${finalValue}` }}
        ></CharacteristicText>
      );
    }
    if (el.type === "header") {
      return selectHeederLevel(el.data.level, el.data.text);
    }
    if (el.type === "list") {
      return selectListStyle(el.data.style, el.data.items);
    }
    if (el.type === "image") {
      return imagesRender(el.data);
    }
    if (el.type === "delimiter") {
      return <Delimiter>* * *</Delimiter>;
    }
    if (el.type === "checklist") {
      return checklistRender(el.data.items);
    }
    if (el.type === "warning") {
      return warningRender(el.data);
    }
    if (el.type === "quote") {
      return (
        <Quote>
          <QuoteText>"{el.data.text}"</QuoteText>
          <QuoteAuthor>{el.data.caption || "Unknown author"}</QuoteAuthor>
        </Quote>
      );
    }
    if (el.type === "LinkTool") {
      return (
        <Link href={el.data.link} target="_blank">
          {el.data.meta.title || el.data.link}
        </Link>
      );
    }
  };

  const warningRender = (warning: any) => {
    return (
      <WarningBox>
        <WarningTitle>{warning.title}</WarningTitle>
        <WarningText>{warning.message}</WarningText>
      </WarningBox>
    );
  };

  const checklistRender = (checklistItems: any) => {
    return (
      <CheckBoxList>
        {checklistItems.map((el: any, i: number) => (
          <CheckBoxItem key={i}>
            <CheckInput type="checkbox" checked={el.checked} readOnly />
            <CheckText>{el.text}</CheckText>
          </CheckBoxItem>
        ))}
      </CheckBoxList>
    );
  };

  const imagesRender = (images: any) => {
    if (images.length === 1) {
      return images[0].caption === "center" ? (
        <ArticleImage
          css={{ margin: "0 auto !important" }}
          src={images[0].url}
          alt="article image"
        />
      ) : (
        <ArticleImage
          css={{ float: images[0].caption }}
          src={images[0].url}
          alt="article image"
        />
      );
    }
    if (images.length >= 2) {
      return (
        <ImageBox>
          {images.map((el: any, i: number) => (
            <ArticleImage key={i} src={el.url} alt="article image" />
          ))}
        </ImageBox>
      );
    }
  };

  const selectHeederLevel = (size: number, text: string) => {
    switch (size) {
      case 1:
        return <CharacteristicTitle>{text}</CharacteristicTitle>;
      case 2:
        return <Subtitle>{text}</Subtitle>;
      case 3:
        return <H3>{text}</H3>;
      case 4:
        return <H4>{text}</H4>;
    }
  };

  const selectListStyle = (style: string, items: string[]) => {
    switch (style) {
      case "ordered":
        return (
          <>
            {items.map((el, i) => (
              <ListBox key={i}>
                <ListIcon src="/icons/list-item.svg" alt="list" />
                <CharacteristicList>{el}</CharacteristicList>
              </ListBox>
            ))}
          </>
        );
      case "unordered":
        return (
          <>
            {items.map((el, i) => (
              <ListBox key={i}>
                <ListIcon src="/icons/list-item.svg" alt="list" />
                <CharacteristicList>{el}</CharacteristicList>
              </ListBox>
            ))}
          </>
        );
    }
  };
  return (
    <>
      <SwiperContainer>
        <StyledSwiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.slider-button-prev`,
            nextEl: `.slider-button-next`,
          }}
          slidesPerView={1}
          spaceBetween={8}
          className="mySwiper"
        >
          {greenhouse.attributes.sliderImages.data.map((slide, i) => {
            return (
              <StyledSwiperSlide key={i}>
                <Image src={slide.attributes.url} alt="policarbon" />
              </StyledSwiperSlide>
            );
          })}
        </StyledSwiper>
        <Nav className={`slider-button-prev`} position="left"></Nav>
        <Nav className={`slider-button-next`} position="right"></Nav>
      </SwiperContainer>
      {richTextObj.obj[0].blocks.map((el: any, i: number) => (
        <React.Fragment key={i}>{checkType(el)}</React.Fragment>
      ))}
    </>
  );
};

const StyledSwiper = styled(Swiper, {});

const StyledSwiperSlide = styled(SwiperSlide, {
  margin: "0 auto",
  maxHeight: 500,
});

const Image = styled("img", {
  width: "100%",
  height: "100%",
  minHeight: 200,
  maxHeight: 200,
  objectFit: "cover",
  borderRadius: "0px 5px",
  "@xxs": {
    minHeight: 280,
    maxHeight: 280,
  },
  "@xs": {
    minHeight: 350,
    maxHeight: 350,
  },
  "@sm": {
    minHeight: 400,
    maxHeight: 400,
  },
  "@md": {
    minHeight: 450,
    maxHeight: 450,
    borderRadius: "0px 10px",
  },
  "@xl": {
    minHeight: 500,
    maxHeight: 500,
    borderRadius: "0px 10px",
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
          left: -100,
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
          right: -100,
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
  margin: "0 auto 10px",
  "@md": {
    margin: "10px auto 20px",
  },

  ".swiper-button-disabled": {
    opacity: 0.3,
  },
});

//styles for strapi richtext

const WarningBox = styled("div", {
  margin: "`0px 0",
  border: "1px solid $warning",
  borderRadius: "10px",
  padding: "10px",
});

const WarningTitle = styled("h3", {
  color: "$warning",
  margin: "0 0 20px",
});

const WarningText = styled("p", {
  margin: 0,
  color: "$warning",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
});

const CheckBoxList = styled("div", {
  margin: "10px 0",
});

const CheckBoxItem = styled("div", {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  "@md": {
    gap: 20,
  },
});

const CheckInput = styled("input", {
  width: 25,
  height: 25,
  margin: 0,
});

const CheckText = styled("p", {
  margin: "0 0 `0px",
});

const Quote = styled("div", {});

const QuoteText = styled("p", {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 10px",
});

const QuoteAuthor = styled("p", {
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 `0px",
  textAlign: "end",
});

const CharacteristicTitle = styled("h1", {
  fontWeight: "600",
  fontSize: "21px",
  lineHeight: "25px",
  margin: "0 0 10px",
});

const Subtitle = styled("h2", {
  fontWeight: "600",
  fontSize: "19px",
  lineHeight: "23px",
  margin: "0 0 10px",
});

const H3 = styled("h3", {
  fontWeight: "600",
  fontSize: "17px",
  lineHeight: "19px",
  margin: "0 0 10px",
});

const H4 = styled("h4", {
  fontWeight: "600",
  fontSize: "15px",
  lineHeight: "18px",
  margin: "0 0 10px",
});

const ListBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "0 0 10px",
  "@md": {
    gap: 20,
  },
});

const ListIcon = styled("img", {
  width: 25,
  height: 25,
});

const CharacteristicList = styled("li", {
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
  listStyle: "none",
  textAlign: "justify",
});

const CharacteristicText = styled("p", {
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 10px",
  textAlign: "justify",
});

const Delimiter = styled("p", {
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "24px",
  margin: "20px auto",
  textAlign: "center",
});

const Link = styled("a", {
  display: "block",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 10px",
  color: "$violet",
  cursor: "pointer",
});

const ArticleImage = styled("img", {
  width: "100%",
  objectFit: "cover",
  borderRadius: "20px",
  margin: "10px 0",
  "@sm": {
    margin: "10px 20px",
    width: "47.5%",
  },
});

const ImageBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,
  justifyContent: "space-evenly",
});
