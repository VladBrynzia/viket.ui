import type { GatsbyConfig } from "gatsby";
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const trackId = process.env.GATSBY_GOOGLE_ANALYTICS_ID;
const siteUrl = 'https://vander.consulting' || 'http://localhost:8000/';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `vander.consulting`,
    siteUrl: siteUrl,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          trackId, // Google Analytics / GA
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true
        },
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: 'locale',
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `sk`],
        redirect: false,
        defaultLanguage: `en`,
        siteUrl,
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
  ]
};

export default config;
