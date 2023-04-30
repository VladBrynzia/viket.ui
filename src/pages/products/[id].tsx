import * as React from "react";
import { GetServerDataProps, graphql, PageProps } from "gatsby";
import { sendRequestToAPI } from "../../api/api";
import { ProductInfoType } from "../../types/product";
import { ProductInfo } from "../../features/Products/ProductInfo";

interface ContextParams {
  [key: string]: string;
}

export type ProductPageData = {
  product: ProductInfoType;
  slug: string;
};

const url = process.env.GATSBY_API_URL;

const ArticlePage: React.FC<PageProps> = ({ serverData }) => {
  const data = serverData as ProductPageData;

  return <ProductInfo serverData={data} />;
};

export default ArticlePage;

export async function getServerData(context: GetServerDataProps) {
  const { id } = context.params as ContextParams;

  const getData = async () => {
    try {
      const { data } = await sendRequestToAPI(
        `query($language: I18NLocaleCode, $filters: ProductFiltersInput)  {
          product: products(locale: $language, filters: $filters) {
          data {
            id
            attributes {
              name
              description
              haveInStock
              thickness
              color
              mainImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              slug
              images {
                data {
                  attributes {
                    url
                  }
                }
              }
              sheetOption {
                pricePerMeter
                totalPrice
                listSize
              }
            }
          }
        }
      }`,
        {
          language: context.pageContext.language,
          filters: { slug: { eq: id } },
        },
        {},
        url
      );

      return data;
    } catch (err) {
      return err;
    }
  };

  const { data } = await getData();

  const pageData: ProductPageData = {
    product: data.product.data[0].attributes,
    slug: id,
  };

  return {
    props: { ...pageData },
  };
}

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
