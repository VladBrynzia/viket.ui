import * as React from "react";
import { graphql } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { HomePage } from "../features/HomePage/HomePage";

type Props = {
  pageContext: PageContext;
};

const IndexPage = ({ pageContext }: Props) => {
  return <HomePage pageContext={pageContext} />;
};

export default IndexPage;

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
