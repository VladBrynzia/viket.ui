import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React from "react";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import { styled } from "../../../stitches.config";
import { CertificateCard } from "./CertificateCard";

type Props = {
  pageContext: PageContext;
};

const certificates = [
  {
    name: "Название сертификата",
    file: "",
  },
  {
    name: "Название сертификата",
    file: "",
  },
  {
    name: "Название сертификата",
    file: "",
  },
  {
    name: "Название сертификата",
    file: "",
  },
  {
    name: "Название сертификата",
    file: "",
  },
];

export const Certificate: React.FC<Props> = ({ pageContext }) => {
  return (
    <>
      <Breadcrumb
        way={[
          { link: "/technical", text: "Технический раздел" },
          { link: "/technical/certificate", text: "Сертификаты" },
        ]}
      />
      <Container>
        <Title>Сертификаты</Title>
        <Content>
          {certificates.map((el) => (
            <CertificateCard certificate={el} />
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
