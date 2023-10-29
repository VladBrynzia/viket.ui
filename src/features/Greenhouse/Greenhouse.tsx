import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import { sendRequestToAPI } from "../../api/api";
import { GreenhouseType } from "../../types/greenhouse";
import { addTargetBlank } from "../Products/FullProductInfo";
import { ParseGreenhouse } from "./ParseGreenhouse";
import { Helmet } from "react-helmet";

type Props = {
  pageContext: Partial<PageContext>;
};

export const Greenhouse: React.FC<Props> = ({ pageContext }) => {
  const [greenhouses, setGreenhouses] = useState<GreenhouseType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await sendRequestToAPI(
          `query($language: I18NLocaleCode)  {
            greenhouses(locale: $language) {
              data	{ 
                attributes{
                description
                  sliderImages {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }`,
          {
            language: pageContext.language,
          }
        );
        setGreenhouses(data.data.greenhouses.data);
      } catch (err) {
        return err;
      }
    };
    getData();
  }, []);

  const title = "Теплицы из поликарбоната";
  const description =
    "Теплиці под ключ из сотового, монолитного и профилированого поликарбоната";

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
      <Breadcrumb
        way={[
          { link: "/technical", text: "Технический раздел" },
          { link: "/technical/greenhouse", text: "Теплицы" },
        ]}
      />
      <Container>
        <Title>Теплицы</Title>
        <Content>
          {greenhouses.map((el, i) => (
            <React.Fragment key={i}>
              <ParseGreenhouse greenhouse={el} />
            </React.Fragment>
          ))}
        </Content>
      </Container>
    </>
  );
};

const Container = styled("section", {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  "@md": {
    gap: 30,
  },
});

const Content = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  gap: 20,
});

const Title = styled("h2", {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 18,
  lineHeight: "21px",
  color: "#171717",
  margin: "0 0 10px",
  "@md": {
    margin: "0 0 20px",
    fontSize: 24,
    lineHeight: "27px",
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
