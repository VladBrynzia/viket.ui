import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React from "react";
import { styled } from "../../../stitches.config";
import { MapSection } from "../../components/Contact/MapSection";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import { Helmet } from "react-helmet";

type Props = {
  pageContext: PageContext;
};

export const Contact: React.FC<Props> = ({ pageContext }) => {
  const title = "Контакты";
  const description = "Контакты для обратной связи. Будем рады Вам помочь!";

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
      <Breadcrumb way={[{ link: "/contact-us", text: "Контакты" }]} />
      <Container>
        <Title>Наши контактные данные</Title>
        <Content>
          <Subtitle>Адрес</Subtitle>
          <Text href="https://goo.gl/maps/utervsCrHdo6J4L36" target="_blank">
            Переулок Чапаева 5, г. Одесса
          </Text>
        </Content>
        <Content>
          <Subtitle>Телефон</Subtitle>
          <Box>
            <Image src="/icons/viber.svg" alt="viber" />
            <Text href="viber://chat?number=%2B380674850947" target="_blank">
              380 (67) 485 09 47
            </Text>
            <Text href="viber://chat?number=%2B380674898218" target="_blank">
              380 (67) 489 82 18
            </Text>
          </Box>
          <Box>
            <Image src="/icons/whats-app.svg" alt="whats-app" />
            <Text href="https://wa.me/+380674850947" target="_blank">
              380 (67) 485 09 47
            </Text>
            <Text href="https://wa.me/+380674898218" target="_blank">
              380 (67) 489 82 18
            </Text>
          </Box>
          <Box>
            <Image src="/icons/telegram.svg" alt="telegram" />
            <Text href="https://t.me/+380674850947" target="_blank">
              380 (67) 485 09 47
            </Text>
            <Text href="https://t.me/+380674898218" target="_blank">
              380 (67) 489 82 18
            </Text>
          </Box>
          <Box>
            <InstaImage src="/icons/instagram.svg" alt="instagram" />
            <Text
              href="https://www.instagram.com/policarbonat_viket/?igsh=dDgxNTc1d3Vta3Fn"
              target="_blank"
            >
              policarbonat_viket
            </Text>
          </Box>
        </Content>
        <Content>
          <Subtitle>Mail</Subtitle>
          <Text href="mailto:viket_r14@ukr.net">viket_r14@ukr.net</Text>
        </Content>
      </Container>
      <MapSection />
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
  justifyContent: "center",
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

const Subtitle = styled("h3", {
  margin: "0",
  fontWeight: 600,
  fontSize: 14,
  lineHeight: "18px",
  color: "#171717",
  "@md": {
    fontSize: 22,
    lineHeight: "25px",
  },
});

const Image = styled("img", {
  width: 28,
  height: 28,
  "@md": {
    width: 35,
    height: 35,
  },
});

const InstaImage = styled("img", {
  width: 29,
  height: 29,
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,
});

const Text = styled("a", {
  textDecoration: "none",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "15px",
  color: "#171717",
  margin: "0",
  "@md": {
    margin: "0",
    fontSize: 20,
    lineHeight: "23px",
  },
});
