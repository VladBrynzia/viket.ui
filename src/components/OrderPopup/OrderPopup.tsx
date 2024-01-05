import React, { useMemo } from "react";
import { Formik, Field, Form } from "formik";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { sendRequestToAPI } from "../../api/api";
import { CommonTextArea } from "../../ui/common/CommonTextArea";
import { styled } from "../../../stitches.config";
import { UniqueShopItem, useShopContext } from "../../context/ShopPopupContext";
import { useNoScroll } from "../../hooks/useNoScroll";
import { AccessoriesType } from "../../types/product";

type Values = {
  name: string;
  phone: string;
  message: string;
  token?: string;
};

type Props = {
  order: UniqueShopItem[];
  totalAmount: number;
};

const initialValues = {
  name: "",
  phone: "",
  message: "",
};

export const OrderPopup: React.FC<Props> = ({ order, totalAmount }) => {
  const { t } = useTranslation();
  const { toggleOrder, isOrderOpen, clearShop } = useShopContext();

  const orderToTextValue = useMemo(() => {
    let value = "";
    for (let item of order) {
      if (!!item.item.sheetOption.listSize) {
        value += `${item.item.name}(Толщина: ${item.item.sheetOption.thickness}мм, Размер листа: ${item.item.sheetOption.listSize}) - ${item.count}шт; `;
      } else if (
        item.item.sheetOption.accessoriesType === AccessoriesType.Meters
      ) {
        value += `${item.item.name}(Длинна: ${item.item.sheetOption.itemLength}мм) - ${item.count}шт; `;
      } else {
        value += `${item.item.name} - ${item.count}шт; `;
      }
    }

    value += `Сумма заказа: ${totalAmount} грн;`;
    return value;
  }, [order]);

  useNoScroll(isOrderOpen);
  const submitForm = async (data: Values, resetForm: () => void) => {
    const { name, phone, token } = data;

    // if (!token) {
    //   toast.error(t("contact.form.error.send"));
    //   return;
    // }

    const mutationVariables = {
      name,
      phone: String(phone),
      message: orderToTextValue,
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
        // {
        //   authorization: token,
        // }
      );
    } catch (err) {
      return err;
    }
    toast.success(
      "Заказ отправлен в обработку. Наш менеджер с Вами свяжется в ближайшее время!"
    );
    resetForm();
    clearShop();
    toggleOrder();
  };

  const validatePhone = (value: string) => {
    let error;
    if (!/^([+]?[0-9]{3,20})$/i.test(value)) {
      error = t("contact.form.error.phone");
    }
    return error;
  };

  const validateMessage = (value: string) => {
    let error;
    if (!value) {
      error = t("contact.form.error.emptyField");
    }
    return error;
  };

  return (
    <AbsoluteContainer onClick={toggleOrder}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ContentContainer>
          <Title>Заказать</Title>
          <ExitBox>
            <ExitImage src="/icons/exit.svg" alt="exit" onClick={toggleOrder} />
          </ExitBox>
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
                  {/* <TextareaBox>
                    <Field
                      required
                      component={CommonTextArea}
                      placeholder="Введите Ваше собщение"
                      name="message"
                      validate={!values.message && validateMessage}
                    />
                    {!!errors.message && (
                      <WarningTextarea>{errors.message}</WarningTextarea>
                    )}
                  </TextareaBox> */}
                  {/* {process.env.SITE_KEY_HCAPTCHA && (
                  <HCaptcha
                    sitekey={process.env.SITE_KEY_HCAPTCHA}
                    onVerify={(token: string) => setFieldValue("token", token)}
                    onError={() => setFieldValue("token", null)}
                    onExpire={() => setFieldValue("token", null)}
                  />
                )} */}
                  <Button onClick={() => submitForm}>Отправить заказ</Button>
                </StyledForm>
              );
            }}
          </Formik>
        </ContentContainer>
      </Container>
    </AbsoluteContainer>
  );
};

const AbsoluteContainer = styled("div", {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 101,
  background: "$popupAbsoluteBg",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Container = styled("div", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: 10,
  background: "$white",
  width: "fit-content",
  maxWidth: "800px",
  boxSizing: "border-box",
  "@md": {
    padding: "40px",
    borderRadius: 20,
  },
});

const ExitImage = styled("img", {
  width: "20px",
  cursor: "pointer",
  padding: 5,
  transition: "all 300ms ease",
  "&:hover": {
    transform: "rotate(90deg)",
  },
});

const ExitBox = styled("div", {
  position: "absolute",
  top: 20,
  right: 20,
  cursor: "pointer",
  width: 20,
  height: 20,
  "&>svg": {
    width: 30,
    height: 30,
    transition: "all 300ms ease",
  },
  "&>svg>path": {
    cursor: "pointer",
    fill: "$black",
  },
  "&:hover": {
    "&>svg": {
      transition: "all 300ms ease",
      fill: "$black",
      transform: "rotate(90deg)",
    },
  },
  "@md": {
    top: 40,
    right: 50,
  },
});

const ContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 30,
  margin: "0 auto",
  "@md": {
    width: "1280px",
    gap: 60,
  },
});

const Warning = styled("p", {
  position: "absolute",
  top: 60,
  left: 30,
  textAlign: "center",
  fontSize: "10px",
  margin: "0",
  color: "#ff2400",
});

const WarningTextarea = styled("p", {
  position: "absolute",
  width: "350px",
  top: 250,
  left: -55,
  textAlign: "center",
  fontSize: "10px",
  margin: "0",
  color: "#ff2400",
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 20,
  width: "100%",
  "@sm": {
    // flexDirection: "row",
  },
  "@md": {
    gap: 20,
    justifyContent: "space-between",
  },
});

const TextareaBox = styled("div", {
  position: "relative",
  width: "100%",
  "@sm": {
    padding: "0 20px",
  },
  "@md": {
    padding: 0,
  },
});

const Title = styled("h1", {
  fontWeight: "600",
  fontSize: "30px",
  lineHeight: "32px",
  textAlign: "center",
  margin: 0,
  "@md": {
    fontSize: "40px",
    lineHeight: "32px",
  },
});

const StyledField = styled(Field, {
  background: "$white",
  border: "1px solid #F6D9FF",
  borderRadius: "10px",
  padding: "20px 30px",
  width: "300px",
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
