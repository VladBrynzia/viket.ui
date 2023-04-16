import React from "react";
import { styled } from "../../../../stitches.config";
import { useNoScroll } from "../../../hooks/useNoScroll";
import { Exit } from "../../../ui/common/Exit";
import { useTranslation } from "gatsby-plugin-react-i18next";

type Props = {
  onClose: () => void;
  isPolicyOpen: boolean;
};

export const PrivacyPolicyPopup: React.FC<Props> = ({
  isPolicyOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  useNoScroll(isPolicyOpen);

  return (
    <AbsoluteContainer onClick={onClose}>
      <Container onClick={(event) => event.stopPropagation()}>
        <Box>
          <ExitBox onClick={onClose}>
            <Exit />
          </ExitBox>
        </Box>
        <Title>{t("contact.privacy.policy.title")}</Title>
        <Text>{t("contact.privacy.policy.main")}</Text>
        <Subtitle>{t("contact.privacy.policy.h1")}</Subtitle>
        <Text>{t("contact.privacy.policy.p1")}</Text>
        <Text>{t("contact.privacy.policy.p2")}</Text>
        <Subtitle>{t("contact.privacy.policy.h2")}</Subtitle>
        <Text>{t("contact.privacy.policy.p3")}</Text>
        <Subtitle>{t("contact.privacy.policy.h3")}</Subtitle>
        <Text>{t("contact.privacy.policy.p4")}</Text>
        <Text>{t("contact.privacy.policy.p5")}</Text>
        <Text>{t("contact.privacy.policy.p6")}</Text>
        <Subtitle>{t("contact.privacy.policy.h4")}</Subtitle>
        <Text>{t("contact.privacy.policy.p7")}</Text>
        <Text>{t("contact.privacy.policy.p8")}</Text>
        <Subtitle>{t("contact.privacy.policy.h5")}</Subtitle>
        <Text>{t("contact.privacy.policy.p9")}</Text>
        <Subtitle>{t("contact.privacy.policy.h6")}</Subtitle>
        <Text>{t("contact.privacy.policy.p10")}</Text>
        <Subtitle>{t("contact.privacy.policy.h7")}</Subtitle>
        <Text>{t("contact.privacy.policy.p11")}</Text>
        <Subtitle>{t("contact.privacy.policy.h8")}</Subtitle>
        <Text>{t("contact.privacy.policy.p12")}</Text>
        <Text>{t("contact.privacy.policy.p13")}</Text>
        <ul>
          <Text>{t("contact.privacy.policy.list.p1")}</Text>
          <Text>{t("contact.privacy.policy.list.p2")}</Text>
          <Text>{t("contact.privacy.policy.list.p3")}</Text>
          <Text>{t("contact.privacy.policy.list.p4")}</Text>
        </ul>
        <Text>{t("contact.privacy.policy.p14")}</Text>
        <Subtitle>{t("contact.privacy.policy.h9")}</Subtitle>
        <Text>{t("contact.privacy.policy.p15")}</Text>
        <Text>{t("contact.privacy.policy.p16")}</Text>
        <Subtitle>{t("contact.privacy.policy.h10")}</Subtitle>
        <Text>{t("contact.privacy.policy.p17")}</Text>
        <Subtitle>{t("contact.privacy.policy.h11")}</Subtitle>
        <Text>{t("contact.privacy.policy.p18")}</Text>
        <Subtitle>{t("contact.privacy.policy.h12")}</Subtitle>
        <Text>{t("contact.privacy.policy.p19")}</Text>
        <ul>
          <Text>{t("contact.privacy.policy.ol.p1")}</Text>
          <Text>{t("contact.privacy.policy.ol.p2")}</Text>
          <Text>{t("contact.privacy.policy.ol.p3")}</Text>
          <Text>{t("contact.privacy.policy.ol.p4")}</Text>
          <Text>{t("contact.privacy.policy.ol.p5")}</Text>
          <Text>{t("contact.privacy.policy.ol.p6")}</Text>
        </ul>
        <Text>{t("contact.privacy.policy.p20")}</Text>
        <Text>{t("contact.privacy.policy.p21")}</Text>
        <Text>{t("contact.privacy.policy.p22")}</Text>
      </Container>
    </AbsoluteContainer>
  );
};

const AbsoluteContainer = styled("div", {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: "$popupAbsoluteBg",
});

const Container = styled("div", {
  width: "90%",
  height: "fix-content",
  minHeight: "50vh",
  maxHeight: "80vh",
  backgroundColor: "$white",
  borderRadius: "4px",
  padding: "20px",
  zIndex: "10",
  overflow: "auto",
  "@xs": {
    width: "70%",
  },
  "@md": {
    width: "50%",
  },
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  transition: "all 300ms ease",
});

const ExitBox = styled("div", {
  width: "40px",
  padding: 10,
  cursor: "pointer",
  "&>svg": {
    width: 25,
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
});

const Title = styled("h1", {
  display: "flex",
  alignItems: "center",
  fontWeight: "600",
  fontSize: "26px",
  lineHeight: "30px",
  margin: "20px 0",
});

const Subtitle = styled("h2", {
  display: "flex",
  alignItems: "center",
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "28px",
  margin: "20px 0",
});

const Text = styled("p", {
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "32px",
});
