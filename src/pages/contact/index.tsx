import * as React from "react";
import { graphql } from "gatsby";
import { Contact } from "../../components/Contact/pages/Contact";

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
