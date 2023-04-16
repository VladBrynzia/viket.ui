import React, { useMemo } from "react";
import { styled } from "../../../../stitches.config";
import { Formik, Field, Form } from "formik";
import { CommonTextArea } from "../../../ui/common/CommonTextArea";
import { sendRequestToAPI } from "../../../api/api";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { SelectOption } from "../../../types/SelectOption";
import { CommonSelect } from "../../../ui/common/CommonSelect";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { navigate } from "gatsby";

type Values = {
  fullName: string;
  iAm?: string;
  communicationStyle?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  companyName?: string;
  businessId?: string;
  taxId?: string;
  vat?: string;
  token?: string;
};

const communicationStyleOptions: SelectOption[] = [
  { value: "Old friends", label: "contact.form.style1", type: "string" },
  { value: "Formal", label: "contact.form.style2", type: "string" },
  { value: "Aristocratic", label: "contact.form.style3", type: "string" },
];

const iAmOptions: SelectOption[] = [
  { value: "Individual Person", label: "contact.form.iAm1", type: "string" },
  { value: "Sole Proprietorship", label: "contact.form.iAm2", type: "string" },
  {
    value: "For Profit Organization",
    label: "contact.form.iAm3",
    type: "string",
  },
  {
    value: "Not for Profit Organization",
    label: "contact.form.iAm4",
    type: "string",
  },
  {
    value: "Government Organization / Municipality",
    label: "contact.form.iAm5",
    type: "string",
  },
  { value: "Different", label: "contact.form.iAm6", type: "string" },
];

type Props = {
  openModal: () => void;
};

const initialValues = {
  fullName: "",
  iAm: "",
  communicationStyle: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  companyName: "",
  businessId: "",
  taxId: "",
  vat: "",
};

export const FormSection: React.FC<Props> = ({ openModal }) => {
  const [email, setEmail] = useLocalStorage<string>("userEmail", "");
  const [_, setClientFullName] = useLocalStorage<string>("clientFullName", "");
  const { t } = useTranslation();
  const { language } = useI18next();

  const submitForm = async (data: Values, resetForm: () => void) => {
    const {
      fullName,
      iAm,
      communicationStyle,
      email,
      phone,
      subject,
      message,
      companyName,
      businessId,
      taxId,
      vat,
      token,
    } = data;

    setClientFullName(fullName);

    let businessIdEmpty = data.businessId;
    let taxIdEmpty = data.taxId;
    let vatEmpty = data.vat;

    if (!token) {
      toast.error(t("contact.form.error.send"));
      return;
    }

    if (!businessId) {
      businessIdEmpty = "NA";
    }
    if (!taxId) {
      taxIdEmpty = "NA";
    }
    if (!vat) {
      vatEmpty = "NA";
    }

    const mutationVariables = {
      fullName,
      iAm,
      communicationStyle,
      email,
      phone: String(phone),
      subject,
      message,
      companyName,
      businessId: businessIdEmpty,
      taxId: taxIdEmpty,
      vat: vatEmpty,
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
        },
        {
          authorization: token,
        }
      );
      setEmail("");
    } catch (err) {
      return err;
    }
    toast.success(t("contact.form.success.send"), {
      duration: 5000,
    });
    if (language === "en") {
      navigate(`/contact/thank-you`);
    } else {
      navigate(`/${language}/contact/thank-you`);
    }
    resetForm();
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

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = t("contact.form.error.email");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = t("contact.form.error.emailExample");
    }
    return error;
  };

  const translatedCommunicationStyleOptions: SelectOption[] = useMemo(() => {
    return communicationStyleOptions.map((el) => {
      return { ...el, label: t(el.label) };
    });
  }, []);

  const translatedIAmOptions: SelectOption[] = useMemo(() => {
    return iAmOptions.map((el) => {
      return { ...el, label: t(el.label) };
    });
  }, []);

  return (
    <Container>
      <ContentContainer>
        <Title>{t("contact.contactUs")}</Title>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            submitForm(values, resetForm);
          }}
        >
          {({ submitForm, values, errors, setFieldValue }) => {
            const isBusinessFieldVisible =
              values.iAm === "" ||
              values.iAm === "Individual Person" ||
              values.iAm === "Different";

            return (
              <StyledForm>
                <Box>
                  <StyledField
                    options={translatedCommunicationStyleOptions}
                    component={CommonSelect}
                    placeholder={t("contact.form.preferred")}
                    name="communicationStyle"
                    onSelect={(value: string) => {
                      setFieldValue("communicationStyle", value);
                    }}
                  />
                  <StyledField
                    options={translatedIAmOptions}
                    component={CommonSelect}
                    placeholder={t("contact.form.iAm")}
                    name="iAm"
                    onSelect={(value: string) => {
                      setFieldValue("iAm", value);
                    }}
                  />
                  <StyledField
                    placeholder={t("contact.form.firstName")}
                    name="fullName"
                    required
                  />
                  {!isBusinessFieldVisible && (
                    <StyledBusinessField
                      placeholder={t("contact.form.companyName")}
                      name="companyName"
                    />
                  )}
                  <RelativeDiv>
                    <StyledField
                      placeholder={t("contact.form.email")}
                      name="email"
                      type="email"
                      required
                      value={email ? email : values.email}
                      validate={values.email && validateEmail}
                    />
                    {!!errors.email && <Warning>{errors.email}</Warning>}
                  </RelativeDiv>
                  {!isBusinessFieldVisible && (
                    <StyledBusinessField
                      placeholder={t("contact.form.businessId")}
                      name="businessId"
                    />
                  )}
                  <RelativeDiv>
                    <StyledField
                      placeholder={t("contact.form.phone")}
                      name="phone"
                      type="number"
                      validate={values.phone && validatePhone}
                    />
                    {!!errors.phone && <Warning>{errors.phone}</Warning>}
                  </RelativeDiv>
                  {!isBusinessFieldVisible && (
                    <StyledBusinessField
                      placeholder={t("contact.form.taxId")}
                      name="taxId"
                    />
                  )}
                  <StyledField
                    placeholder={t("contact.form.subject")}
                    name="subject"
                    required
                    validate={values.subject && validateMessage}
                  />
                  {!isBusinessFieldVisible && (
                    <StyledBusinessField
                      placeholder={t("contact.form.vat")}
                      name="vat"
                    />
                  )}
                </Box>
                <TextareaBox>
                  <Field
                    required
                    component={CommonTextArea}
                    placeholder={t("contact.form.message")}
                    name="message"
                    validate={!values.message && validateMessage}
                  />
                  {!!errors.message && (
                    <WarningTextarea>{errors.message}</WarningTextarea>
                  )}
                </TextareaBox>
                <InputBox>
                  <Label htmlFor="check1">
                    <Input id="check1" type="checkbox" required />
                    <InputText>
                      {t("contact.submitting")}
                      <InputTextPrimary onClick={openModal}>
                        {t("contact.personal")}
                      </InputTextPrimary>
                    </InputText>
                  </Label>
                </InputBox>
                {process.env.SITE_KEY_HCAPTCHA && (
                  <HCaptcha
                    sitekey={process.env.SITE_KEY_HCAPTCHA}
                    onVerify={(token: string) => setFieldValue("token", token)}
                    onError={() => setFieldValue("token", null)}
                    onExpire={() => setFieldValue("token", null)}
                  />
                )}
                <Button onClick={() => submitForm}>
                  {t("contact.button.talk")}
                </Button>
              </StyledForm>
            );
          }}
        </Formik>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "30px 0 0",
  paddingBottom: "60px",
});

const ContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 30,
  margin: "0 auto",
  "@md": {
    width: "1240px",
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
  flexWrap: "wrap",
  gap: 20,
  width: "100%",
  "@sm": {
    flexDirection: "row",
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
  width: "320px",
  fontSize: 13,
  "@md": {
    width: "600px",
  },
});

const StyledBusinessField = styled(Field, {
  background: "#ede1f7",
  border: "1px solid #d25cfa",
  borderRadius: "10px",
  padding: "20px 30px",
  width: "320px",
  fontSize: 13,
  "@md": {
    width: "600px",
  },
});

const InputBox = styled("div", {
  width: "320px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "20px",
  gap: 20,
  cursor: "pointer",
  "@xs": {
    width: "100%",
  },
});

const Label = styled("label", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
  "@xs": {
    width: "100%",
  },
  "@md": {
    justifyContent: "flex-start",
  },
});

const Input = styled("input", {
  width: "30px",
  height: "30px",
  border: "1px solid #F6D9FF",
  borderRadius: "10px",
  cursor: "pointer",
  "@md": {
    width: "25px",
    height: "25px",
  },
});

const InputText = styled("p", {
  display: "inline",
  color: "$black",
  margin: 0,
  fontSize: 13,
  lineHeight: "124%",
  "@md": {
    fontSize: 17,
  },
});

const InputTextPrimary = styled("span", {
  color: "$violet",
  fontWeight: "600",
  textDecoration: "underline",
  cursor: "pointer",
  margin: 0,
  fontSize: 15,
  lineHeight: "124%",
  "@md": {
    fontSize: 17,
  },
});

const Button = styled("button", {
  background: "$orange",
  padding: "12px 80px",
  border: "1px solid #FD7E08",
  color: "$white",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "35px",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "all 300ms ease",
  width: "90%",
  maxWidth: 400,
  "&:hover": {
    background: "$violet",
    border: "1px solid #9900CC",
  },
  "@md": {
    fontSize: "18px",
    width: "380px",
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
