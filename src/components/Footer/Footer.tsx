import React from "react";
import { styled } from "../../../stitches.config";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { SocialMedia } from "../../ui/common/SocialMedia/SocialMedia";
import { Formik, Field, Form } from "formik";
import { sendRequestToAPI } from "../../api/api";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  phone: "",
  message: "Клиент заполнил форму обратной связи и ожидает звонка!",
};

type Values = {
  name: string;
  phone: string;
};

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const submitForm = async (data: Values, resetForm: () => void) => {
    const { name, phone } = data;
    const mutationVariables = {
      name,
      phone: String(phone),
      message: "Клиент заполнил форму обратной связи и ожидает звонка!" ,
    };

    try {
      await sendRequestToAPI(
        `mutation ($data: ContactUsInput!) {
            createContactUs(data: $data) {
              data {
                id
              }
            }
          }`,
        {
          data: mutationVariables,
        }
      );
    } catch (err) {
      return err;
    }
    toast.success(
      "Запрос отправлен. Наш менеджер с Вами свяжется в ближайшее время!"
    );
    resetForm();
  };

  const validatePhone = (value: string) => {
    let error;
    if (!/^([+]?[0-9]{3,20})$/i.test(value)) {
      error = 'Телефон введен неверно!';
    }
    return error;
  };

  return (
    <Container>
      <FooterContentContainer>
        <ContentContainer>
          <Title>Форма обратной связи</Title>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              submitForm(values, resetForm);
            }}
          >
            {({ submitForm, values, errors, setFieldValue }) => {
              return (
                <StyledForm>
                  <Box>
                    <StyledField placeholder="Имя" name="name" required />
                    <RelativeDiv>
                      <StyledField
                        placeholder="Номер телефона"
                        name="phone"
                        type="number"
                        validate={values.phone && validatePhone}
                      />
                      {!!errors.phone && <Warning>{errors.phone}</Warning>}
                    </RelativeDiv>
                  </Box>
                  <Button onClick={() => submitForm}>Отправить запрос</Button>
                </StyledForm>
              );
            }}
          </Formik>
        </ContentContainer>
        <FooterBox>
          <Box>
            <Link to="/">
              <Image src="/icons/logo.svg" alt="logo" />
            </Link>
          </Box>
          <Box>
            <Title>Меню</Title>
            <LineImage src="/icons/footer-item.svg" alt="line" />
            <StyledLink to="/">{t("header.nav.main")}</StyledLink>
            <StyledLink to="/products">{t("header.nav.products")}</StyledLink>
            <StyledLink to="/solutions">{t("header.nav.solutions")}</StyledLink>
            <StyledLink to="/technical">{t("header.nav.technical")}</StyledLink>
            <StyledLink to="/contact-us">
              {t("header.nav.contactUs")}
            </StyledLink>
          </Box>
          <Box>
            <Title>Услуги</Title>
            <LineImage src="/icons/footer-item.svg" alt="line" />
            <StyledText>Порезка листов</StyledText>
            <StyledText>Доставка поликарбоната</StyledText>
            <StyledText>Монтаж поликарбоната </StyledText>
          </Box>
          <Box>
            <Title>Как с нами связаться</Title>
            <LineImage src="/icons/footer-item.svg" alt="line" />
            <SocialMedia />
            <InfoBox>
              <ExternalReference
                href="https://goo.gl/maps/utervsCrHdo6J4L36"
                target="_blank"
              >
                <Address>{t("header.nav.address")}</Address>
              </ExternalReference>
              <ExternalReference href="tel:+380674898218">
                <Phone>{t("header.nav.phone2")}</Phone>
              </ExternalReference>
              <ExternalReference href="tel:+380674850947">
                <Phone>{t("header.nav.phone")}</Phone>
              </ExternalReference>
            </InfoBox>
          </Box>
        </FooterBox>
      </FooterContentContainer>
      <CopyrightContentContainer>
        <CopyrightBox>
          <CopyrightName>{t("footer.info.copyrightName")}</CopyrightName>
          <CopyrightText>{t("footer.info.copyright")}</CopyrightText>
          <Empty></Empty>
        </CopyrightBox>
      </CopyrightContentContainer>
    </Container>
  );
};

