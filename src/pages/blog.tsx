import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Blog } from "../components/Blog/pages/Blog";

const BlogPage = ({ pageContext }: PageProps) => {
  return <Blog pageContext={pageContext} />;
};

export default BlogPage;

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
