import React from "react";
import { styled } from "../../../stitches.config";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

type Props = {
  name: string;
};

export const NavigationPath: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Text to="/">{t("home.home")}</Text>
      <p> &gt; </p>
      <Text to={`/${name}`}>{name}</Text>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  margin: "0 auto 20px",
  paddingTop: '20px',
  gap: 10,
  width: "90%",
  "@md": {
    width: "1240px",
    margin: "0 auto 30px",
    paddingTop: '30px',
  },
});

const Text = styled(Link, {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "30px",
  textTransform: "capitalize",
  color: '$black',
});
