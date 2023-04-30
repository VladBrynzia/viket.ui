import React, { useEffect, useState } from "react";
import { sendRequestToAPI } from "../../api/api";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { ProductPageData } from "../../pages/products/[id]";
import { styled } from "../../../stitches.config";
import { Loading } from "../../ui/common/Loading";
import { FullProductInfo } from "./FullProductInfo";

type Props = {
  serverData: ProductPageData;
};

export const ProductInfo: React.FC<Props> = ({ serverData }) => {
  const { product } = serverData;
  
  return (
    <Container>
      {product ? <FullProductInfo product={product} /> : <Loading />}
    </Container>
  );
};

const Container = styled("section", {});
