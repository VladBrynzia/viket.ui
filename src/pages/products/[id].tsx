import * as React from "react";
import { graphql } from "gatsby";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { ProductInfo } from "../../features/Products/ProductInfo";

type Props = {
  pageContext: PageContext;
  location: Location;
};

const ProductPage = ({ pageContext, location }: Props) => {
  return <ProductInfo pageContext={pageContext} location={location} />;
};

export default ProductPage;

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
