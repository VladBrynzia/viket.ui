import * as React from "react";
import { graphql } from "gatsby";
import { ThankYou } from "../../components/ThankYou/ThankYou";

const ContactPage = () => {
  return <ThankYou />;
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
