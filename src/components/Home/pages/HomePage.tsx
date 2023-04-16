import { useTranslation } from "gatsby-plugin-react-i18next";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React, { useEffect, useState } from "react";
import { sendRequestToAPI } from "../../../api/api";
import { PageHead } from "../../../ui/common/PageHead";
import { Questions } from "../../../ui/common/Questions";
import { BlogBlock } from "../components/BlogBlock";
import { CustomerFeedback } from "../components/CustomerFeedback";
import { HomeContent } from "../components/HomeContent";
import { InfoBlock } from "../components/InfoBlock";
import { Projects } from "../components/Projects";
import { SecretBlock } from "../components/SecretBlock";
import { Services } from "../components/Services";

type Props = {
  pageContext: PageContext;
};

export const HomePage: React.FC<Props> = ({ pageContext }) => {
  const [articles, setArticles] = useState();
  const [feedbacks, setFeedbacks] = useState();
  const [projects, setProjects] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await sendRequestToAPI(
          `query($language: I18NLocaleCode)  {
            articles(locale: $language, sort: "createdAt:desc") {
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
            feedbacks: customerFeedbacks(locale: $language) {
              data {
                id
                attributes {
                  author {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  authorName
                  authorProfession
                  description
                }
              }
            }
            projects(locale: $language) {
              data {
                id
                attributes {
                  projectName
                  projectLink
                  projectTitle
                  description
                  firstShortInfo
                  secondShortInfo
                  firstShortNumber
                  secondShortNumber
                  projectImage {
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
            language: pageContext.language,
          }
        );
        setArticles(data.data.articles.data);
        setFeedbacks(data.data.feedbacks.data);
        setProjects(data.data.projects.data);
      } catch (err) {
        return err;
      }
    };
    getData();
  }, []);

  return (
    <>
      <PageHead title={t("title")}>
        <meta name="keywords" content="vander.consulting, consulting" />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="vander.consulting blog" />
        <meta property="twitter:title" content="vander.consulting blog" />

        <meta name="description" content="vander.consulting blog" />
        <meta property="og:description" content="vander.consulting blog" />
        <meta property="twitter:description" content="vander.consulting blog" />

        <meta property="og:site_name" content="vander.consulting" />
        <meta name="twitter:card" content="summary_large_image" />
      </PageHead>
      <HomeContent />
      <InfoBlock />
      <Services />
      <SecretBlock />
      {projects && <Projects projects={projects} />}
      {articles && <BlogBlock articles={articles} />}
      {feedbacks && <CustomerFeedback feedbacks={feedbacks} />}
      <Questions />
    </>
  );
};
