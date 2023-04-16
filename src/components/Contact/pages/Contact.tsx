import React, { useState } from "react";
import { styled } from "../../../../stitches.config";
import { NavigationPath } from "../../../ui/common/NavigationPath";
import { FormSection } from "../components/FormSection";
import { MapSection } from "../components/MapSection";
import { PrivacyPolicyPopup } from "../modal/PrivacyPolicyPopup";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { PageHead } from "../../../ui/common/PageHead";

export const Contact: React.FC = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <PageHead title={t("contact.contactUs")}>
        <meta
          name="keywords"
          content="vander.consulting, consulting, contact"
        />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="vander.consulting contact" />
        <meta property="twitter:title" content="vander.consulting contact" />

        <meta name="description" content="vander.consulting contact" />
        <meta property="og:description" content="vander.consulting contact" />
        <meta
          property="twitter:description"
          content="vander.consulting contact"
        />

        <meta property="og:site_name" content="vander.consulting" />
        <meta name="twitter:card" content="summary_large_image" />
      </PageHead>
      <Nav></Nav>
      <Container>
        <NavigationPath name={t("header.nav.contact")} />
        <FormSection openModal={() => setIsPolicyOpen(true)} />
      </Container>
      <MapSection />
      {isPolicyOpen && (
        <PrivacyPolicyPopup
          onClose={() => setIsPolicyOpen(false)}
          isPolicyOpen={isPolicyOpen}
        />
      )}
    </>
  );
};

const Container = styled("div", {
  background: "url(/images/contact-bg.svg) no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  height: "100%",
});

const Nav = styled("div", {
  display: "none",
  "@xs": {
    display: "block",
    background: "$navBackgroundViolet",
    width: "100%",
    height: "96px",
  },
  "@md": {
    height: "147px",
  },
});
