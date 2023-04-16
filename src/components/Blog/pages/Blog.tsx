import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React, { useEffect, useState } from "react";
import { styled } from "../../../../stitches.config";
import { sendRequestToAPI } from "../../../api/api";
import { NavigationPath } from "../../../ui/common/NavigationPath";
import { Questions } from "../../../ui/common/Questions";
import { ArticleSection } from "../components/ArticleSection";
import { Pagination } from "../components/Pagination";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Loading } from "../../../ui/common/Loading";
import { FiltersSection } from "../components/FiltersSection";
import { ArticleCategory } from "../../../types/ArticleCategory";
import { PageHead } from "../../../ui/common/PageHead";
import { Article } from "../../../types/Article";

type Props = {
  pageContext: Partial<PageContext>;
};

type Category = {
  category: string | undefined;
  subcategory: string | undefined;
};

const getFilters = ({ category, subcategory }: Category) => {
  if (subcategory) {
    return { subcategory: { name: { eq: subcategory } } };
  }

  return category
    ? {
        categoryId: {
          contains: category,
        },
      }
    : {};
};

export const Blog: React.FC<Props> = ({ pageContext }) => {
  const [articles, setArticles] = useState<Article[]>();
  const [category, setCategory] = useState<ArticleCategory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(6);
  const [filteredCategory, setFilteredCategory] = useState<string | undefined>(
    undefined
  );
  const [filteredSubcategory, setFilteredSubcategory] = useState<
    string | undefined
  >(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await sendRequestToAPI(
          `query($language: I18NLocaleCode, $filter: ArticlesCategoryFiltersInput, $pagination: PaginationArg)  {
            articles(locale: $language, pagination: $pagination, sort: "createdAt:desc") {
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
            allCategories: articlesCategories(locale: $language) {
              data {
                attributes {
                  categoryId
                  categoryName    
                  subcategory {
                    name
                    articles {
                      data {
                        attributes {
                          title
                        }
                      }
                    }
                  }      
                }
              }
            }
            categories: articlesCategories(locale: $language, filters: $filter) {
              data {
                attributes {
                  categoryId
                  categoryName
                  subcategory {
                    name
                    articles(pagination: {limit: 10000}, sort: "createdAt:desc") {
                      data {
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
                  articles(pagination: {limit: 10000}, sort: "createdAt:desc") {
                    data {
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
              }
            }
          }
            `,
          {
            language: pageContext.language,
            pagination: { page: currentPage, pageSize: articlesPerPage },
            filter: getFilters({
              category: filteredCategory,
              subcategory: filteredSubcategory,
            }),
          }
        );
        if (!category.length) {
          setCategory(data.data.allCategories.data);
        }

        if (!filteredCategory && !filteredSubcategory) {
          setArticles(data.data.articles.data);
          setTotalPage(data.data.articles.meta.pagination.pageCount);
          setArticlesPerPage(data.data.articles.meta.pagination.pageSize);
        }

        const lastArticleIndex = currentPage * articlesPerPage;
        const firstArticleIndex = lastArticleIndex - articlesPerPage;

        if (filteredCategory && !filteredSubcategory) {
          const categoryArticles =
            data.data.categories.data[0].attributes.articles.data;
          const totalPages = Math.ceil(
            categoryArticles.length / articlesPerPage
          );
          setArticles(
            categoryArticles.slice(firstArticleIndex, lastArticleIndex)
          );
          setTotalPage(totalPages);
        }

        if (filteredSubcategory) {
          const subcategoryArticles =
            data.data.categories.data[0].attributes.subcategory.find(
              (el: any) => el.name === filteredSubcategory
            )?.articles?.data;
          const totalPages = Math.ceil(
            subcategoryArticles.length / articlesPerPage
          );
          setArticles(
            subcategoryArticles.slice(firstArticleIndex, lastArticleIndex)
          );
          setTotalPage(totalPages);
        }
      } catch (err) {
        return err;
      }
    };
    getData();
  }, [currentPage, filteredCategory, filteredSubcategory]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage >= totalPage) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <PageHead title={t("blog.blog")}>
        <meta name="keywords" content="vander.consulting, consulting, blog" />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="vander.consulting blog" />
        <meta property="twitter:title" content="vander.consulting blog" />

        <meta name="description" content="vander.consulting blog" />
        <meta property="og:description" content="vander.consulting blog" />
        <meta property="twitter:description" content="vander.consulting blog" />

        <meta property="og:site_name" content="vander.consulting" />
        <meta name="twitter:card" content="summary_large_image" />
      </PageHead>
      <Nav></Nav>
      <NavigationPath name="blog" />
      <MainTitle>{t("blog.blog")}</MainTitle>
      <FiltersSection
        category={category}
        setFilteredCategory={(value: string | undefined) => {
          setFilteredCategory(value);
          setCurrentPage(1);
        }}
        setFilteredSubcategory={(value: string | undefined) => {
          setFilteredSubcategory(value);
          setCurrentPage(1);
        }}
      />
      {articles ? <ArticleSection blogArticles={articles} /> : <Loading />}
      {!!articles?.length && (
        <Pagination
          length={totalPage}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={currentPage}
        />
      )}
      <Questions />
    </>
  );
};

const MainTitle = styled("h1", {
  margin: 0,
  fontWeight: "600",
  fontSize: "30px",
  lineHeight: "32px",
  textAlign: "center",
  "@md": {
    fontSize: "40px",
    lineHeight: "32px",
  },
});

const Nav = styled("div", {
  display: "none",
  "@xs": {
    display: "block",
    background: "$navBackgroundViolet",
    width: "100%",
    height: "96px",
  },
  "@md": {
    height: "147px",
  },
});
