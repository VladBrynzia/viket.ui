import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import { HomePage } from "../components/Home/pages/HomePage";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";

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
