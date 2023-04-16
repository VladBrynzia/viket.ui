import React, { ReactElement } from "react";
import { Navigation } from "../Navigation/Navigation";
import { Footer } from "../Footer/Footer";
import { Helmet } from "gatsby-plugin-react-i18next";
import favicon from "../../../static/icons/favicon.png";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "../../ui/common/ScrollToTop";

type Props = {
  children: ReactElement;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Helmet>
        <link id="favicon-icon" rel="icon" href={favicon} />
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/b396c37ff204a73a04d5b4c0/script.js"
        ></script>
      </Helmet>
      <Navigation />
      {children}
      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
      <ScrollToTop />
    </>
  );
};
