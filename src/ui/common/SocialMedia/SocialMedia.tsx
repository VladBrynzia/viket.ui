import React from "react";
import { styled } from "../../../../stitches.config";
import { Link } from "gatsby-plugin-react-i18next";

export const SocialMedia = () => {
  return (
    <Container>
      <a href="viber://chat?number=%2B380674850947" target="_blank">
        <Image src="/icons/viber.svg" alt="viber" />
      </a>
      <a href="https://wa.me/+380674850947" target="_blank">
        <Image src="/icons/whats-app.svg" alt="whats-app" />
      </a>
      <a href="https://t.me/+380674850947" target="_blank">
        <Image src="/icons/telegram.svg" alt="telegram" />
      </a>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  gap: 20,
  "@md": {
    gap: 30,
  },
});

const Image = styled("img", {
  width: 28,
  height: 28,
  "@md": {
    width: 35,
    height: 35,
  },
});
