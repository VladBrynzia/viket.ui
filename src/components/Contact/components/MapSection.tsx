import { useI18next } from "gatsby-plugin-react-i18next";
import React from "react";
import { styled } from "../../../../stitches.config";

export const MapSection = () => {
  const { language } = useI18next();
  return (
    <Container id="map">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d33432.281586229874!2d21.24195894776133!3d48.712617030362814!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd092b02769f54c93!2sMonopol%20space!5e0!3m2!1s${language}!2sua!4v1664530225994!5m2!1s${language}!2sua`}
        width="100%"
        height="100%"
        loading="lazy"
      ></iframe>
    </Container>
  );
};

const Container = styled("div", {
  height: "600px",
  width: "100%",
});
