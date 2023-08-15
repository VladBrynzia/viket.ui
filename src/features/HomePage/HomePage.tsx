import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React from "react";
import { About } from "../../components/HomePage/About";
import { WhatItIs } from "../../components/HomePage/WhatItIs";
import { MainSlider } from "../../components/HomePage/MainSlider";

type Props = {
  pageContext: PageContext;
};

export const HomePage: React.FC<Props> = ({ pageContext }) => {
  return (
    <>
      <MainSlider />
      <About />
      <WhatItIs />
    </>
  );
};
