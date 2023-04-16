import React from "react";
import { styled } from "../../../stitches.config";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

export const LetsTalkButton = () => {
  const { t } = useTranslation();

  return <Button to="/contact">{t("home.button.letsTalk")}</Button>;
};

const Button = styled(Link, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: "$orange",
  padding: "12px 50px",
  border: "1px solid #FD7E08",
  color: "$white",
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "35px",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "all 300ms ease",
  width: "100%",
  "&:hover": {
    background: "$violet",
    border: "1px solid #9900CC",
  },
  "@md": {
    width: "340px",
  },
});
