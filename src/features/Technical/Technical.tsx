import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React from "react";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import { styled } from "../../../stitches.config";
import { Link } from "gatsby-plugin-react-i18next";
import { Helmet } from "react-helmet";

type Props = {
  pageContext: PageContext;
};

export const Technical: React.FC<Props> = ({ pageContext }) => {
  const title = "Технический раздел";
  const description =
    "ТТехническая документация по установке всех типов поликарбоната";

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
      <LinkBox>
        <Breadcrumb
          way={[{ link: "/technical", text: "Технический раздел" }]}
        />
        <Flex>
          <StyledLink to="/technical/certificate">Сертификаты</StyledLink>
          <StyledLink to="/technical/greenhouse">Теплицы</StyledLink>
        </Flex>
      </LinkBox>
      <Container>
        <Title>Руководство по монтажу</Title>
        <DownloadContainer>
          <DownloadButton
            href="https://drive.google.com/file/d/1-Ez4kEAYRV9TI0EE2w6ooUlAlYxrGyqK/view?usp=drive_link"
            target="_blank"
          >
            Руководство по применению и установке сотового поликарбоната
          </DownloadButton>
          <DownloadButton
            href="https://drive.google.com/file/d/17c8wFvOUkz3IgmNWNTZAGQePkM22B3gr/view?usp=drive_link"
            target="_blank"
          >
            Руководство по применению и установке монолитного поликарбоната
          </DownloadButton>
        </DownloadContainer>
        <Box>
          <Image src="/images/tech-2.png" alt="tech" />
        </Box>
        <BoxReverse>
          <Image src="/images/tech-3.png" alt="tech" />
        </BoxReverse>
        <Box>
          <Image src="/images/tech-1.png" alt="tech" />
        </Box>
      </Container>
    </>
  );
};

const Flex = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  "@md": {
    flexDirection: "row",
  },
});

const DownloadContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  gap: 20,
  flexDirection: "column",
  "@md": {
    flexDirection: "row",
  },
});

const DownloadButton = styled("a", {
  border: "none",
  maxWidth: 280,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "14px",
  color: "#171717",
  cursor: "pointer",
});

const Container = styled("section", {
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 35,
  maxWidth: 1280,
  margin: "0 auto",
  "@md": {
    padding: "30px 20px 100px",
  },
});

const Title = styled("h2", {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 18,
  lineHeight: "21px",
  color: "#171717",
  margin: "0",
  "@md": {
    fontSize: 24,
    lineHeight: "28px",
  },
});

const LinkBox = styled("div", {
  maxWidth: 1280,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "@md": {
    flexDirection: "row",
  },
  "&>div": {
    margin: "0",
    "@md": {
      padding: "70px 20px 10px 0",
    },
  },
});

const StyledLink = styled(Link, {
  fontWeight: 500,
  fontSize: 11,
  lineHeight: "16px",
  color: "#171717",
  padding: "15px",
  "@md": {
    fontSize: 14,
    lineHeight: "18px",
    padding: "70px 20px 10px",
  },
});

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 30,
  "@md": {
    flexDirection: "row",
    gap: 60,
  },
});

const BoxReverse = styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  gap: 30,
  "@md": {
    flexDirection: "row",
    gap: 60,
  },
});

const Image = styled("img", {
  width: "100%",
  maxWidth: 1000,
  borderRadius: 5,
  margin: "0 auto",
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
