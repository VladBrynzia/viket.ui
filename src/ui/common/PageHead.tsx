import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

type Props = {
  title?: string;
  children: ReactNode;
};

export const PageHead = ({ title, children }: Props) => {
  return (
    <Helmet defaultTitle="vander.consulting" title={title}>
      {children}
    </Helmet>
  );
};
