import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { Loading } from "../../ui/common/Loading";
import { FullProductInfo } from "./FullProductInfo";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import shop from "../../../static/icons/shop.png";
import { useShopContext } from "../../context/ShopPopupContext";
import { keyframes } from "@stitches/react";
import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import { sendRequestToAPI } from "../../api/api";
import { ProductInfoType } from "../../types/product";

type Props = {
  pageContext: PageContext;
  location: Location;
};

export const ProductInfo: React.FC<Props> = ({ pageContext, location }) => {
  const [product, setProduct] = useState<ProductInfoType>();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const lastSlashIndex = location.pathname.lastIndexOf("/");
      const pageId = location.pathname.substring(lastSlashIndex + 1);

      try {
        const { data } = await sendRequestToAPI(
          `query($language: I18NLocaleCode, $filters: ProductFiltersInput)  {
            product: products(locale: $language, filters: $filters) {
              data {
                id
                attributes {
                  name
                  description
                  characteristics
                  haveInStock
                  thickness
                  color
                  mainImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  slug
                  images {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  sheetOption {
                    pricePerMeter
                    totalPrice
                    listSize
                    haveInStock
                  }
                }
              }
            }
          }`,
          {
            language: pageContext.language,
            filters: { slug: { eq: pageId } },
          },
          {}
        );
        setProduct(data.data.product.data[0].attributes);
      } catch (err) {
        return err;
      } finally {
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

  return (
    <Container>
      {!isLoading && product ? (
        <>
          <LinkBox>
            <Breadcrumb
              way={[
                { link: "/products", text: "Продукция" },
                { link: `/products/${product.slug}`, text: product.name },
              ]}
            />
          </LinkBox>
          <FullProductInfo product={product} />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

const radar = keyframes({
  "0%": {
    WebkitTransform: "scale(0,0)",
    transform: "scale(.3,.3)",
    opacity: 1,
  },

  "100%": {
    WebkitTransform: "scale(1.2,1.2)",
    transform: "scale(1.2,1.2)",
    opacity: 0,
  },
});

const Container = styled("section", {});

const LinkBox = styled("div", {
  maxWidth: 1280,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  "@sm": {
    flexDirection: "row",
  },
  "&>div": {
    margin: "0",
    "@md": {
      padding: "70px 20px 10px 0",
    },
  },
});

const ShopImage = styled("img", {
  width: "12px",
  height: "12px",
  "@md": {
    width: "20px",
    height: "20px",
  },
});

const Button = styled("button", {
  position: "relative",
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  width: "fit-content",
  gap: 8,
  background: "#FFA500",
  border: "none",
  borderRadius: "0px 5px",
  padding: "8px 18px",
  fontWeight: 700,
  fontSize: 10,
  lineHeight: "12px",
  color: "$white",
  margin: "auto 20px 0",
  "@md": {
    padding: "10px 60px",
    fontSize: 18,
    lineHeight: "21px",
    margin: "auto 0 0",
  },
});
