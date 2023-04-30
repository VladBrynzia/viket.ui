import * as React from "react";
import { graphql } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { Contact } from "../features/Contact/Contact";

type Props = {
  pageContext: PageContext;
};

const ContactPage = ({ pageContext }: Props) => {
  return <Contact pageContext={pageContext} />;
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
