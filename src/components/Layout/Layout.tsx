import React, { ReactElement } from "react";
import { Footer } from "../Footer/Footer";
import { Helmet } from "gatsby-plugin-react-i18next";
import favicon from "../../../static/icons/favicon.png";
import { Toaster } from "react-hot-toast";
import { Header } from "../Header/Header";
import { CallUs } from "../../ui/common/CallUs";
import { styled } from "../../../stitches.config";
import { ShopPopupProvider } from "../../context/ShopPopupContext";

type Props = {
  children: ReactElement;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ShopPopupProvider>
      <Helmet>
        {/* <link id="favicon-icon" rel="icon" href={favicon} /> */}
      </Helmet>
      <LayoutContainer>
        <Header />
        <Main>{children}</Main>
        <Footer />
        <CallUs />
      </LayoutContainer>
    </ShopPopupProvider>
  );
};

const LayoutContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Main = styled("main", {
  flex: 1,
});
