import React from "react";
import { styled } from "../../../stitches.config";

export const MapSection = () => {
  return (
    <Container id="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31075.45810463581!2d30.661671701945426!3d46.49408629229174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c62e0eff7636cf%3A0xa8edd3c9c035a0e6!2sSyvas&#39;kyi%20Ln%2C%205%2C%20Odesa%2C%20Odes&#39;ka%20oblast%2C%2065000!5e0!3m2!1sen!2sua!4v1682511893541!5m2!1sen!2sua"
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
