import React from "react";
import { ProductInfoType } from "../../types/product";
import { styled } from "../../../stitches.config";

type Props = {
  product: ProductInfoType;
};

export const FullProductInfo: React.FC<Props> = ({ product }) => {
  return <Container>{product.name}</Container>;
};

export const Container = styled("div", {
  maxWidth: 1280,
  margin: "0 auto",
});
