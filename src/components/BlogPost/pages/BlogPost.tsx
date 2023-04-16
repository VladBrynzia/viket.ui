import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";
import { styled } from "../../../../stitches.config";
import { ArticlePageData } from "../../../pages/blog-posts/[id]";
import { Loading } from "../../../ui/common/Loading";
import { NavigationPath } from "../../../ui/common/NavigationPath";
import { PageHead } from "../../../ui/common/PageHead";
import { Questions } from "../../../ui/common/Questions";
import { FullArticleInfo } from "../components/FullArticleInfo";
import { InterestingSection } from "../components/InterestingSection";

type Props = {
  serverData: ArticlePageData;
};

export const BlogPost: React.FC<Props> = ({ serverData }) => {
  const { t } = useTranslation();
  const { article, latestArticles } = serverData;
  const { language } = useI18next();

  return (
    <>
      <PageHead title={article.title}>
        <link
          rel="canonical"
          href={`https://vander.consulting/${
            language === "en" ? "" : "sk/"
          }blog-posts/${article.slug}`}
        />
        <meta name="keywords" content={article.keywords} />

        <meta property="og:title" content={article.SEO.metaTitle} />
        <meta property="twitter:title" content={article.SEO.metaTitle} />

        <meta property="og:description" content={article.SEO.metaDescription} />
        <meta
          property="twitter:description"
          content={article.SEO.metaDescription}
        />

        <meta
          property="og:image"
          content={article.SEO.SharedImage.media.data.attributes.url}
        />
        <meta
          property="twitter:image"
          content={article.SEO.SharedImage.media.data.attributes.url}
        />

        <meta property="og:site_name" content="vander.consulting" />
        <meta name="twitter:card" content="summary_large_image" />
      </PageHead>
      <Nav></Nav>
      <NavigationPath name="blog" />
      {article ? <FullArticleInfo article={article} /> : <Loading />}
      {latestArticles && <InterestingSection articles={latestArticles} />}
      <Questions />
    </>
  );
};

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
