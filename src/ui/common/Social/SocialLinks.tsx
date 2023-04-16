import React from "react";
import { styled } from "../../../../stitches.config";

export const SocialLinks: React.FC = () => {
  return (
    <SocialBox>
      <SocialImageBox
        href="https://www.instagram.com/vander.consulting/"
        target="_blank"
      >
        <SocialImage src="/icons/instagram.svg" alt="instagram" />
      </SocialImageBox>
      <SocialImageBox
        href="https://www.facebook.com/vander.consulting/"
        target="_blank"
      >
        <SocialImage src="/icons/facebook.svg" alt="facebook" />
      </SocialImageBox>
      <SocialImageBox
        href="https://www.linkedin.com/company/vanderconsulting/"
        target="_blank"
      >
        <SocialImage src="/icons/linkedin.svg" alt="linkedin" />
      </SocialImageBox>

      <SocialImageBox href="https://twitter.com/vander_cons" target="_blank">
        <SocialImage src="/icons/twitter.png" alt="twitter" />
      </SocialImageBox>
      <SocialImageBox href="https://vero.co/vander_consulting" target="_blank">
        <SocialImage src="/icons/vero.png" alt="vero" />
      </SocialImageBox>
    </SocialBox>
  );
};

const SocialImage = styled("img", {
  height: "20px",
  cursor: "pointer",
});

const SocialBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  "@xs": {
    justifyContent: "flex-start",
  },
});

const SocialImageBox = styled("a", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #fff",
  borderRadius: "100%",
  height: "40px",
  width: "40px",
  cursor: "pointer",
});
