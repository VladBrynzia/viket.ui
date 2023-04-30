import * as React from "react";
import { graphql } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { Certificate } from "../../features/Technical/Certificate";

type Props = {
  pageContext: PageContext;
};

const CertificatePage = ({ pageContext }: Props) => {
  return <Certificate pageContext={pageContext} />;
};

export default CertificatePage;

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
