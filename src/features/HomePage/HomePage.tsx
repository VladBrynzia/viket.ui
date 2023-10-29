import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React from "react";
import { About } from "../../components/HomePage/About";
import { WhatItIs } from "../../components/HomePage/WhatItIs";
import { MainSlider } from "../../components/HomePage/MainSlider";
import { Helmet } from "react-helmet";

type Props = {
  pageContext: PageContext;
};

export const HomePage: React.FC<Props> = ({ pageContext }) => {
  const title = "Поликарбонат VIKET";
  const description =
    "Продажа сотового, монолитного и профилированого поликарбоната";

  return (
    <>
      <Helmet defaultTitle={title}>
        <meta
          name="keywords"
          content="поликарбон, поликарбонат, теплицы, навесы, продажа поликарбоната, сотовый поликарбонат, монолитный поликарбонат, магазин поликарботана"
        />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="Policarbonat VIKET" />
        <meta name="twitter:title" content="Policarbonat VIKET" />

        <meta property="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        <meta property="og:site_name" content="policarbonat-viket" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <MainSlider />
      <About />
      <WhatItIs />
    </>
  );
};
