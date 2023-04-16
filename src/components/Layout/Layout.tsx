import React, { ReactElement } from "react";
import { Navigation } from "../Navigation/Navigation";
import { Footer } from "../Footer/Footer";
import { Helmet } from "gatsby-plugin-react-i18next";
import favicon from "../../../static/icons/favicon.png";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "../../ui/common/ScrollToTop";
import { Header } from "../Header/Header";

type Props = {
  children: ReactElement;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Helmet>
        <link id="favicon-icon" rel="icon" href={favicon} />
      </Helmet>
      {/* <Navigation /> */}
      <Header />
      {children}
      <Footer />
      {/* <Toaster position="bottom-right" reverseOrder={false} />
      <ScrollToTop /> */}
    </>
  );
};
