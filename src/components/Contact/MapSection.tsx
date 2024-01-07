import React from "react";
import { styled } from "../../../stitches.config";

export const MapSection = () => {
  return (
    <Container id="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d36962.44660528665!2d30.665522606396518!3d46.48335636694962!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c62e0effdbd791%3A0x5ac5bd051d8e42cd!2z0J7QntCeICLQndC-0LLRi9C5INCf0L7QtNC00L7QvSI!5e0!3m2!1suk!2sua!4v1704652327435!5m2!1suk!2sua"
        width="100%"
        height="100%"
        loading="lazy"
        frameBorder={0}
      ></iframe>
    </Container>
  );
};

const Container = styled("div", {
  height: "600px",
  boxSizing: "border-box",
  width: "100%",
  marginTop: 20,
  "@md": {
    marginTop: 40,
  },
});
