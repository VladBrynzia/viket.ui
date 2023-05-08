import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Greenhouse } from "../features/Greenhouse/Greenhouse";

const GreenhousePage = ({ pageContext }: PageProps) => {
  return <Greenhouse pageContext={pageContext} />;
};

export default GreenhousePage;

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
