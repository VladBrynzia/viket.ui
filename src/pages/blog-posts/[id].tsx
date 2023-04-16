import * as React from "react";
import { GetServerDataProps, graphql, PageProps } from "gatsby";
import { BlogPost } from "../../components/BlogPost/pages/BlogPost";
import { sendRequestToAPI } from "../../api/api";
import { Article } from "../../types/Article";

interface ContextParams {
  [key: string]: string;
}

export type ArticlePageData = {
  latestArticles: Article[];
  article: Article;
  slug: string;
};

const url = process.env.GATSBY_API_URL;

const ArticlePage: React.FC<PageProps> = ({ serverData }) => {
  const data = serverData as ArticlePageData;

  return <BlogPost serverData={data} />;
};

export default ArticlePage;

export async function getServerData(context: GetServerDataProps) {
  const { id } = context.params as ContextParams;

  const getData = async () => {
    try {
      const { data } = await sendRequestToAPI(
        `query($language: I18NLocaleCode, $filters: ArtFiltersInput)  {
            article: articles(locale: $language, filters: $filters) {
              meta {
                pagination {
                  pageCount 
                  pageSize
                  page
                }
              } 
              data {
                id
                attributes {
                  date
                  author
                  title
                  shortDescription
                  fullDescription
                  timeToReading
                  slug
                  keywords
                  SEO {
                    metaTitle
                    metaDescription
                    SharedImage {
                      alt
                      media {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                  authorImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  mainImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            latestArticles: articles(locale: $language, pagination: {limit: 3}, sort: "createdAt:desc") {
              data {
                id
                attributes {
                  date
                  author
                  title
                  shortDescription
                  timeToReading
                  slug
                  authorImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  mainImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
            `,
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

  const pageData: ArticlePageData = {
    article: data.article.data[0].attributes,
    latestArticles: data.latestArticles.data,
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