const Warning = styled("p", {
  position: "absolute",
  top: 60,
  left: 30,
  textAlign: "center",
  fontSize: "10px",
  margin: "0",
  color: "#ff2400",
});

const ContentContainer = styled("div", {
  paddingTop: 40,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  margin: "0 auto",
  "@md": {
    width: "1280px",
    gap: 30,
  },
});

const StyledField = styled(Field, {
  background: "$white",
  border: "1px solid #F6D9FF",
  borderRadius: "10px",
  padding: "20px 30px",
  minWidth: "280px",
  fontSize: 13,
  "@md": {
    width: "525px",
  },
});

const Button = styled("button", {
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  gap: 8,
  background: "#FFA500",
  border: "none",
  borderRadius: "0px 5px",
  padding: "8px 18px",
  fontWeight: 700,
  fontSize: 10,
  lineHeight: "12px",
  color: "$white",
  margin: "auto 20px 0",
  "@md": {
    padding: "10px 60px",
    fontSize: 18,
    lineHeight: "21px",
    margin: "auto 0 0",
  },
});

const StyledForm = styled(Form, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 20,
});

const RelativeDiv = styled("div", {
  position: "relative",
});


const Container = styled("footer", {});

const ExternalReference = styled("a", {
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    "&>p": {
      color: "#FD7E08",
    },
  },
});

const InfoBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  "@md": {
    gap: 8,
  },
});

const Address = styled("p", {
  transition: "all 300ms ease",
  margin: 0,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "16px",
  marginBottom: "2px",
});

const Phone = styled("p", {
  transition: "all 300ms ease",
  margin: 0,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "16px",
});

const Empty = styled("div", {
  display: "none",
  "@md": {
    display: "block",
  },
});

const FooterContentContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 30,
  background: "rgba(0, 0, 255, 0.05)",
  margin: "0 auto",
});

const CopyrightContentContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 30,
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "1280px",
  "@md": {
    padding: "60px 20px",
  },
});

const FooterBox = styled("div", {
  maxWidth: "1280px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 30,
  padding: "30px 20px",
  boxSizing: "border-box",
  "@sm": {
    flexDirection: "row",
  },
  "@md": {
    width: "100%",
    margin: "0 auto",
    padding: "60px 20px",
  },
});

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const Title = styled("h2", {
  textTransform: "uppercase",
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "16px",
  margin: "12px 0 0",
  "@md": {
    fontSize: 18,
    lineHeight: "21px",
  },
});

const StyledText = styled("p", {
  margin: 0,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "170%",
  color: "$black",
  textDecoration: "none",
  width: "fit-content",
});

const StyledLink = styled(Link, {
  position: "relative",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "170%",
  color: "$black",
  textDecoration: "none",
  width: "fit-content",
  transition: "all 300ms ease",
  "&:hover": {
    color: "#FD7E08",
    "&:after": {
      content: "",
      position: "absolute",
      top: 20,
      left: 0,
      right: 0,
      height: 1,
      borderBottom: "1px solid #FD7E08",
    },
  },
});

const Image = styled("img", {
  width: "100px",
});

const LineImage = styled("img", {
  width: 25,
  height: 3,
  marginBottom: 10,
});

const CopyrightBox = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: 20,
});

const CopyrightText = styled("p", {
  margin: 0,
  color: "#171717",
  fontWeight: "300",
  textAlign: "center",
  fontSize: "8px",
  lineHeight: "130%",
  "@md": {
    fontSize: "15px",
    lineHeight: "130%",
  },
});

const CopyrightName = styled("p", {
  margin: 0,
  color: "#171717",
  fontWeight: "700",
  textAlign: "center",
  fontSize: "9px",
  lineHeight: "11px",
  "@md": {
    fontSize: "17px",
    lineHeight: "21px",
  },
});
