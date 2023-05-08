import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import { styled } from "../../../stitches.config";
import { CertificateCard } from "./CertificateCard";
import { sendRequestToAPI } from "../../api/api";
import { CertificateType } from "../../types/certificate";

type Props = {
  pageContext: PageContext;
};

export const Certificate: React.FC<Props> = ({ pageContext }) => {
  const [certificates, setCertificates] = useState<CertificateType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await sendRequestToAPI(
          `query($language: I18NLocaleCode)  {
            certificates(locale: $language) {
              data	{ 
                attributes{
                  name
                  file {
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
        setCertificates(data.data.certificates.data);
      } catch (err) {
        return err;
      }
    };
    getData();
  }, []);

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
            <CertificateCard
              file={el.attributes.file}
              name={el.attributes.name}
            />
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
