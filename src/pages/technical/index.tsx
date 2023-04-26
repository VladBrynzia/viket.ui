import * as React from "react";
import { graphql } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { Technical } from "../../features/Technical/Technical";

type Props = {
  pageContext: PageContext;
};

const IndexPage = ({ pageContext }: Props) => {
  return <Technical pageContext={pageContext} />;
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
