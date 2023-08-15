import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Products } from "../../features/Products/Products";

const ProductsPage = ({ pageContext }: PageProps) => {
  return <Products pageContext={pageContext} />;
};

export default ProductsPage;

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
